import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/slug";

export type UniqueSlugOptions = {
  /** When updating, ignore this product so its current slug does not count as a conflict. */
  excludeProductId?: string;
};

/** MySQL / Prisma default string length safety */
const MAX_SLUG_LEN = 180;
const MAX_BASE_LEN = 72;
const MAX_NUMERIC_SUFFIX_ATTEMPTS = 400;

function clampSlug(s: string): string {
  return s.slice(0, MAX_SLUG_LEN);
}

function fallbackSlug(prefix: string): string {
  const p = (prefix || "product").slice(0, 40);
  const rnd = `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`;
  return clampSlug(`${p}-x${rnd}`);
}

/**
 * Builds a base slug from title or explicit slug, then ensures it is unique in DB
 * by appending -1, -2, … if needed. Never throws: on DB errors returns a time-random slug.
 */
export async function resolveUniqueProductSlug(
  title: string,
  explicitSlug: string | undefined,
  options?: UniqueSlugOptions
): Promise<string> {
  let base = (explicitSlug ?? "").trim();
  if (!base) {
    base = slugify(title);
  }
  if (!base) {
    base = `product-${Date.now().toString(36)}`;
  }
  base = base.slice(0, MAX_BASE_LEN).replace(/-+$/g, "") || "product";

  for (let n = 0; n < MAX_NUMERIC_SUFFIX_ATTEMPTS; n++) {
    const candidate = clampSlug(n === 0 ? base : `${base}-${n}`);
    try {
      const existing = await prisma.product.findFirst({
        where: {
          slug: candidate,
          ...(options?.excludeProductId
            ? { NOT: { id: options.excludeProductId } }
            : {}),
        },
        select: { id: true },
      });
      if (!existing) return candidate;
    } catch (e) {
      console.error("[resolveUniqueProductSlug] DB lookup failed — using fallback slug", e);
      return fallbackSlug(base);
    }
  }

  console.warn("[resolveUniqueProductSlug] max suffix attempts — using fallback slug");
  return fallbackSlug(base);
}
