import styles from "../css.js";
import { icons } from "../icons.js";
import {
    escapeHtml,
    joinItems,
    renderBulletList,
    renderSection,
    renderKeyValueLine,
    formatRange,
    safeArray
} from "../helper.js";

const linkItem = (icon, label, value, href) => {
    if (!value) return "";
    const safeValue = escapeHtml(value);
    const safeHref = href ? escapeHtml(href) : safeValue;

    return `
        <span class="contact-item">
            ${icon}
            <a href="${safeHref}" target="_blank" rel="noreferrer">${label ? `${escapeHtml(label)}: ` : ""}${safeValue}</a>
        </span>
    `;
};

const header = (resume) => {
    const links = [];

    if (resume.email) links.push(linkItem(icons.email, "", resume.email, `mailto:${resume.email}`));
    if (resume.phone) links.push(linkItem(icons.phone, "", resume.phone, `tel:${resume.phone}`));
    if (resume.location) links.push(linkItem(icons.location, "", resume.location));

    if (resume.linkedin) {
        const url = resume.linkedin.startsWith("http")
            ? resume.linkedin
            : `https://www.linkedin.com/in/${resume.linkedin}`;
        links.push(linkItem(icons.linkedin, "LinkedIn", resume.linkedin, url));
    }

    if (resume.github) {
        const url = resume.github.startsWith("http")
            ? resume.github
            : `https://github.com/${resume.github}`;
        links.push(linkItem(icons.github, "GitHub", resume.github, url));
    }

    if (resume.portfolio) {
        const url = resume.portfolio.startsWith("http")
            ? resume.portfolio
            : `https://${resume.portfolio}`;
        links.push(linkItem(icons.portfolio, "Portfolio", resume.portfolio, url));
    }

    return `
        <header class="header">
            <h1 class="name">${escapeHtml(resume.name || "")}</h1>
            ${resume.summary ? `<div class="title">${escapeHtml(resume.summary)}</div>` : ""}
            <div class="contact-row">
                ${links.join("")}
            </div>
        </header>
    `;
};

const educationSection = (resume) => {
    const content = safeArray(resume.education).map(edu => `
        <div class="item">
            <div class="item-head">
                <div class="item-left">
                    <h3 class="item-title">${escapeHtml(edu.degree || "")}${edu.field ? `, ${escapeHtml(edu.field)}` : ""}</h3>
                    <div class="item-subtitle">${escapeHtml(edu.institution || "")}</div>
                </div>
                <div class="item-meta">
                    ${escapeHtml(formatRange(edu.startDate, edu.endDate))}
                    ${edu.cgpa ? `<div>${escapeHtml(edu.cgpa)}</div>` : ""}
                </div>
            </div>
        </div>
    `).join("");

    return renderSection("Education", content);
};

const experienceSection = (resume) => {
    const content = safeArray(resume.experience).map(exp => `
        <div class="item">
            <div class="item-head">
                <div class="item-left">
                    <h3 class="item-title">${escapeHtml(exp.role || "")}</h3>
                    <div class="item-subtitle">${escapeHtml(exp.company || "")}${exp.location ? ` • ${escapeHtml(exp.location)}` : ""}</div>
                </div>
                <div class="item-meta">
                    ${escapeHtml(formatRange(exp.startDate, exp.endDate, exp.current))}
                </div>
            </div>
            <div class="item-desc">
                ${renderBulletList(exp.description)}
            </div>
        </div>
    `).join("");

    return renderSection("Experience", content);
};

const projectsSection = (resume) => {
    const content = safeArray(resume.projects).map(project => `
        <div class="item">
            <div class="item-head">
                <div class="item-left">
                    <h3 class="item-title">${escapeHtml(project.title || "")}</h3>
                    ${project.techStack?.length ? `<div class="item-subtitle">${escapeHtml(joinItems(project.techStack, ", "))}</div>` : ""}
                </div>
                <div class="item-meta">
                    ${project.github ? `<a href="${escapeHtml(project.github.startsWith("http") ? project.github : `https://github.com/${project.github}`)}" target="_blank" rel="noreferrer">GitHub</a>` : ""}
                    ${project.live ? `<div><a href="${escapeHtml(project.live.startsWith("http") ? project.live : `https://${project.live}`)}" target="_blank" rel="noreferrer">Live</a></div>` : ""}
                </div>
            </div>
            <div class="item-desc">
                ${renderBulletList(project.description)}
            </div>
        </div>
    `).join("");

    return renderSection("Projects", content);
};

const skillsSection = (resume) => {
    const skills = resume.skills || {};

    const rows = [
        ["Languages", skills.languages],
        ["Frameworks", skills.frameworks],
        ["Databases", skills.databases],
        ["Tools", skills.tools],
        ["Others", skills.others]
    ].map(([label, values]) => {
        const list = safeArray(values);
        if (!list.length) return "";
        return `
            <div class="skills-row">
                <div class="skills-label">${escapeHtml(label)}</div>
                <div class="skills-value">${escapeHtml(joinItems(list, ", "))}</div>
            </div>
        `;
    }).filter(Boolean).join("");

    return renderSection("Skills", `<div class="skills-grid">${rows}</div>`);
};

const certificationsSection = (resume) => {
    const content = safeArray(resume.certifications).map(cert => `
        <div class="item">
            <div class="item-head">
                <div class="item-left">
                    <h3 class="item-title">${escapeHtml(cert.title || "")}</h3>
                    ${cert.issuer ? `<div class="item-subtitle">${escapeHtml(cert.issuer)}</div>` : ""}
                </div>
                <div class="item-meta">${escapeHtml(cert.issueDate || "")}</div>
            </div>
        </div>
    `).join("");

    return renderSection("Certifications", content);
};

const achievementsSection = (resume) => {
    const content = safeArray(resume.achievements).map(item => `
        <div class="item">
            <div class="item-head">
                <div class="item-left">
                    <h3 class="item-title">${escapeHtml(item.title || item)}</h3>
                    ${item.description ? `<div class="item-subtitle">${escapeHtml(item.description)}</div>` : ""}
                </div>
            </div>
        </div>
    `).join("");

    return renderSection("Achievements", content);
};

export const generateResumeHTML = (resume) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8" />
    <style>${styles}</style>
</head>
<body>
    <div class="page">
        ${header(resume)}
        ${renderSection("Professional Summary", `<p class="summary">${escapeHtml(resume.summary || "")}</p>`)}
        ${experienceSection(resume)}
        ${projectsSection(resume)}
        ${educationSection(resume)}
        ${skillsSection(resume)}
        ${certificationsSection(resume)}
        ${achievementsSection(resume)}
    </div>
</body>
</html>
`;