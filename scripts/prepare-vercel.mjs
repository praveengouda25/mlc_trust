import { copyFileSync, cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(process.cwd());
const out = resolve(root, "dist/deploy");
const websiteClient = resolve(root, "dist/client");

if (!existsSync(websiteClient)) {
  throw new Error("Website build missing at dist/client. Run npm run build:website first.");
}

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
cpSync(websiteClient, out, { recursive: true });

function ensureIndexHtml(directory) {
  const indexPath = resolve(directory, "index.html");
  const shellPath = resolve(directory, "_shell.html");
  if (!existsSync(indexPath) && existsSync(shellPath)) {
    copyFileSync(shellPath, indexPath);
  }
}

ensureIndexHtml(out);
