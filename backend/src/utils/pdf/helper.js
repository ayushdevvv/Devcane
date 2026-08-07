export const escapeHtml = (value = "") =>
    String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");

export const cleanText = (value = "") =>
    String(value).replace(/\s+/g, " ").trim();

export const joinItems = (items = [], separator = " • ") =>
    (Array.isArray(items) ? items : [])
        .filter(Boolean)
        .map(item => cleanText(item))
        .filter(Boolean)
        .join(separator);

export const renderBulletList = (items = []) => {
    const list = (Array.isArray(items) ? items : []).filter(Boolean);
    if (!list.length) return "";

    return `
        <ul class="bullet-list">
            ${list.map(item => `<li>${escapeHtml(item)}</li>`).join("")}
        </ul>
    `;
};

export const renderSection = (title, content = "") => {
    if (!content || !content.trim()) return "";

    return `
        <section class="section">
            <h2 class="section-title">${escapeHtml(title)}</h2>
            <div class="section-body">
                ${content}
            </div>
        </section>
    `;
};

export const renderKeyValueLine = (label, value) => {
    if (!value) return "";
    return `
        <p class="kv-line">
            <span class="kv-label">${escapeHtml(label)}:</span>
            <span class="kv-value">${escapeHtml(value)}</span>
        </p>
    `;
};

export const formatRange = (startDate, endDate, current = false) => {
    const start = cleanText(startDate || "");
    const end = current ? "Present" : cleanText(endDate || "");
    if (!start && !end) return "";
    if (start && end) return `${start} — ${end}`;
    return start || end;
};

export const safeArray = (value) => Array.isArray(value) ? value.filter(Boolean) : [];