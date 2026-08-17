import { colors, fonts } from "./theme.js";
import { S, sectionTitle, drawDivider } from "./layout.js";
import { safeArray, joinItems, formatRange, normalizeUrl } from "./pdfUtils.js";

export const drawResume = (doc, resume = {}, scale = 1) => {
  const contentWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right;

  const sizes = {
    name: S(19, scale),
    contact: S(9, scale),
    sectionTitle: S(10.5, scale),
    itemTitle: S(10.2, scale),
    itemSubtitle: S(9.2, scale),
    itemMeta: S(8.8, scale),
    body: S(9.3, scale),
    label: S(9.3, scale),
  };

  const gap = {
    afterSectionTitle: 5 * scale,
    afterItem: 7 * scale,
    lineGap: 1.1 * scale,
  };

  doc.font(fonts.bold).fontSize(sizes.name).fillColor(colors.text)
     .text(resume.name || "Untitled", { width: contentWidth });

  doc.moveDown(0.2);

  const contacts = [];
  if (resume.email) contacts.push({ label: resume.email, link: `mailto:${resume.email}` });
  if (resume.phone) contacts.push({ label: resume.phone, link: `tel:${resume.phone}` });
  if (resume.location) contacts.push({ label: resume.location });
  if (resume.links?.linkedin) contacts.push({ label: "LinkedIn", link: normalizeUrl(resume.links.linkedin, "https://www.linkedin.com/in/") });
  if (resume.links?.github) contacts.push({ label: "GitHub", link: normalizeUrl(resume.links.github, "https://github.com/") });
  if (resume.links?.portfolio) contacts.push({ label: "Portfolio", link: normalizeUrl(resume.links.portfolio) });

  writeInlineChain(doc, contacts, sizes.contact, contentWidth);

  doc.moveDown(0.3);
  drawDivider(doc, contentWidth, colors.borderStrong);
  doc.moveDown(0.2);

  if (resume.summary) {
    sectionTitle(doc, "Professional Summary", sizes.sectionTitle, contentWidth, gap);
    doc.font(fonts.regular).fontSize(sizes.body).fillColor(colors.text)
       .text(resume.summary, { width: contentWidth, lineGap: gap.lineGap });
    doc.moveDown(gap.afterItem / 10);
  }

  const experience = safeArray(resume.experience);
  if (experience.length) {
    sectionTitle(doc, "Experience", sizes.sectionTitle, contentWidth, gap);
    experience.forEach((exp, idx) => {
      itemRow(doc, {
        title: exp.role || "",
        subtitle: [exp.company, exp.location].filter(Boolean).join(" • "),
        meta: formatRange(exp.startDate, exp.endDate, exp.current),
      }, sizes, contentWidth);
      renderBullets(doc, exp.description, sizes.body, contentWidth, gap);
      if (idx < experience.length - 1) doc.moveDown(gap.afterItem / 10);
    });
    doc.moveDown(gap.afterItem / 10);
  }

  const projects = safeArray(resume.projects);
  if (projects.length) {
    sectionTitle(doc, "Projects", sizes.sectionTitle, contentWidth, gap);
    projects.forEach((project, idx) => {
      itemRow(doc, {
        title: project.title || "",
        subtitle: joinItems(project.techStack, ", "),
      }, sizes, contentWidth);
      renderProjectLinks(doc, project, sizes.itemMeta);
      renderBullets(doc, project.description, sizes.body, contentWidth, gap);
      if (idx < projects.length - 1) doc.moveDown(gap.afterItem / 10);
    });
    doc.moveDown(gap.afterItem / 10);
  }

  const education = safeArray(resume.education);
  if (education.length) {
    sectionTitle(doc, "Education", sizes.sectionTitle, contentWidth, gap);
    education.forEach((edu) => {
      itemRow(doc, {
        title: [edu.degree, edu.field].filter(Boolean).join(", "),
        subtitle: edu.institution || "",
        meta: [formatRange(edu.startDate, edu.endDate), edu.cgpa ? `CGPA: ${edu.cgpa}` : ""].filter(Boolean).join("   "),
      }, sizes, contentWidth);
      doc.moveDown(gap.afterItem / 14);
    });
    doc.moveDown(gap.afterItem / 14);
  }

  const skills = resume.skills || {};
  const skillRows = [
    ["Languages", skills.languages],
    ["Frameworks", skills.frameworks],
    ["Databases", skills.databases],
    ["Tools", skills.tools],
    ["Others", skills.others],
  ].filter(([, v]) => safeArray(v).length);

  if (skillRows.length) {
    sectionTitle(doc, "Skills", sizes.sectionTitle, contentWidth, gap);
    const labelWidth = 78 * scale;
    skillRows.forEach(([label, values]) => {
      const startX = doc.x;
      const startY = doc.y;
      doc.font(fonts.bold).fontSize(sizes.label).fillColor(colors.text)
         .text(label, startX, startY, { width: labelWidth });
      const labelBottom = doc.y;
      doc.font(fonts.regular).fillColor(colors.subtitle)
         .text(joinItems(values, ", "), startX + labelWidth + 6, startY, { width: contentWidth - labelWidth - 6 });
      doc.x = startX;
      doc.y = Math.max(labelBottom, doc.y);
      doc.moveDown(0.12);
    });
    doc.moveDown(gap.afterItem / 14);
  }

  const certifications = safeArray(resume.certifications);
  if (certifications.length) {
    sectionTitle(doc, "Certifications", sizes.sectionTitle, contentWidth, gap);
    certifications.forEach((cert) => {
      itemRow(doc, {
        title: cert.title || "",
        subtitle: cert.issuer || "",
        meta: cert.issueDate || "",
      }, sizes, contentWidth);
      doc.moveDown(gap.afterItem / 14);
    });
    doc.moveDown(gap.afterItem / 14);
  }

  const achievements = safeArray(resume.achievements);
  if (achievements.length) {
    sectionTitle(doc, "Achievements", sizes.sectionTitle, contentWidth, gap);
    achievements.forEach((a) => {
      const title = (typeof a === "string" ? a : a.title) || "";
      const desc = typeof a === "object" ? a.description : "";
      doc.font(fonts.bold).fontSize(sizes.body).fillColor(colors.text)
         .text(title, { width: contentWidth, continued: !!desc });
      if (desc) {
        doc.font(fonts.regular).fillColor(colors.subtitle).text(`  —  ${desc}`, { width: contentWidth });
      }
      doc.moveDown(0.15);
    });
  }
};

