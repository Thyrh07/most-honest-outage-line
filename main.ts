// The Most Honest Outage Line
// make.fun competition u-mgwals-the-most-honest-outage-line-baaf9c81
// Writes one honest status page line (at most 160 characters) to /output/entry.txt.
import { mkdirSync, writeFileSync } from "node:fs";

export const OUTPUT = "/output/entry.txt";
export const MAX_CHARS = 160;

export const ENTRY =
  "All servers are down: API, website, database unreachable. I cannot check what failed and I have no ETA. I will update this page once I can verify anything.";

// Count Unicode code points, not UTF-16 units, so the gate length matches
// what the sealed scorer measures on the UTF-8 text.
function charCount(text: string): number {
  return [...text].length;
}

function validate(text: string): void {
  const n = charCount(text);
  if (n < 1 || n > MAX_CHARS) {
    throw new Error(`entry must be 1-${MAX_CHARS} characters, got ${n}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (text !== text.trim()) {
    throw new Error("entry must not start or end with whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

function main(): void {
  validate(ENTRY);
  mkdirSync("/output", { recursive: true });
  writeFileSync(OUTPUT, ENTRY, "utf8");
}

main();
