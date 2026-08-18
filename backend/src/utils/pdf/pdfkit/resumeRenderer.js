import { colors, fonts } from "./theme.js";
import { S, drawDivider } from "./layout.js";
import { safeArray, joinItems, formatRange, normalizeUrl, nonEmpty } from "./pdfUtils.js";
import { ICON_MAP } from "./icons.js";

const LEFT_RATIO = 0.63;
const COL_GAP = 22;

export const drawResume = (doc, resume = {}, scale = 1) => {
  const pageWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right;
  const leftX = doc.page.margins.left;
  const leftWidth = pageWidth * LEFT_RATIO - COL_GAP / 2;
  const rightX = leftX + leftWidth + COL_GAP;
  const rightWidth = pageWidth - leftWidth - COL_GAP;

  const sizes = {
    name: S(21, scale),
    title: S(11, scale),
    contact: S(8.6, scale),
    sectionTitle: S(10.5, scale),
    itemTitle: S(10, scale),
    itemSubtitle: S(9, scale),
    itemMeta: S(8.4, scale),
    body: S(9.2, scale),
    sidebarBody: S(8.8, scale),
  };
  const lineGap = 1.1 * scale;

  let y = drawHeader(doc, resume, leftX, doc.y, pageWidth, sizes);
  doc.y = y;
  doc.moveDown(0.4);

  const colTop = doc.y;
  let leftY = colTop;
  let rightY = colTop;

  // ---- LEFT COLUMN ----
  if (resume.summary && resume.summary.trim()) {
    leftY = sectionBlock(doc, "Summary", leftX, leftY, leftWidth, sizes, (x, y) => {
      doc.font(fonts.regular).fontSize(sizes.body).fillColor(colors.subtitle)
         .text(resume.summary, x, y, { width: leftWidth, lineGap });
      return doc.y;
    });
  }

  const experience = nonEmpty(resume.experience, ["company", "role"]);
  if (experience.length) {
    leftY = sectionBlock(doc, "Experience", leftX, leftY, leftWidth, sizes, (x, startY) => {
      let y = startY;
      experience.forEach((exp, idx) => {
        y = drawExperienceItem(doc, exp, x, y, leftWidth, sizes, lineGap);
        if (idx < experience.length - 1) y += 6 * scale;
      });
      return y;
    });
  }

  const projects = nonEmpty(resume.projects, ["title"]);
  if (projects.length) {
    leftY = sectionBlock(doc, "Projects", leftX, leftY, leftWidth, sizes, (x, startY) => {
      let y = startY;
      projects.forEach((project, idx) => {
        y = drawProjectItem(doc, project, x, y, leftWidth, sizes, lineGap);
        if (idx < projects.length - 1) y += 6 * scale;
      });
      return y;
    });
  }

  // ---- RIGHT COLUMN (sidebar) ----
  const achievements = nonEmpty(resume.achievements, ["title", "description"]);
  if (achievements.length) {
    rightY = sectionBlock(doc, "Key Achievements", rightX, rightY, rightWidth, sizes, (x, startY) => {
      let y = startY;
      achievements.forEach((a, idx) => {
        const title = (typeof a === "string" ? a : a.title) || "";
        const desc = typeof a === "object" ? a.description : "";
        doc.font(fonts.bold).fontSize(sizes.sidebarBody).fillColor(colors.text)
           .text(title, x, y, { width: rightWidth, lineGap });
        y = doc.y;
        if (desc) {
          doc.font(fonts.regular).fontSize(sizes.sidebarBody).fillColor(colors.subtitle)
             .text(desc, x, y + 1, { width: rightWidth, lineGap });
          y = doc.y;
        }
        if (idx < achievements.length - 1) y += 6 * scale;
      });
      return y;
    });
  }

  const skills = resume.skills || {};
  const flatSkills = [
    ...safeArray(skills.languages),
    ...safeArray(skills.frameworks),
    ...safeArray(skills.databases),
    ...safeArray(skills.tools),
    ...safeArray(skills.others),
  ];
  if (flatSkills.length) {
    rightY = sectionBlock(doc, "Skills", rightX, rightY, rightWidth, sizes, (x, startY) => {
      let y = startY;
      flatSkills.forEach((skill) => {
        doc.font(fonts.regular).fontSize(sizes.sidebarBody).fillColor(colors.subtitle)
           .text(skill, x, y, { width: rightWidth });
        y = doc.y + 2 * scale;
        doc.moveTo(x, y).lineTo(x + rightWidth, y).strokeColor(colors.border).lineWidth(0.5).stroke();
        y += 5 * scale;
      });
      return y - 5 * scale;
    });
  }

  const education = nonEmpty(resume.education, ["institution", "degree"]);
  if (education.length) {
    rightY = sectionBlock(doc, "Education", rightX, rightY, rightWidth, sizes, (x, startY) => {
      let y = startY;
      education.forEach((edu, idx) => {
        doc.font(fonts.bold).fontSize(sizes.sidebarBody).fillColor(colors.text)
           .text([edu.degree, edu.field].filter(Boolean).join(", "), x, y, { width: rightWidth });
        y = doc.y;
        if (edu.institution) {
          doc.font(fonts.regular).fontSize(sizes.sidebarBody).fillColor(colors.subtitle)
             .text(edu.institution, x, y, { width: rightWidth });
          y = doc.y;
        }
        const meta = [formatRange(edu.startDate, edu.endDate), edu.cgpa ? `CGPA: ${edu.cgpa}` : ""].filter(Boolean).join("  •  ");
        if (meta) {
          doc.font(fonts.regular).fontSize(sizes.itemMeta).fillColor(colors.muted)
             .text(meta, x, y, { width: rightWidth });
          y = doc.y;
        }
        if (idx < education.length - 1) y += 6 * scale;
      });
      return y;
    });
  }

  const certifications = nonEmpty(resume.certifications, ["title", "issuer"]);
  if (certifications.length) {
    rightY = sectionBlock(doc, "Certifications", rightX, rightY, rightWidth, sizes, (x, startY) => {
      let y = startY;
      certifications.forEach((cert, idx) => {
        doc.font(fonts.bold).fontSize(sizes.sidebarBody).fillColor(colors.text)
           .text(cert.title || "", x, y, { width: rightWidth });
        y = doc.y;
        const meta = [cert.issuer, cert.issueDate].filter(Boolean).join("  •  ");
        if (meta) {
          doc.font(fonts.regular).fontSize(sizes.itemMeta).fillColor(colors.muted)
             .text(meta, x, y, { width: rightWidth });
          y = doc.y;
        }
        if (idx < certifications.length - 1) y += 6 * scale;
      });
      return y;
    });
  }

  doc.y = Math.max(leftY, rightY);
};

