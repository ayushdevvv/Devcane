import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { C } from "./pdfTheme.js";

const logo = path.join(path.dirname(fileURLToPath(import.meta.url)), "logo.png");

export const drawHeader = (doc, analysis) => {
  doc.roundedRect(35, 35, 525, 88, 14).fill(C.card);

  if (fs.existsSync(logo))
    doc.image(logo, 54, 56, { width: 34, height: 34 });

  doc.fillColor(C.white).font("Helvetica-Bold").fontSize(22).text("Devcane", 103, 50);
  doc.fillColor(C.blue).font("Helvetica").fontSize(12).text("AI Resume Analysis Report", 103, 78);
  doc.fillColor(C.muted).fontSize(9)
    .text(new Date().toLocaleDateString(), 430, 50, { width: 100, align: "right" });
  doc.fillColor(C.muted).fontSize(9)
    .text(analysis.filename, 103, 100, { width: 350, ellipsis: true });

  doc.y = 148;
};