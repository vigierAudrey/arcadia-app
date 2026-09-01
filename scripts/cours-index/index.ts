import { mkdir, readdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";

import {
  classify,
  COURS_SOURCE_DIR,
  extractDocxText,
  extractPdfText,
  extractPptxText,
  IGNORED_DIR_NAMES,
  IGNORED_FILE_NAMES,
  IGNORED_FILE_PATTERN,
  MAX_EXTRACT_BYTES,
  type Manifest,
  type ManifestEntry,
  readManifest,
  TEXT_DIR,
  writeManifest,
} from "./shared";

const CONCURRENCY = 8;

type SourceFile = { absPath: string; relPath: string };

async function* walk(dir: string): AsyncGenerator<SourceFile> {
  const names = await readdir(dir);
  for (const name of names) {
    const absPath = path.join(dir, name);
    const info = await stat(absPath);

    if (info.isDirectory()) {
      if (IGNORED_DIR_NAMES.has(name)) continue;
      yield* walk(absPath);
      continue;
    }

    if (!info.isFile()) continue;
    if (IGNORED_FILE_NAMES.has(name) || IGNORED_FILE_PATTERN.test(name)) continue;

    yield {
      absPath,
      relPath: path.relative(COURS_SOURCE_DIR, absPath).split(path.sep).join("/"),
    };
  }
}

async function processFile(
  file: SourceFile,
  previous: ManifestEntry | undefined,
): Promise<ManifestEntry> {
  const info = await stat(file.absPath);
  const ext = path.extname(file.relPath).slice(1).toLowerCase();

  if (
    previous &&
    previous.sizeBytes === info.size &&
    previous.mtimeMs === info.mtimeMs &&
    previous.status !== "error"
  ) {
    return previous;
  }

  const base = {
    relPath: file.relPath,
    ext,
    sizeBytes: info.size,
    mtimeMs: info.mtimeMs,
  };

  const kind = classify(ext);

  if (kind === "archive") return { ...base, status: "skipped:archive" };
  if (kind === "image") return { ...base, status: "skipped:non-text" };
  if (kind === "technical") return { ...base, status: "skipped:technical" };
  if (kind === "unsupported") return { ...base, status: "skipped:unsupported" };

  if (kind !== "text" && info.size > MAX_EXTRACT_BYTES) {
    return { ...base, status: "skipped:too-large" };
  }

  try {
    const text =
      kind === "text"
        ? await readFile(file.absPath, "utf8")
        : kind === "pdf"
          ? extractPdfText(file.absPath)
          : kind === "docx"
            ? extractDocxText(file.absPath)
            : extractPptxText(file.absPath);

    const textRelPath = `${file.relPath}.txt`;
    const textAbsPath = path.join(TEXT_DIR, textRelPath);
    await mkdir(path.dirname(textAbsPath), { recursive: true });
    await writeFile(textAbsPath, text, "utf8");

    return {
      ...base,
      status: "ok",
      textRelPath,
      extractedAt: new Date().toISOString(),
    };
  } catch (error) {
    return {
      ...base,
      status: "error",
      errorMessage: error instanceof Error ? error.message.slice(0, 500) : "Erreur inconnue.",
    };
  }
}

async function processAll(
  files: SourceFile[],
  previousByPath: Map<string, ManifestEntry>,
): Promise<ManifestEntry[]> {
  const results: ManifestEntry[] = new Array(files.length);
  let cursor = 0;

  async function worker() {
    for (;;) {
      const index = cursor;
      cursor += 1;
      if (index >= files.length) return;
      const file = files[index];
      results[index] = await processFile(file, previousByPath.get(file.relPath));
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));
  return results;
}

async function main() {
  try {
    await stat(COURS_SOURCE_DIR);
  } catch {
    throw new Error(
      "cours-source/ est introuvable — ce script doit être exécuté sur un poste où le lien symbolique existe (voir docs/base-documentaire.md).",
    );
  }

  const previousManifest = await readManifest();
  const previousByPath = new Map(previousManifest.entries.map((entry) => [entry.relPath, entry]));

  const files: SourceFile[] = [];
  for await (const file of walk(COURS_SOURCE_DIR)) files.push(file);

  const nextEntries = await processAll(files, previousByPath);

  const seen = new Set(nextEntries.map((entry) => entry.relPath));
  let removed = 0;
  for (const previous of previousManifest.entries) {
    if (seen.has(previous.relPath)) continue;
    removed += 1;
    if (previous.textRelPath) {
      await rm(path.join(TEXT_DIR, previous.textRelPath), { force: true });
    }
  }

  const manifest: Manifest = {
    generatedAt: new Date().toISOString(),
    sourceRoot: "cours-source",
    entries: nextEntries,
  };
  await writeManifest(manifest);

  const counts = new Map<string, number>();
  for (const entry of nextEntries) {
    counts.set(entry.status, (counts.get(entry.status) ?? 0) + 1);
  }
  const ok = counts.get("ok") ?? 0;
  const errors = counts.get("error") ?? 0;
  const skipped = nextEntries.length - ok - errors;

  process.stdout.write(`Fichiers scannés : ${nextEntries.length}\n`);
  process.stdout.write(`Indexés (texte extrait) : ${ok}\n`);
  process.stdout.write(`Ignorés : ${skipped}\n`);
  for (const [status, count] of [...counts.entries()].sort(([a], [b]) => a.localeCompare(b))) {
    if (status === "ok" || status === "error") continue;
    process.stdout.write(`  - ${status} : ${count}\n`);
  }
  process.stdout.write(`En erreur : ${errors}\n`);
  process.stdout.write(`Retirés de l'index (fichier source disparu) : ${removed}\n`);
}

main().catch((error: unknown) => {
  process.stderr.write(`${error instanceof Error ? error.message : "Échec de l'indexation."}\n`);
  process.exitCode = 1;
});