function drawHeader(doc, resume, x, y, width, sizes) {
  doc.font(fonts.bold).fontSize(sizes.name).fillColor(colors.text)
     .text(resume.name || "Untitled", x, y, { width });
  y = doc.y + 2;

  if (resume.title && resume.title.trim()) {
    doc.font(fonts.bold).fontSize(sizes.title).fillColor(colors.accent)
       .text(resume.title, x, y, { width });
    y = doc.y + 4;
  }

  const contactItems = [];
  if (resume.phone) contactItems.push({ icon: "phone", label: resume.phone, link: `tel:${resume.phone}` });
  if (resume.email) contactItems.push({ icon: "mail", label: resume.email, link: `mailto:${resume.email}` });
  if (resume.links?.linkedin) contactItems.push({ icon: "linkedin", label: "LinkedIn", link: normalizeUrl(resume.links.linkedin, "https://www.linkedin.com/in/") });
  if (resume.links?.github) contactItems.push({ icon: "github", label: "GitHub", link: normalizeUrl(resume.links.github, "https://github.com/") });
  if (resume.links?.portfolio) contactItems.push({ icon: "link", label: "Portfolio", link: normalizeUrl(resume.links.portfolio) });
  if (resume.location) contactItems.push({ icon: "location", label: resume.location });

  if (contactItems.length) {
    y = drawIconRow(doc, contactItems, x, y, width, sizes.contact);
  }

  y += 6;
  doc.moveTo(x, y).lineTo(x + width, y).strokeColor(colors.text).lineWidth(1.5).stroke();
  return y + 4;
}

