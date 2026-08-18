export const safeArray = value => Array.isArray(value) ? value.filter(Boolean) : [];

export const joinItems = (items, separator = ", ") => safeArray(items).join(separator);

export const nonEmpty = (arr, keys = []) => safeArray(arr).filter(item => {
  if (typeof item === "string") return item.trim();
  if (!item || typeof item !== "object") return false;
  return keys.length ? keys.some(key => String(item[key] || "").trim()) : true;
});

export const formatRange = (start, end, current = false) => {
  const s = String(start || "").trim();
  const e = current ? "Present" : String(end || "").trim();
  return [s, e].filter(Boolean).join(" – ");
};

export const normalizeUrl = (url, fallback = "") => {
  if (typeof url !== "string") return fallback;

  let value = url.trim();
  if (!value) return fallback;

  if (/^https?:\/\//i.test(value)) return value;
  if (/^mailto:/i.test(value) || /^tel:/i.test(value)) return value;

  if (value.startsWith("www.")) return `https://${value}`;

  return `${fallback}${value.replace(/^\/+/, "")}`;
};
export const finite = (value, fallback = 0) => Number.isFinite(Number(value)) ? Number(value) : fallback;

export const safeLink = (doc, x, y, width, height, url) => {
  const link = normalizeUrl(url);
  const lx = finite(x);
  const ly = finite(y);
  const lw = Math.max(0, finite(width));
  const lh = Math.max(0, finite(height));

  if (!link || lw <= 0 || lh <= 0) return false;

  try {
    doc.link(lx, ly, lw, lh, link);
    return true;
  } catch (err) {
    console.warn("PDF link skipped:", err.message);
    return false;
  }
};