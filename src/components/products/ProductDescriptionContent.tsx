import {
  descriptionBlocksWithoutSection,
  parseProductDescription,
  splitInlineBold,
  type DescriptionBlock,
} from "@/lib/format-product-description";

type Props = {
  description: string;
  excludeSections?: string[];
};

function InlineText({ text }: { text: string }) {
  const parts = splitInlineBold(text);
  return (
    <>
      {parts.map((part, i) =>
        part.bold ? (
          <strong key={i} className="font-semibold text-slate-900 dark:text-slate-100">
            {part.text}
          </strong>
        ) : (
          <span key={i}>{part.text}</span>
        )
      )}
    </>
  );
}

function BlockList({
  items,
  ordered,
}: {
  items: string[];
  ordered?: boolean;
}) {
  const Tag = ordered ? "ol" : "ul";
  return (
    <Tag
      className={
        ordered
          ? "product-prose-list product-prose-list-ordered"
          : "product-prose-list"
      }
    >
      {items.map((item) => (
        <li key={item}>
          <InlineText text={item} />
        </li>
      ))}
    </Tag>
  );
}

function RenderBlocks({ blocks }: { blocks: DescriptionBlock[] }) {
  if (blocks.length === 0) return null;

  const nodes: React.ReactNode[] = [];
  let i = 0;

  while (i < blocks.length) {
    const block = blocks[i];

    if (block.type === "heading") {
      const sectionBlocks: DescriptionBlock[] = [];
      i += 1;
      while (i < blocks.length && blocks[i].type !== "heading") {
        sectionBlocks.push(blocks[i]);
        i += 1;
      }

      nodes.push(
        <section
          key={`section-${block.text}`}
          className="product-content-section"
        >
          <div className="product-content-section-header">
            <span className="product-content-section-dot" aria-hidden />
            {block.level === 2 ? (
              <h2 className="product-content-section-title">{block.text}</h2>
            ) : (
              <h3 className="product-content-section-subtitle">{block.text}</h3>
            )}
          </div>
          <div className="product-content-section-body">
            {sectionBlocks.map((inner, idx) => {
              if (inner.type === "paragraph") {
                return (
                  <p key={idx} className="product-prose-paragraph">
                    <InlineText text={inner.text} />
                  </p>
                );
              }
              if (inner.type === "list") {
                return (
                  <BlockList
                    key={idx}
                    items={inner.items}
                    ordered={inner.ordered}
                  />
                );
              }
              if (inner.type === "heading") {
                return inner.level === 2 ? (
                  <h2 key={idx} className="product-content-section-title mt-6">
                    {inner.text}
                  </h2>
                ) : (
                  <h3 key={idx} className="product-content-section-subtitle mt-4">
                    {inner.text}
                  </h3>
                );
              }
              return null;
            })}
          </div>
        </section>
      );
      continue;
    }

    if (block.type === "paragraph") {
      nodes.push(
        <p key={`p-${i}`} className="product-prose-paragraph">
          <InlineText text={block.text} />
        </p>
      );
    }

    if (block.type === "list") {
      nodes.push(
        <BlockList key={`list-${i}`} items={block.items} ordered={block.ordered} />
      );
    }

    i += 1;
  }

  return <div className="product-prose">{nodes}</div>;
}

export function ProductDescriptionContent({
  description,
  excludeSections = ["what you will learn"],
}: Props) {
  const trimmed = description.trim();
  if (!trimmed) return null;

  const blocks =
    excludeSections.length > 0
      ? descriptionBlocksWithoutSection(trimmed, excludeSections)
      : parseProductDescription(trimmed);

  if (blocks.length === 0) return null;

  return <RenderBlocks blocks={blocks} />;
}
