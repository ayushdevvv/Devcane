import { colors, fonts } from "./theme.js";

export const S = (base, scale = 1) => {
  const b = Number(base);
  const s = Number(scale);
  if (!Number.isFinite(b)) return 0;
  if (!Number.isFinite(s)) return b;
  return Math.max(b * s, b * 0.55);
};

export function sectionTitle(doc, text, size, width, gap) {
  doc.moveDown(0.35);
  doc.font(fonts.bold).fontSize(size).fillColor(colors.text).text(String(text || "").toUpperCase(), { width, characterSpacing: 0.4 });
  drawDivider(doc, width, colors.border);
  doc.moveDown((gap?.afterSectionTitle || 5) / 10);
  doc.font(fonts.regular).fillColor(colors.text);
}

export function drawDivider(doc, width, color) {
  const x = Number(doc.x);
  const y = Number(doc.y) + 1;

  if (!Number.isFinite(x) || !Number.isFinite(y) || !Number.isFinite(width)) return;

  doc.moveTo(x, y).lineTo(x + width, y).strokeColor(color).lineWidth(0.75).stroke();
  doc.moveDown(0.15);
}