import { colors, fonts } from "./theme.js";

// scale a base size down, but never below 55% of original (readability floor)
export const S = (base, scale) => Math.max(base * scale, base * 0.55);

export function sectionTitle(doc, text, size, width, gap) {
  doc.moveDown(0.35);
  doc.font(fonts.bold).fontSize(size).fillColor(colors.text)
     .text(String(text).toUpperCase(), { width, characterSpacing: 0.4 });
  drawDivider(doc, width, colors.border);
  doc.moveDown((gap?.afterSectionTitle || 5) / 10);
  doc.font(fonts.regular).fillColor(colors.text);
}

export function drawDivider(doc, width, color) {
  const x = doc.x;
  const y = doc.y + 1;
  doc.moveTo(x, y).lineTo(x + width, y).strokeColor(color).lineWidth(0.75).stroke();
  doc.moveDown(0.15);
}