import { C } from "./pdfTheme.js";
import { heading, ensurePage } from "./pdfHelpers.js";

const none = (doc, msg = "No data available.") => {
  doc.fillColor(C.muted).font("Helvetica").fontSize(11)
    .text(msg, 40, doc.y, { width: 515 });
  doc.moveDown(1.2);
};

export const summarySection = (doc, summary) => {
  heading(doc, "Executive Summary");
  doc.fillColor(C.text).font("Helvetica").fontSize(11)
    .text(summary || "No summary available.", 40, doc.y, { width: 515, lineGap: 5 });
  doc.moveDown(1.2);
};

export const bulletSection = (doc, title, items = [], color = C.green) => {
  heading(doc, title);
  if (!items.length) return none(doc);

  items.forEach((item, idx) => {
    ensurePage(doc, 38);
    const y = doc.y;
    doc.fillColor(color).circle(52, y + 5, 3).fill();
    doc.fillColor(C.text).font("Helvetica").fontSize(11)
      .text(typeof item === "string" ? item : JSON.stringify(item),
        66, y, { width: 450, lineGap: 4 });
    // only add gap between items, not after last
    if (idx < items.length - 1) doc.moveDown(0.3);
  });
  doc.moveDown(1.2);
};

export const skillGapSection = (doc, skills = []) => {
  heading(doc, "Skill Gap Analysis");
  if (!skills.length) return none(doc, "No skill gaps detected.");

  skills.forEach((s, idx) => {
    ensurePage(doc, 30);
    const color = s.severity === "high" ? C.red : s.severity === "low" ? C.green : C.gold;
    const y = doc.y;

    doc.fillColor(color).circle(52, y + 5, 3).fill();

    doc.font("Helvetica").fontSize(11);
    const nameW = doc.widthOfString(s.skill);
    doc.fillColor(C.text).text(s.skill, 66, y, { lineBreak: false });

    // severity badge after skill name
    const bx = 66 + nameW + 8;
    const sevText = s.severity.toUpperCase();
    doc.font("Helvetica-Bold").fontSize(7);
    const bw = doc.widthOfString(sevText) + 10;
    doc.roundedRect(bx, y + 1, bw, 13, 3).fill(color + "33");
    doc.fillColor(color).text(sevText, bx + 5, y + 3, { lineBreak: false });

    doc.y = y + 18;
    if (idx < skills.length - 1) doc.moveDown(0.3);
  });
  doc.moveDown(1.2);
};

export const keywordSection = (doc, title, keywords = []) => {
  heading(doc, title);
  if (!keywords.length) return none(doc, "No keywords.");

  const pillH = 22, pillPadX = 14, gap = 8, maxX = 520, startX = 45;
  doc.font("Helvetica").fontSize(10);

  // pre-calculate rows
  const rows = [];
  let row = [], x = startX;
  keywords.forEach((word) => {
    const w = doc.widthOfString(word) + pillPadX * 2;
    if (x + w > maxX && row.length > 0) { rows.push(row); row = []; x = startX; }
    row.push({ word, w });
    x += w + gap;
  });
  if (row.length) rows.push(row);

  const totalH = rows.length * (pillH + gap);
  ensurePage(doc, totalH + 20);

  let curY = doc.y;
  rows.forEach((r) => {
    let curX = startX;
    r.forEach(({ word, w }) => {
      doc.roundedRect(curX, curY, w, pillH, 5).fill(C.card);
      doc.fillColor(C.text).font("Helvetica").fontSize(10)
        .text(word, curX + pillPadX, curY + 6, { lineBreak: false });
      curX += w + gap;
    });
    curY += pillH + gap;
  });

  // set y exactly after pills — no extra moveDown
  doc.y = curY + 4;
  doc.moveDown(1.2);
};

export const roadmapSection = (doc, roadmap = []) => {
  heading(doc, "Learning Roadmap");
  if (!roadmap.length) return none(doc, "No roadmap generated.");

  roadmap.forEach((step, idx) => {
    ensurePage(doc, 60);
    const y = doc.y;

    doc.circle(58, y + 10, 10).fill(C.blue);
    doc.fillColor(C.white).font("Helvetica-Bold").fontSize(9)
      .text(`${idx + 1}`, 53, y + 5, { width: 10, align: "center", lineBreak: false });

    const text = typeof step === "string" ? step : step.focus || step.title || "";
    doc.fillColor(C.text).font("Helvetica-Bold").fontSize(11)
      .text(text, 82, y + 3, { width: 430, lineGap: 3 });

    if (Array.isArray(step.tasks) && step.tasks.length) {
      step.tasks.forEach((task) => {
        ensurePage(doc, 22);
        doc.fillColor(C.muted).font("Helvetica").fontSize(10)
          .text(`› ${task}`, 96, doc.y, { width: 415, lineGap: 3 });
      });
    }

    // gap between steps but not after last
    if (idx < roadmap.length - 1) doc.moveDown(0.8);
  });
  // no trailing moveDown — generateReport draws footer right after
};