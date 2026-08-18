export const safeArray = (value) =>
  Array.isArray(value) ? value.filter(Boolean) : [];

export const joinItems = (items = [], separator = ", ") =>
  safeArray(items).map((i) => String(i).trim()).filter(Boolean).join(separator);

export const formatRange = (start, end, current = false) => {
  const s = (start || "").toString().trim();
  const e = current ? "Present" : (end || "").toString().trim();
  if (!s && !e) return "";
  if (s && e) return `${s} - ${e}`;
  return s || e;
};

export const normalizeUrl = (value, prefix) => {
  if (!value) return "";
  const v = String(value).trim();
  if (v.startsWith("http://") || v.startsWith("https://")) return v;
  return prefix ? `${prefix}${v}` : `https://${v}`;
};

export const nonEmpty = (arr, checkFields) =>
  safeArray(arr).filter((item) =>
    checkFields.some((f) => {
      const v = item?.[f];
      return Array.isArray(v) ? v.length > 0 : !!(v && String(v).trim());
    })
  );