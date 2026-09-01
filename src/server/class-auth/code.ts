import { createHmac, randomInt } from "node:crypto";

import { getClassSessionSecret } from "./config";

// Alphabet non ambigu : sans 0/O, 1/I/L pour rester lisible à l'oral et au tableau.
export const CLASS_CODE_ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
export const CLASS_CODE_LENGTH = 8;

export function generateClassCode() {
  let code = "";
  for (let index = 0; index < CLASS_CODE_LENGTH; index += 1) {
    code += CLASS_CODE_ALPHABET[randomInt(CLASS_CODE_ALPHABET.length)];
  }
  return code;
}

export function formatClassCode(code: string) {
  return `${code.slice(0, 4)}-${code.slice(4)}`;
}

export function hashClassCode(code: string) {
  return createHmac("sha256", getClassSessionSecret())
    .update(`class-code:${code}`)
    .digest("hex");
}
