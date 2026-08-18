export const drawMailIcon = (doc, x, y, size, color) => {
  if (![x, y, size].every(Number.isFinite)) return;
  doc.save();
  doc.rect(x, y + size * 0.15, size, size * 0.7).lineWidth(0.9).strokeColor(color).stroke();
  doc.moveTo(x, y + size * 0.15).lineTo(x + size / 2, y + size * 0.55).lineTo(x + size, y + size * 0.15).strokeColor(color).lineWidth(0.9).stroke();
  doc.restore();
};

export const drawPhoneIcon = (doc, x, y, size, color) => {
  if (![x, y, size].every(Number.isFinite)) return;
  doc.save();
  doc.roundedRect(x + size * 0.25, y, size * 0.5, size, size * 0.18).lineWidth(0.9).strokeColor(color).stroke();
  doc.circle(x + size / 2, y + size * 0.8, size * 0.06).fillColor(color).fill();
  doc.restore();
};

export const drawLocationIcon = (doc, x, y, size, color) => {
  if (![x, y, size].every(Number.isFinite)) return;
  const cx = x + size / 2;
  doc.save();
  doc.circle(cx, y + size * 0.35, size * 0.35).lineWidth(0.9).strokeColor(color).stroke();
  doc.moveTo(cx - size * 0.15, y + size * 0.58).lineTo(cx, y + size).lineTo(cx + size * 0.15, y + size * 0.58).fillColor(color).fill();
  doc.circle(cx, y + size * 0.35, size * 0.12).fillColor(color).fill();
  doc.restore();
};

export const drawLinkedInIcon = (doc, x, y, size, color) => {
  if (![x, y, size].every(Number.isFinite)) return;
  doc.save();
  doc.roundedRect(x, y, size, size, size * 0.15).lineWidth(0.9).strokeColor(color).stroke();
  doc.circle(x + size * 0.32, y + size * 0.3, size * 0.055).fillColor(color).fill();
  doc.rect(x + size * 0.265, y + size * 0.42, size * 0.11, size * 0.32).fillColor(color).fill();
  doc.lineWidth(size * 0.1).strokeColor(color).moveTo(x + size * 0.55, y + size * 0.47).lineTo(x + size * 0.55, y + size * 0.74).stroke();
  doc.lineWidth(size * 0.1).strokeColor(color).moveTo(x + size * 0.55, y + size * 0.57).lineTo(x + size * 0.72, y + size * 0.57).stroke();
  doc.restore();
};

export const drawGithubIcon = (doc, x, y, size, color) => {
  if (![x, y, size].every(Number.isFinite)) return;
  doc.save();
  const cx = x + size / 2;
  const cy = y + size / 2;
  const r = size * 0.42;
  doc.circle(cx, cy, r).lineWidth(0.9).strokeColor(color).stroke();
  doc.circle(cx - size * 0.15, cy - size * 0.08, size * 0.045).fillColor(color).fill();
  doc.circle(cx + size * 0.15, cy - size * 0.08, size * 0.045).fillColor(color).fill();
  doc.moveTo(cx - size * 0.16, cy + size * 0.12).quadraticCurveTo(cx, cy + size * 0.25, cx + size * 0.16, cy + size * 0.12).strokeColor(color).lineWidth(size * 0.06).stroke();
  doc.restore();
};

export const drawLinkIcon = (doc, x, y, size, color) => {
  if (![x, y, size].every(Number.isFinite)) return;
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
  link: drawLinkIcon
};