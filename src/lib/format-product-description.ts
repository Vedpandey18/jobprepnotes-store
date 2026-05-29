export type DescriptionBlock =
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean };

function isBulletLine(line: string): boolean {
  return /^[-•*]\s+/.test(line);
}

function isOrderedLine(line: string): boolean {
  return /^\d+\.\s+/.test(line);
}

function stripBullet(line: string): string {
  return line.replace(/^[-•*]\s+/, "").trim();
}

function stripOrdered(line: string): string {
  return line.replace(/^\d+\.\s+/, "").trim();
}

export function parseProductDescription(raw: string): DescriptionBlock[] {
  const blocks: DescriptionBlock[] = [];
  const lines = raw.replace(/\r\n/g, "\n").split("\n");

  let paragraphLines: string[] = [];
  let listItems: string[] = [];
  let listOrdered = false;

  function flushParagraph() {
    const text = paragraphLines.join(" ").trim();
    if (text) blocks.push({ type: "paragraph", text });
    paragraphLines = [];
  }

  function flushList() {
    if (listItems.length > 0) {
      blocks.push({
        type: "list",
        items: [...listItems],
        ordered: listOrdered,
      });
    }
    listItems = [];
    listOrdered = false;
  }

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line) {
      flushList();
      flushParagraph();
      continue;
    }

    if (line.startsWith("## ")) {
      flushList();
      flushParagraph();
      blocks.push({ type: "heading", level: 2, text: line.slice(3).trim() });
      continue;
    }

    if (line.startsWith("### ")) {
      flushList();
      flushParagraph();
      blocks.push({ type: "heading", level: 3, text: line.slice(4).trim() });
      continue;
    }

    if (isBulletLine(line)) {
      flushParagraph();
      if (listItems.length > 0 && listOrdered) flushList();
      listOrdered = false;
      listItems.push(stripBullet(line));
      continue;
    }

    if (isOrderedLine(line)) {
      flushParagraph();
      if (listItems.length > 0 && !listOrdered) flushList();
      listOrdered = true;
      listItems.push(stripOrdered(line));
      continue;
    }

    flushList();
    paragraphLines.push(line);
  }

  flushList();
  flushParagraph();
  return blocks;
}

export function extractListFromSection(
  raw: string,
  sectionTitle: string
): string[] {
  const blocks = parseProductDescription(raw);
  const target = sectionTitle.toLowerCase();
  let inSection = false;
  const items: string[] = [];

  for (const block of blocks) {
    if (block.type === "heading") {
      if (inSection) break;
      inSection = block.text.toLowerCase().includes(target);
      continue;
    }
    if (inSection && block.type === "list") {
      items.push(...block.items);
    }
  }

  return items;
}

export function descriptionBlocksWithoutSection(
  raw: string,
  sectionTitles: string[]
): DescriptionBlock[] {
  const blocks = parseProductDescription(raw);
  const targets = sectionTitles.map((t) => t.toLowerCase());
  const result: DescriptionBlock[] = [];
  let skip = false;

  for (const block of blocks) {
    if (block.type === "heading") {
      skip = targets.some((t) => block.text.toLowerCase().includes(t));
      if (!skip) result.push(block);
      continue;
    }
    if (!skip) result.push(block);
  }

  return result;
}

export function splitInlineBold(text: string): Array<{ bold: boolean; text: string }> {
  const parts: Array<{ bold: boolean; text: string }> = [];
  const regex = /\*\*(.+?)\*\*/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ bold: false, text: text.slice(lastIndex, match.index) });
    }
    parts.push({ bold: true, text: match[1] });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push({ bold: false, text: text.slice(lastIndex) });
  }

  return parts.length > 0 ? parts : [{ bold: false, text }];
}
