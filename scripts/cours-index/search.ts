import { execFileSync } from "node:child_process";
import path from "node:path";

import { TEXT_DIR } from "./shared";

type RgEvent = {
  type: string;
  data?: {
    path?: { text?: string };
    lines?: { text?: string };
    line_number?: number;
  };
};

function main() {
  const query = process.argv.slice(2).join(" ").trim();
  if (!query) {
    process.stderr.write('Usage : pnpm cours:search -- "terme recherché"\n');
    process.exitCode = 1;
    return;
  }

  let raw: string;
  try {
    raw = execFileSync(
      "rg",
      [
        "--json",
        "--ignore-case",
        "--context",
        "1",
        "--max-count",
        "5",
        "--",
        query,
        TEXT_DIR,
      ],
      { encoding: "utf8", maxBuffer: 20 * 1024 * 1024 },
    );
  } catch (error) {
    const status = (error as { status?: number }).status;
    if (status === 1) {
      process.stdout.write("Aucun résultat.\n");
      return;
    }
    throw error;
  }

  const byFile = new Map<string, string[]>();
  for (const line of raw.split("\n")) {
    if (!line.trim()) continue;
    const event = JSON.parse(line) as RgEvent;
    if (event.type !== "match" && event.type !== "context") continue;
    const filePath = event.data?.path?.text;
    const lineNumber = event.data?.line_number;
    const text = event.data?.lines?.text;
    if (!filePath || lineNumber === undefined || text === undefined) continue;

    const lines = byFile.get(filePath) ?? [];
    lines.push(`  ${lineNumber}: ${text.replace(/\n$/, "")}`);
    byFile.set(filePath, lines);
  }

  if (byFile.size === 0) {
    process.stdout.write("Aucun résultat.\n");
    return;
  }

  for (const [absTextPath, lines] of byFile) {
    const relTextPath = path.relative(TEXT_DIR, absTextPath);
    const relSourcePath = relTextPath.replace(/\.txt$/, "");
    const ext = path.extname(relSourcePath).slice(1).toLowerCase() || "inconnu";
    process.stdout.write(`\n${relSourcePath} (${ext})\n`);
    for (const line of lines.slice(0, 6)) {
      process.stdout.write(`${line}\n`);
    }
  }
}

main();
