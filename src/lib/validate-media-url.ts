export function isValidMediaUrl(url: string): boolean {
  if (!url) return false;
  if (url.startsWith("/")) return url.length > 1;
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

export function mediaUrlError(field: string): string {
  return `${field} must be a full URL (https://...) or a path starting with /. Upload the file using Choose File — do not type a file name.`;
}
