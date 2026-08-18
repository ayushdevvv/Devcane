// src/utils/pdf/pdfKit/icons.js

export const drawMailIcon = (doc, x, y, size, color) => {
  doc.save();
  doc.rect(x, y + size * 0.15, size, size * 0.7).lineWidth(0.9).strokeColor(color).stroke();
  doc.moveTo(x, y + size * 0.15)
     .lineTo(x + size / 2, y + size * 0.55)
     .lineTo(x + size, y + size * 0.15)
     .strokeColor(color).lineWidth(0.9).stroke();
  doc.restore();
};

export const drawPhoneIcon = (doc, x, y, size, color) => {
  doc.save();
  doc.roundedRect(x + size * 0.25, y, size * 0.5, size, size * 0.18)
     .lineWidth(0.9).strokeColor(color).stroke();
  doc.circle(x + size / 2, y + size * 0.8, size * 0.06).fillColor(color).fill();
  doc.restore();
};

export const drawLocationIcon = (doc, x, y, size, color) => {
  doc.save();
  const cx = x + size / 2;
  doc.circle(cx, y + size * 0.35, size * 0.35).lineWidth(0.9).strokeColor(color).stroke();
  doc.moveTo(cx - size * 0.15, y + size * 0.58)
     .lineTo(cx, y + size)
     .lineTo(cx + size * 0.15, y + size * 0.58)
     .fillColor(color).fill();
  doc.circle(cx, y + size * 0.35, size * 0.12).fillColor(color).fill();
  doc.restore();
};

// These two draw text glyphs for the icon (letters), so font state leaks — save/restore it manually.
export const drawLinkedInIcon = (doc, x, y, size, color) => {
  const prevFont = doc._font;
  const prevSize = doc._fontSize;

  doc.save();
  doc.roundedRect(x, y, size, size, size * 0.15).lineWidth(0.9).strokeColor(color).stroke();
  doc.font("Helvetica-Bold").fontSize(size * 0.55).fillColor(color)
     .text("in", x, y + size * 0.2, { width: size, align: "center" });
  doc.restore();

  if (prevFont) doc.font(prevFont);
  if (Number.isFinite(prevSize)) doc.fontSize(prevSize);
};

export const drawGithubIcon = (doc, x, y, size, color) => {
  const prevFont = doc._font;
  const prevSize = doc._fontSize;

  doc.save();
  const cx = x + size / 2, cy = y + size / 2, r = size / 2;
  doc.circle(cx, cy, r).lineWidth(0.9).strokeColor(color).stroke();
  doc.font("Helvetica-Bold").fontSize(size * 0.42).fillColor(color)
     .text("</>", x, y + size * 0.28, { width: size, align: "center" });
  doc.restore();

  if (prevFont) doc.font(prevFont);
  if (Number.isFinite(prevSize)) doc.fontSize(prevSize);
};

export const drawLinkIcon = (doc, x, y, size, color) => {
  doc.save();
  doc.lineWidth(1.1).strokeColor(color);
  doc.ellipse(x + size * 0.3, y + size * 0.5, size * 0.28, size * 0.16).stroke();
  doc.ellipse(x + size * 0.7, y + size * 0.5, size * 0.28, size * 0.16).stroke();
  doc.restore();
};

export const ICON_MAP = {
  mail: drawMailIcon,
  phone: drawPhoneIcon,
  location: drawLocationIcon,
  linkedin: drawLinkedInIcon,
  github: drawGithubIcon,
  link: drawLinkIcon,
};