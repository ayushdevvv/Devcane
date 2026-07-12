import { C } from "./pdfTheme.js";
import { verdict } from "./pdfHelpers.js";

export const drawScoreCard = (doc, score = 0) => {
  const r = verdict(score);
  const x = 35, y = doc.y, w = 525, h = 130;

  doc.roundedRect(x, y, w, h, 12).fill(C.card);

  // "Overall ATS Score" label
  doc.fillColor(C.muted).font("Helvetica").fontSize(10)
    .text("Overall ATS Score", x + 22, y + 16, { lineBreak: false });

  // Score number — measure width BEFORE drawing
  const scoreStr = `${score}`;
  doc.font("Helvetica-Bold").fontSize(46);
  const scoreW = doc.widthOfString(scoreStr);

  doc.fillColor(r.color)
    .text(scoreStr, x + 22, y + 30, { lineBreak: false });

  // /100 — placed exactly after score using measured width
  doc.fillColor(C.muted).font("Helvetica").fontSize(16)
    .text("/100", x + 22 + scoreW + 3, y + 46, { lineBreak: false });

  // Verdict badge — separate row below score
  const badgeY = y + 92;
  doc.font("Helvetica-Bold").fontSize(11);
  const badgeW = doc.widthOfString(r.text) + 20;
  doc.roundedRect(x + 22, badgeY, badgeW, 22, 6).fill(C.border);
  doc.fillColor(r.color).text(r.text, x + 32, badgeY + 5, { lineBreak: false });

  // Right — progress bar
  const bx = x + 215, by = y + 48, bw = 280, bh = 10;

  doc.fillColor(C.muted).font("Helvetica").fontSize(8)
    .text("0",   bx,       by - 14, { lineBreak: false })
    .text("50",  bx + 128, by - 14, { lineBreak: false })
    .text("100", bx + 256, by - 14, { lineBreak: false });

  doc.roundedRect(bx, by, bw, bh, 4).fill(C.border);
  const fill = (bw * Math.min(Math.max(score, 0), 100)) / 100;
  if (fill > 0) doc.roundedRect(bx, by, fill, bh, 4).fill(r.color);

  doc.fillColor(C.muted).font("Helvetica").fontSize(9)
    .text(
      "ATS compatibility based on keyword relevance, formatting and recruiter expectations.",
      bx, by + 18,
      { width: 268, lineGap: 3, paragraphGap: 0 }
    );

  doc.y = y + h + 22;
};