function drawIconRow(doc, items, startX, startY, width, size) {
  const iconSize = size * 1.1;
  const gapAfterIcon = 3;
  const gapBetween = 14;
  let x = startX;
  let y = startY;
  const lineHeight = Math.max(iconSize, size) + 3;

  doc.font(fonts.regular).fontSize(size);

  items.forEach((item) => {
    const textWidth = doc.widthOfString(item.label);
    const itemWidth = iconSize + gapAfterIcon + textWidth;

    if (x + itemWidth > startX + width) {
      x = startX;
      y += lineHeight;
    }

    const drawIcon = ICON_MAP[item.icon];
    if (drawIcon) drawIcon(doc, x, y - 1, iconSize, colors.subtitle);

    const textX = x + iconSize + gapAfterIcon;
    doc.fillColor(colors.subtitle).text(item.label, textX, y, item.link
      ? { link: item.link, continued: false, lineBreak: false }
      : { continued: false, lineBreak: false });

    x = textX + textWidth + gapBetween;
  });

  doc.fillColor(colors.text);
  return y + lineHeight;
}

function sectionBlock(doc, title, x, y, width, sizes, drawBody) {
  doc.font(fonts.bold).fontSize(sizes.sectionTitle).fillColor(colors.text)
     .text(title.toUpperCase(), x, y, { width, characterSpacing: 0.4 });
  const titleBottom = doc.y + 2;
  doc.moveTo(x, titleBottom).lineTo(x + width, titleBottom).strokeColor(colors.text).lineWidth(1.25).stroke();
  const bodyStart = titleBottom + 6;
  const bodyEnd = drawBody(x, bodyStart);
  return bodyEnd + 10;
}

function drawExperienceItem(doc, exp, x, y, width, sizes, lineGap) {
  doc.font(fonts.bold).fontSize(sizes.itemTitle).fillColor(colors.text)
     .text(exp.role || "", x, y, { width });
  y = doc.y;

  const metaLine = [exp.company, formatRange(exp.startDate, exp.endDate, exp.current), exp.location]
    .filter(Boolean).join("   •   ");
  if (metaLine) {
    doc.font(fonts.regular).fontSize(sizes.itemMeta).fillColor(colors.muted)
       .text(metaLine, x, y, { width });
    y = doc.y + 2;
  }

  const bullets = safeArray(exp.description);
  if (bullets.length) {
    doc.font(fonts.regular).fontSize(sizes.body).fillColor(colors.subtitle);
    doc.list(bullets, x, y, { width, bulletRadius: 1.3, textIndent: 10, lineGap });
    y = doc.y;
  }
  doc.fillColor(colors.text);
  return y;
}

function drawProjectItem(doc, project, x, y, width, sizes, lineGap) {
  doc.font(fonts.bold).fontSize(sizes.itemTitle).fillColor(colors.text)
     .text(project.title || "", x, y, { width });
  y = doc.y;

  if (project.techStack?.length) {
    doc.font(fonts.italic).fontSize(sizes.itemMeta).fillColor(colors.muted)
       .text(joinItems(project.techStack, ", "), x, y, { width });
    y = doc.y + 2;
  }

  const links = [];
  if (project.github) links.push({ icon: "github", label: "GitHub", url: normalizeUrl(project.github, "https://github.com/") });
  if (project.live) links.push({ icon: "link", label: "Live Demo", url: normalizeUrl(project.live) });
  if (links.length) {
    const iconSize = sizes.itemMeta * 1.2;
    let lx = x;
    links.forEach((l) => {
      const drawIcon = ICON_MAP[l.icon];
      if (drawIcon) drawIcon(doc, lx, y - 1, iconSize, colors.accent);
      const textX = lx + iconSize + 3;
      doc.font(fonts.regular).fontSize(sizes.itemMeta).fillColor(colors.accent)
         .text(l.label, textX, y, { link: l.url, underline: true, continued: false, lineBreak: false });
      lx = textX + doc.widthOfString(l.label) + 12;
    });
    y += iconSize + 4;
    doc.fillColor(colors.text);
  }

  const bullets = safeArray(project.description);
  if (bullets.length) {
    doc.font(fonts.regular).fontSize(sizes.body).fillColor(colors.subtitle);
    doc.list(bullets, x, y, { width, bulletRadius: 1.3, textIndent: 10, lineGap });
    y = doc.y;
  }
  doc.fillColor(colors.text);
  return y;
}