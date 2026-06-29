import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const docsRoot = path.join(root, "docs");
const manifestPath = path.join(docsRoot, "research-fields.json");
const generatedRoot = path.join(root, "src", "app", "generated");
const whitepaperRoot = path.join(root, "public", "whitepaper");

const htmlEscape = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const slugToTitle = (slug) =>
  slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

function readScalar(value) {
  const trimmed = value.trim();

  if (trimmed === "[]") return [];
  if (trimmed === "true") return true;
  if (trimmed === "false") return false;
  if (/^\d+(\.\d+)?$/.test(trimmed)) return trimmed;

  return trimmed.replace(/^["']|["']$/g, "");
}

function parseYaml(source) {
  const lines = source.replaceAll("\r\n", "\n").split("\n");
  const data = {};
  let index = 0;

  const readBlock = (baseIndent) => {
    const block = [];

    while (index < lines.length) {
      const line = lines[index];
      if (!line.trim()) {
        block.push("");
        index += 1;
        continue;
      }

      const indent = line.match(/^ */)?.[0].length ?? 0;
      if (indent <= baseIndent) break;
      block.push(line.slice(baseIndent + 2));
      index += 1;
    }

    return block.join("\n").trim();
  };

  const readList = (baseIndent) => {
    const items = [];

    while (index < lines.length) {
      const line = lines[index];
      if (!line.trim()) {
        index += 1;
        continue;
      }

      const indent = line.match(/^ */)?.[0].length ?? 0;
      if (indent <= baseIndent) break;

      const trimmed = line.trim();
      if (!trimmed.startsWith("- ")) break;

      const first = trimmed.slice(2);
      index += 1;

      if (!first.includes(":")) {
        items.push(readScalar(first));
        continue;
      }

      const item = {};
      const [firstKey, ...firstValueParts] = first.split(":");
      const firstValue = firstValueParts.join(":").trim();

      if (firstValue === "|") {
        item[firstKey.trim()] = readBlock(indent + 2);
      } else if (firstValue) {
        item[firstKey.trim()] = readScalar(firstValue);
      } else {
        item[firstKey.trim()] = "";
      }

      while (index < lines.length) {
        const nested = lines[index];
        if (!nested.trim()) {
          index += 1;
          continue;
        }

        const nestedIndent = nested.match(/^ */)?.[0].length ?? 0;
        if (nestedIndent <= indent) break;

        const nestedTrimmed = nested.trim();
        const [key, ...valueParts] = nestedTrimmed.split(":");
        const value = valueParts.join(":").trim();
        index += 1;

        if (value === "|") {
          item[key.trim()] = readBlock(nestedIndent);
        } else if (value) {
          item[key.trim()] = readScalar(value);
        } else {
          item[key.trim()] = "";
        }
      }

      items.push(item);
    }

    return items;
  };

  while (index < lines.length) {
    const line = lines[index];
    index += 1;

    if (!line.trim() || line.trim().startsWith("#")) continue;

    const indent = line.match(/^ */)?.[0].length ?? 0;
    const [key, ...valueParts] = line.trim().split(":");
    const value = valueParts.join(":").trim();

    if (value === "|") {
      data[key] = readBlock(indent);
    } else if (value) {
      data[key] = readScalar(value);
    } else {
      data[key] = readList(indent);
    }
  }

  return data;
}

async function readField(field, parts) {
  const fieldDir = path.join(docsRoot, field.id);
  let names = [];

  try {
    names = await readdir(fieldDir);
  } catch {
    return { ...field, parts: [] };
  }

  const partFiles = new Set(names.filter((name) => name.endsWith(".yaml")));
  const parsedParts = [];

  for (const part of parts) {
    const file = `${part}.yaml`;
    if (!partFiles.has(file)) continue;

    const raw = await readFile(path.join(fieldDir, file), "utf8");
    parsedParts.push({
      id: part,
      source: `docs/${field.id}/${file}`,
      ...parseYaml(raw),
    });
  }

  return { ...field, parts: parsedParts };
}

function renderList(items = []) {
  if (!items.length) return "";

  return `<ul>${items.map((item) => `<li>${htmlEscape(item)}</li>`).join("")}</ul>`;
}

function renderReferences(references = []) {
  if (!references.length) return "";

  return `
    <section class="whitepaper-section whitepaper-section--references">
      <p class="eyebrow">References</p>
      <ol>
        ${references
          .map((reference) => {
            if (typeof reference === "string") return `<li>${htmlEscape(reference)}</li>`;
            const title = reference.title ?? reference.label ?? "Reference";
            const url = reference.url ? ` <a href="${htmlEscape(reference.url)}">${htmlEscape(reference.url)}</a>` : "";
            const note = reference.note ? `<p>${htmlEscape(reference.note)}</p>` : "";
            return `<li><strong>${htmlEscape(title)}</strong>${url}${note}</li>`;
          })
          .join("")}
      </ol>
    </section>
  `;
}

function renderPart(part) {
  if (part.id === "references") return renderReferences(part.references ?? part.sections ?? []);

  return `
    <section class="whitepaper-section">
      <p class="eyebrow">${htmlEscape(part.id)}</p>
      <h2>${htmlEscape(part.title ?? slugToTitle(part.id))}</h2>
      ${part.summary ? `<p class="summary">${htmlEscape(part.summary)}</p>` : ""}
      ${(part.sections ?? [])
        .map((section) => {
          if (typeof section === "string") return `<p>${htmlEscape(section)}</p>`;
          return `
            <article>
              ${section.heading ? `<h3>${htmlEscape(section.heading)}</h3>` : ""}
              ${section.body ? `<p>${htmlEscape(section.body)}</p>` : ""}
            </article>
          `;
        })
        .join("")}
      ${part.claims?.length ? `<h3>Claims</h3>${renderList(part.claims)}` : ""}
      ${part.questions?.length ? `<h3>Open questions</h3>${renderList(part.questions)}` : ""}
    </section>
  `;
}

function renderWhitepaper(field, generatedAt) {
  const abstract = field.parts.find((part) => part.id === "abstract");
  const references = field.parts.find((part) => part.id === "references");
  const chapters = field.parts.filter((part) => part.id !== "abstract" && part.id !== "references");
  const version = abstract?.version ?? "0.1";
  const status = abstract?.status ?? "draft";

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${htmlEscape(field.title)} Whitepaper</title>
    <style>
      :root { color-scheme: dark; --bg: #000; --ink: #f5efe3; --muted: rgba(245,239,227,.68); --line: rgba(245,239,227,.16); --gold: #f1c983; }
      * { box-sizing: border-box; }
      body { margin: 0; background: radial-gradient(circle at 50% 10%, rgba(241,201,131,.08), transparent 22rem), #000; color: var(--ink); font-family: Georgia, "Times New Roman", serif; }
      main { width: min(calc(100% - 2rem), 980px); margin: 0 auto; padding: 4rem 0 5rem; }
      a { color: var(--gold); }
      h1, h2, h3 { font-weight: 500; letter-spacing: 0; line-height: 1.1; }
      h1 { max-width: 12ch; font-size: 4rem; }
      h2 { font-size: 2rem; margin-top: 0; }
      h3 { font-size: 1.05rem; margin-bottom: .4rem; }
      p, li { color: var(--muted); line-height: 1.72; }
      .eyebrow, .meta { color: var(--gold); font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: .76rem; text-transform: uppercase; }
      .meta { display: flex; flex-wrap: wrap; gap: .7rem; margin: 1.2rem 0 2rem; color: var(--muted); }
      .meta span { border: 1px solid var(--line); padding: .38rem .56rem; }
      .abstract, .whitepaper-section { border-top: 1px solid var(--line); padding: 2rem 0; }
      .summary { color: var(--ink); font-size: 1.12rem; }
      ol, ul { padding-left: 1.2rem; }
      footer { border-top: 1px solid var(--line); padding-top: 1.4rem; color: var(--muted); font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: .72rem; }
      @media (max-width: 720px) { h1 { font-size: 2.6rem; } }
    </style>
  </head>
  <body>
    <main>
      <p class="eyebrow">Solvinter Edge Whitepaper</p>
      <h1>${htmlEscape(field.title)}</h1>
      <div class="meta">
        <span>version ${htmlEscape(version)}</span>
        <span>${htmlEscape(status)}</span>
        <span>generated from docs/${htmlEscape(field.id)}</span>
        <span>${htmlEscape(generatedAt)}</span>
      </div>
      <section class="abstract">
        <p class="eyebrow">Abstract</p>
        <p class="summary">${htmlEscape(abstract?.summary ?? field.summary)}</p>
      </section>
      ${chapters.map(renderPart).join("")}
      ${references ? renderPart(references) : ""}
      <footer>
        generated from docs/${htmlEscape(field.id)} at ${htmlEscape(generatedAt)}
      </footer>
    </main>
  </body>
</html>
`;
}

async function main() {
  const generatedAt = new Date().toISOString();
  const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
  const fields = [];

  for (const field of manifest.fields) {
    fields.push(await readField(field, manifest.parts));
  }

  await mkdir(generatedRoot, { recursive: true });
  await writeFile(
    path.join(generatedRoot, "research-data.js"),
    `export const researchData = ${JSON.stringify({ generatedAt, parts: manifest.parts, fields }, null, 2)};\n`,
  );

  const aiOperations = fields.find((field) => field.id === "ai-operations");
  if (aiOperations?.parts.length) {
    const outputDir = path.join(whitepaperRoot, "ai-operations");
    await mkdir(outputDir, { recursive: true });
    await writeFile(path.join(outputDir, "index.html"), renderWhitepaper(aiOperations, generatedAt));
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