function writeInlineChain(doc, contacts, size, width) {
  if (!contacts.length) return;
  doc.font(fonts.regular).fontSize(size);
  contacts.forEach((c, idx) => {
    const isLast = idx === contacts.length - 1;
    const opts = { continued: !isLast, width };
    if (c.link) {
      doc.fillColor(colors.subtitle).text(c.label, { ...opts, link: c.link });
    } else {
      doc.fillColor(colors.subtitle).text(c.label, opts);
    }
    if (!isLast) {
      doc.fillColor(colors.muted).text("   |   ", { continued: true });
    }
  });
  doc.fillColor(colors.text);
}

function itemRow(doc, { title, subtitle, meta }, sizes, width) {
  const leftWidth = meta ? width * 0.68 : width;
  const rightWidth = width * 0.32;
  const startX = doc.x;
  const startY = doc.y;

  doc.font(fonts.bold).fontSize(sizes.itemTitle).fillColor(colors.text)
     .text(title || "", startX, startY, { width: leftWidth });
  const titleBottom = doc.y;

  let metaBottom = startY;
  if (meta) {
    doc.font(fonts.regular).fontSize(sizes.itemMeta).fillColor(colors.muted)
       .text(meta, startX + leftWidth, startY, { width: rightWidth, align: "right" });
    metaBottom = doc.y;
  }

  doc.x = startX;
  doc.y = Math.max(titleBottom, metaBottom);

  if (subtitle) {
    doc.font(fonts.regular).fontSize(sizes.itemSubtitle).fillColor(colors.subtitle)
       .text(subtitle, startX, doc.y, { width });
  }
}

function renderProjectLinks(doc, project, size) {
  const links = [];
  if (project.github) links.push({ label: "GitHub", url: normalizeUrl(project.github, "https://github.com/") });
  if (project.live) links.push({ label: "Live Demo", url: normalizeUrl(project.live) });
  if (!links.length) return;

  doc.font(fonts.regular).fontSize(size);
  links.forEach((l, idx) => {
    const isLast = idx === links.length - 1;
    doc.fillColor(colors.accent).text(l.label, { continued: !isLast, link: l.url, underline: true });
    if (!isLast) {
      doc.fillColor(colors.muted).text("   |   ", { continued: true, underline: false });
    }
  });
  doc.fillColor(colors.text);
  doc.moveDown(0.1);
}

function renderBullets(doc, items, size, width, gap) {
  const list = safeArray(items);
  if (!list.length) return;
  doc.font(fonts.regular).fontSize(size).fillColor(colors.subtitle);
  doc.list(list, doc.x, doc.y, {
    width,
    bulletRadius: 1.4,
    textIndent: 10,
    bulletIndent: 2,
    lineGap: gap.lineGap,
  });
  doc.fillColor(colors.text);
}