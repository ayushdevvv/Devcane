import { colors, fonts } from "./theme.js";
import { S } from "./layout.js";
import { safeArray, joinItems, formatRange, normalizeUrl, nonEmpty, safeLink, finite } from "./pdfUtils.js";
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
    sidebarBody: S(8.8, scale)
  };

  const lineGap = 1.1 * scale;

  let y = drawHeader(doc, resume, leftX, doc.y, pageWidth, sizes);
  doc.y = y;
  doc.moveDown(0.4);

  const colTop = doc.y;
  let leftY = colTop;
  let rightY = colTop;

  if (resume.summary && String(resume.summary).trim()) {
    leftY = sectionBlock(doc, "Summary", leftX, leftY, leftWidth, sizes, (x, y) => {
      doc.font(fonts.regular).fontSize(sizes.body).fillColor(colors.subtitle).text(String(resume.summary), x, y, { width: leftWidth, lineGap });
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

  const achievements = nonEmpty(resume.achievements, ["title", "description"]);
  if (achievements.length) {
    rightY = sectionBlock(doc, "Key Achievements", rightX, rightY, rightWidth, sizes, (x, startY) => {
      let y = startY;

      achievements.forEach((a, idx) => {
        const title = typeof a === "string" ? a : a.title || "";
        const desc = typeof a === "object" ? a.description || "" : "";

        doc.font(fonts.bold).fontSize(sizes.sidebarBody).fillColor(colors.text).text(String(title), x, y, { width: rightWidth });
        y = doc.y;

        if (desc) {
          doc.font(fonts.regular).fontSize(sizes.sidebarBody).fillColor(colors.subtitle).text(String(desc), x, y + 1, { width: rightWidth });
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
    ...safeArray(skills.others)
  ];

  if (flatSkills.length) {
    rightY = sectionBlock(doc, "Skills", rightX, rightY, rightWidth, sizes, (x, startY) => {
      let y = startY;

      flatSkills.forEach(skill => {
        const value = String(skill || "").trim();
        if (!value) return;

        doc.font(fonts.regular).fontSize(sizes.sidebarBody).fillColor(colors.subtitle).text(value, x, y, { width: rightWidth });
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
        const degree = [edu.degree, edu.field].filter(Boolean).join(", ");

        if (degree) {
          doc.font(fonts.bold).fontSize(sizes.sidebarBody).fillColor(colors.text).text(String(degree), x, y, { width: rightWidth });
          y = doc.y;
        }

        if (edu.institution) {
          doc.font(fonts.regular).fontSize(sizes.sidebarBody).fillColor(colors.subtitle).text(String(edu.institution), x, y, { width: rightWidth });
          y = doc.y;
        }

        const meta = [
          formatRange(edu.startDate, edu.endDate),
          edu.cgpa ? `CGPA: ${edu.cgpa}` : ""
        ].filter(Boolean).join("  •  ");

        if (meta) {
          doc.font(fonts.regular).fontSize(sizes.itemMeta).fillColor(colors.muted).text(meta, x, y, { width: rightWidth });
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
        doc.font(fonts.bold).fontSize(sizes.sidebarBody).fillColor(colors.text).text(String(cert.title || ""), x, y, { width: rightWidth });
        y = doc.y;

        const meta = [cert.issuer, cert.issueDate].filter(Boolean).join("  •  ");

        if (meta) {
          doc.font(fonts.regular).fontSize(sizes.itemMeta).fillColor(colors.muted).text(meta, x, y, { width: rightWidth });
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
  doc.font(fonts.bold).fontSize(sizes.name).fillColor(colors.text).text(String(resume.name || "Untitled"), x, y, { width });
  y = doc.y + 2;

  if (resume.title && String(resume.title).trim()) {
    doc.font(fonts.bold).fontSize(sizes.title).fillColor(colors.accent).text(String(resume.title), x, y, { width });
    y = doc.y + 4;
  }

  const contactItems = [];

  if (resume.phone) contactItems.push({ icon: "phone", label: String(resume.phone), link: `tel:${String(resume.phone).trim()}` });
  if (resume.email) contactItems.push({ icon: "mail", label: String(resume.email), link: `mailto:${String(resume.email).trim()}` });

  if (resume.links?.linkedin) {
    const url = normalizeUrl(resume.links.linkedin, "https://www.linkedin.com/in/");
    if (url) contactItems.push({ icon: "linkedin", label: "LinkedIn", link: url });
  }

  if (resume.links?.github) {
    const url = normalizeUrl(resume.links.github, "https://github.com/");
    if (url) contactItems.push({ icon: "github", label: "GitHub", link: url });
  }

  if (resume.links?.portfolio) {
    const url = normalizeUrl(resume.links.portfolio);
    if (url) contactItems.push({ icon: "link", label: "Portfolio", link: url });
  }

  if (resume.location) contactItems.push({ icon: "location", label: String(resume.location) });

  if (contactItems.length) y = drawIconRow(doc, contactItems, x, y, width, sizes.contact);

  y += 6;

  doc.moveTo(x, y).lineTo(x + width, y).strokeColor(colors.text).lineWidth(1.5).stroke();

  return y + 4;
}

function drawIconRow(doc, items, startX, startY, width, size) {
  const iconSize = size * 1.1;
  const gapAfterIcon = 3;
  const gapBetween = 14;
  const lineHeight = Math.max(iconSize, size) + 3;

  let x = startX;
  let y = startY;

  doc.font(fonts.regular).fontSize(size);

  items.forEach(item => {
    const label = String(item.label || "").trim();
    if (!label) return;

    const textWidth = finite(doc.widthOfString(label));
    const itemWidth = iconSize + gapAfterIcon + textWidth;

    if (x !== startX && x + itemWidth > startX + width) {
      x = startX;
      y += lineHeight;
    }

    const drawIcon = ICON_MAP[item.icon];

    if (drawIcon) drawIcon(doc, x, y - 1, iconSize, colors.subtitle);

    const textX = x + iconSize + gapAfterIcon;
    const textY = y;

    doc.font(fonts.regular).fontSize(size).fillColor(colors.subtitle).text(label, textX, textY, { lineBreak: false });

    if (item.link) safeLink(doc, textX, textY, textWidth, size + 3, item.link);

    x = textX + textWidth + gapBetween;
  });

  doc.fillColor(colors.text);

  return y + lineHeight;
}

function sectionBlock(doc, title, x, y, width, sizes, drawBody) {
  doc.font(fonts.bold).fontSize(sizes.sectionTitle).fillColor(colors.text).text(String(title).toUpperCase(), x, y, { width, characterSpacing: 0.4 });

  const titleBottom = doc.y + 2;

  doc.moveTo(x, titleBottom).lineTo(x + width, titleBottom).strokeColor(colors.text).lineWidth(1.25).stroke();

  const bodyStart = titleBottom + 6;
  const bodyEnd = drawBody(x, bodyStart);

  return bodyEnd + 10;
}

function drawExperienceItem(doc, exp, x, y, width, sizes, lineGap) {
  if (
    !Number.isFinite(x) ||
    !Number.isFinite(y) ||
    !Number.isFinite(width)
  ) {
    console.error("Invalid experience layout:", {
      x,
      y,
      width,
      exp,
    });

    return Number.isFinite(y) ? y : 0;
  }

  doc
    .font(fonts.bold)
    .fontSize(sizes.itemTitle)
    .fillColor(colors.text)
    .text(String(exp?.role || ""), x, y, {
      width,
    });

  y = Number.isFinite(doc.y) ? doc.y : y;

  const metaLine = [
    exp?.company,
    formatRange(
      exp?.startDate,
      exp?.endDate,
      exp?.current
    ),
    exp?.location,
  ]
    .filter(Boolean)
    .join("   •   ");

  if (metaLine) {
    doc
      .font(fonts.regular)
      .fontSize(sizes.itemMeta)
      .fillColor(colors.muted)
      .text(String(metaLine), x, y, {
        width,
      });

    y = Number.isFinite(doc.y) ? doc.y + 2 : y + 2;
  }

  const bullets = safeArray(exp?.description)
    .map((item) => String(item || "").trim())
    .filter(Boolean);

  if (bullets.length) {
    y = drawBulletList(
      doc,
      bullets,
      x,
      y,
      width,
      sizes.body,
      lineGap
    );
  }

  doc.fillColor(colors.text);

  return Number.isFinite(y) ? y : doc.y;
}
function drawProjectItem(doc, project, x, y, width, sizes, lineGap) {
  // Safety guard
  if (
    !Number.isFinite(x) ||
    !Number.isFinite(y) ||
    !Number.isFinite(width) ||
    !Number.isFinite(lineGap)
  ) {
    console.error("Invalid project layout:", {
      x,
      y,
      width,
      lineGap,
      project,
    });

    return Number.isFinite(y) ? y : 0;
  }

  const safeWidth = Math.max(1, width);

  // -----------------------------
  // Project title
  // -----------------------------
  const title = String(project?.title || "").trim();

  if (title) {
    doc
      .font(fonts.bold)
      .fontSize(sizes.itemTitle)
      .fillColor(colors.text)
      .text(title, x, y, {
        width: safeWidth,
      });

    y = Number.isFinite(doc.y) ? doc.y : y;
  }

  // -----------------------------
  // Tech stack
  // -----------------------------
  if (
    Array.isArray(project?.techStack) &&
    project.techStack.length
  ) {
    const techStack = joinItems(project.techStack, ", ");

    if (techStack) {
      doc
        .font(fonts.italic)
        .fontSize(sizes.itemMeta)
        .fillColor(colors.muted)
        .text(String(techStack), x, y, {
          width: safeWidth,
        });

      y = Number.isFinite(doc.y) ? doc.y + 2 : y + 2;
    }
  }

  // -----------------------------
  // Project links
  // -----------------------------
  const links = [];

  if (project?.github) {
    const url = normalizeUrl(
      project.github,
      "https://github.com/"
    );

    if (url) {
      links.push({
        icon: "github",
        label: "GitHub",
        url,
      });
    }
  }

  if (project?.live) {
    const url = normalizeUrl(project.live);

    if (url) {
      links.push({
        icon: "link",
        label: "Live Demo",
        url,
      });
    }
  }

  if (links.length) {
    const iconSize = Math.max(
      1,
      Number.isFinite(sizes.itemMeta)
        ? sizes.itemMeta * 1.2
        : 10
    );

    let lx = x;

    links.forEach((link) => {
      const drawIcon = ICON_MAP[link.icon];

      if (drawIcon) {
        drawIcon(
          doc,
          lx,
          y - 1,
          iconSize,
          colors.accent
        );
      }

      const textX = lx + iconSize + 3;
      const textY = y;

      if (
        !Number.isFinite(textX) ||
        !Number.isFinite(textY)
      ) {
        return;
      }

      doc
        .font(fonts.regular)
        .fontSize(sizes.itemMeta)
        .fillColor(colors.accent)
        .text(link.label, textX, textY, {
          underline: true,
          lineBreak: false,
        });

      const labelWidth = finite(
        doc.widthOfString(link.label)
      );

      if (Number.isFinite(labelWidth)) {
        safeLink(
          doc,
          textX,
          textY,
          labelWidth,
          sizes.itemMeta + 3,
          link.url
        );

        lx = textX + labelWidth + 12;
      }
    });

    y += iconSize + 4;

    if (!Number.isFinite(y)) {
      y = Number.isFinite(doc.y) ? doc.y : y;
    }

    doc.fillColor(colors.text);
  }

  // -----------------------------
  // Description bullets
  // -----------------------------
  const bullets = safeArray(project?.description)
    .map((item) => String(item || "").trim())
    .filter(Boolean);

  if (bullets.length) {
    y = drawBulletList(
      doc,
      bullets,
      x,
      y,
      safeWidth,
      sizes.body,
      lineGap
    );
  }

  doc.fillColor(colors.text);

  return Number.isFinite(y) ? y : doc.y;
}

function drawBulletList(
  doc,
  bullets,
  x,
  y,
  width,
  fontSize,
  lineGap = 1.1
) {
  if (
    !Number.isFinite(x) ||
    !Number.isFinite(y) ||
    !Number.isFinite(width) ||
    !Number.isFinite(fontSize)
  ) {
    console.error("Invalid bullet list layout:", {
      x,
      y,
      width,
      fontSize,
      lineGap,
    });

    return Number.isFinite(y) ? y : 0;
  }

  const bulletSize = Math.max(1, fontSize * 0.16);
  const bulletGap = 7;
  const textX = x + 10;
  const textWidth = Math.max(1, width - 10);

  bullets.forEach((bullet) => {
    if (!bullet) return;

    // Bullet
    doc
      .circle(
        x + 2.5,
        y + fontSize * 0.42,
        bulletSize
      )
      .fillColor(colors.subtitle)
      .fill();

    // Text
    doc
      .font(fonts.regular)
      .fontSize(fontSize)
      .fillColor(colors.subtitle)
      .text(String(bullet), textX, y, {
        width: textWidth,
        lineGap: Number.isFinite(lineGap) ? lineGap : 1.1,
      });

    y = Number.isFinite(doc.y)
      ? doc.y + 3
      : y + fontSize + 3;
  });

  return y;
}