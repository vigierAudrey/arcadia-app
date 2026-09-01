import { execFileSync } from "node:child_process";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";

export const COURS_SOURCE_DIR = path.resolve(process.cwd(), "cours-source");
export const INDEX_DIR = path.resolve(process.cwd(), ".cours-index");
export const TEXT_DIR = path.join(INDEX_DIR, "text");
export const MANIFEST_PATH = path.join(INDEX_DIR, "manifest.json");

// Never opened: cours-source/ is a read-only source, .cours-index/ is the only
// place this tooling ever writes to.
export const IGNORED_DIR_NAMES = new Set([".git", "__pycache__"]);
export const IGNORED_FILE_NAMES = new Set(["Desktop.ini", ".nextcloudsync.log"]);
export const IGNORED_FILE_PATTERN = /^\.sync_.*\.db.*$/i;

const TECHNICAL_EXTENSIONS = new Set([
  "sample",
  "pyc",
  "tmp",
  "lock",
  "ini",
  "log",
  "csv",
  "bat",
  "odg",
]);
const ARCHIVE_EXTENSIONS = new Set(["zip"]);
const IMAGE_EXTENSIONS = new Set(["png", "jpg", "jpeg", "gif", "bmp"]);
const PLAIN_TEXT_EXTENSIONS = new Set(["md", "txt", "json", "html", "py"]);
const PDF_EXTENSIONS = new Set(["pdf"]);
const DOCX_EXTENSIONS = new Set(["docx"]);
const PPTX_EXTENSIONS = new Set(["pptx"]);

export const MAX_EXTRACT_BYTES = 25 * 1024 * 1024;
const EXEC_MAX_BUFFER = 50 * 1024 * 1024;

export type FileKind =
  | "text"
  | "pdf"
  | "docx"
  | "pptx"
  | "archive"
  | "image"
  | "technical"
  | "unsupported";

export function classify(ext: string): FileKind {
  if (PLAIN_TEXT_EXTENSIONS.has(ext)) return "text";
  if (PDF_EXTENSIONS.has(ext)) return "pdf";
  if (DOCX_EXTENSIONS.has(ext)) return "docx";
  if (PPTX_EXTENSIONS.has(ext)) return "pptx";
  if (ARCHIVE_EXTENSIONS.has(ext)) return "archive";
  if (IMAGE_EXTENSIONS.has(ext)) return "image";
  if (TECHNICAL_EXTENSIONS.has(ext)) return "technical";
  return "unsupported";
}

export type ExtractStatus =
  | "ok"
  | "skipped:archive"
  | "skipped:non-text"
  | "skipped:technical"
  | "skipped:unsupported"
  | "skipped:too-large"
  | "error";

export type ManifestEntry = {
  relPath: string;
  ext: string;
  sizeBytes: number;
  mtimeMs: number;
  status: ExtractStatus;
  textRelPath?: string;
  extractedAt?: string;
  errorMessage?: string;
};

export type Manifest = {
  generatedAt: string;
  sourceRoot: "cours-source";
  entries: ManifestEntry[];
};

export async function readManifest(): Promise<Manifest> {
  try {
    const raw = await readFile(MANIFEST_PATH, "utf8");
    return JSON.parse(raw) as Manifest;
  } catch {
    return { generatedAt: new Date(0).toISOString(), sourceRoot: "cours-source", entries: [] };
  }
}

export async function writeManifest(manifest: Manifest) {
  await mkdir(INDEX_DIR, { recursive: true });
  const tmpPath = `${MANIFEST_PATH}.tmp`;
  await writeFile(tmpPath, JSON.stringify(manifest, null, 2), "utf8");
  await rename(tmpPath, MANIFEST_PATH);
}

function stripXmlTags(xml: string) {
  return xml
    .replace(/<[^>]*>/g, " ")
    .replace(/[ \t]+/g, " ")
    .trim();
}

export function extractPdfText(absPath: string) {
  return execFileSync("pdftotext", [absPath, "-"], {
    encoding: "utf8",
    maxBuffer: EXEC_MAX_BUFFER,
  });
}

export function extractDocxText(absPath: string) {
  const xml = execFileSync("unzip", ["-p", absPath, "word/document.xml"], {
    encoding: "utf8",
    maxBuffer: EXEC_MAX_BUFFER,
  });
  return stripXmlTags(xml);
}

export function extractPptxText(absPath: string) {
  // Slide order follows the zip's central directory, not necessarily the
  // presentation's slide order — acceptable for search, not for linear reading.
  const xml = execFileSync("unzip", ["-p", absPath, "ppt/slides/slide*.xml"], {
    encoding: "utf8",
    maxBuffer: EXEC_MAX_BUFFER,
  });
  return stripXmlTags(xml);
}
