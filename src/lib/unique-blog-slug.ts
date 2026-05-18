import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/slug";

export type UniqueBlogSlugOptions = {
  /** When updating, ignore this post so its current slug does not count as a conflict. */
  excludeBlogId?: string;
};

const MAX_SLUG_LEN = 180;
const MAX_BASE_LEN = 72;
const MAX_NUMERIC_SUFFIX_ATTEMPTS = 400;

function clampSlug(s: string): string {
  return s.slice(0, MAX_SLUG_LEN);
}

function fallbackSlug(prefix: string): string {
  const p = (prefix || "post").slice(0, 40);
  const rnd = `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`;
  return clampSlug(`${p}-x${rnd}`);
}

/**
 * Builds a base slug from title or explicit slug, then ensures it is unique for blogs
 * by appending -1, -2, … if needed. Never throws: on DB errors returns a time-random slug.
 */
export async function resolveUniqueBlogSlug(
  title: string,
  explicitSlug: string | undefined,
  options?: UniqueBlogSlugOptions
): Promise<string> {
  let base = (explicitSlug ?? "").trim();
  if (!base) {
    base = slugify(title);
  }
  if (!base) {
    base = `post-${Date.now().toString(36)}`;
  }
  base = base.slice(0, MAX_BASE_LEN).replace(/-+$/g, "") || "post";

  for (let n = 0; n < MAX_NUMERIC_SUFFIX_ATTEMPTS; n++) {
    const candidate = clampSlug(n === 0 ? base : `${base}-${n}`);
    try {
      const existing = await prisma.blog.findFirst({
        where: {
          slug: candidate,
          ...(options?.excludeBlogId
            ? { NOT: { id: options.excludeBlogId } }
            : {}),
        },
        select: { id: true },
      });
      if (!existing) return candidate;
    } catch (e) {
      console.error("[resolveUniqueBlogSlug] DB lookup failed — using fallback slug", e);
      return fallbackSlug(base);
    }
  }

  console.warn("[resolveUniqueBlogSlug] max suffix attempts — using fallback slug");
  return fallbackSlug(base);
}
