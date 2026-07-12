import { C } from "./pdfTheme.js";

export const verdict = (score) => {
  if (score >= 90) return { text: "Excellent",       color: C.green };
  if (score >= 80) return { text: "Strong",          color: C.blue };
  if (score >= 65) return { text: "Good",            color: "#60A5FA" };
  if (score >= 50) return { text: "Average",         color: C.gold };
  return             { text: "Needs Improvement",    color: C.red };
};

export const bg = (doc) =>
  doc.rect(0, 0, doc.page.width, doc.page.height).fill(C.bg);

export const divider = (doc) => {
  doc.strokeColor(C.border).lineWidth(0.6)
    .moveTo(40, doc.y).lineTo(doc.page.width - 40, doc.y).stroke();
  doc.moveDown(0.5);
};

export const ensurePage = (doc, h = 120) => {
  // Only add a new page if content truly won't fit — use tighter bottom margin
  if (doc.y + h < doc.page.height - 48) return;
  doc.addPage();
  bg(doc);  // always paint dark bg — prevents white pages
  doc.y = 45;
};

export const heading = (doc, title) => {
  ensurePage(doc, 80);
  doc.fillColor(C.blue).font("Helvetica-Bold").fontSize(16)
    .text(title, 40, doc.y, { width: 515 });
  doc.moveDown(0.25);
  divider(doc);
  doc.moveDown(0.15);
};