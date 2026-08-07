export default `
* {
    box-sizing: border-box;
}

@page {
    size: A4;
    margin: 14mm 12mm;
}

html, body {
    margin: 0;
    padding: 0;
    background: #fff;
}

body {
    font-family: Arial, Helvetica, sans-serif;
    color: #111827;
    font-size: 10.6px;
    line-height: 1.48;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
}

a {
    color: #0f172a;
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}

.page {
    width: 100%;
}

.header {
    padding-bottom: 12px;
    border-bottom: 1.5px solid #d1d5db;
    margin-bottom: 14px;
}

.name {
    font-size: 22px;
    line-height: 1.15;
    font-weight: 800;
    letter-spacing: 0.2px;
    margin: 0;
    color: #0f172a;
}

.title {
    margin: 4px 0 0;
    font-size: 12px;
    font-weight: 700;
    color: #334155;
}

.contact-row {
    display: flex;
    flex-wrap: wrap;
    gap: 8px 12px;
    margin-top: 10px;
    color: #334155;
    font-size: 10px;
}

.contact-item {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    white-space: nowrap;
}

.contact-item svg {
    width: 11px;
    height: 11px;
    fill: currentColor;
    flex: 0 0 auto;
}

.section {
    margin-top: 13px;
    break-inside: avoid;
    page-break-inside: avoid;
}

.section-title {
    font-size: 11.5px;
    font-weight: 800;
    letter-spacing: 0.7px;
    color: #0f172a;
    margin: 0 0 7px;
    padding-bottom: 4px;
    border-bottom: 1px solid #e5e7eb;
    text-transform: uppercase;
}

.section-body {
    margin-top: 0;
}

.summary {
    margin: 0;
    color: #111827;
    font-size: 10.8px;
}

.item {
    margin-bottom: 10px;
    break-inside: avoid;
    page-break-inside: avoid;
}

.item:last-child {
    margin-bottom: 0;
}

.item-head {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    align-items: baseline;
}

.item-left {
    min-width: 0;
}

.item-title {
    margin: 0;
    font-size: 11.1px;
    font-weight: 800;
    color: #111827;
}

.item-subtitle {
    margin: 2px 0 0;
    color: #374151;
    font-weight: 700;
}

.item-meta {
    color: #6b7280;
    font-size: 9.9px;
    text-align: right;
    white-space: nowrap;
    flex: 0 0 auto;
}

.item-desc {
    margin-top: 5px;
}

.bullet-list {
    margin: 6px 0 0 16px;
    padding: 0;
}

.bullet-list li {
    margin-bottom: 3px;
    padding-left: 1px;
}

.kv-line {
    margin: 0 0 3px;
}

.kv-label {
    font-weight: 700;
    color: #111827;
}

.kv-value {
    color: #374151;
}

.skills-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 6px;
}

.skills-row {
    display: flex;
    gap: 8px;
    align-items: flex-start;
}

.skills-label {
    min-width: 86px;
    font-weight: 800;
    color: #111827;
}

.skills-value {
    flex: 1;
    color: #374151;
}

.badge-row {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 5px;
}

.badge {
    display: inline-block;
    padding: 3px 7px;
    border: 1px solid #d1d5db;
    border-radius: 999px;
    font-size: 9px;
    font-weight: 700;
    color: #334155;
    background: #f8fafc;
}

.score-card {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 14px;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    background: #f9fafb;
    margin-bottom: 12px;
}

.score-badge {
    width: 58px;
    height: 58px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 4px solid #111827;
    font-size: 15px;
    font-weight: 800;
    color: #111827;
    flex: 0 0 auto;
}

.score-text h1 {
    margin: 0;
    font-size: 15px;
    font-weight: 800;
    color: #111827;
}

.score-text p {
    margin: 4px 0 0;
    color: #4b5563;
    font-size: 10.5px;
}

.callout {
    padding: 10px 12px;
    border: 1px solid #e5e7eb;
    border-radius: 10px;
    background: #fff;
    margin-bottom: 8px;
}

.callout h3 {
    margin: 0 0 4px;
    font-size: 10.8px;
    font-weight: 800;
    color: #111827;
}

.callout p {
    margin: 0;
    color: #374151;
}

.footer-note {
    margin-top: 14px;
    padding-top: 8px;
    border-top: 1px solid #e5e7eb;
    font-size: 9px;
    color: #6b7280;
    text-align: center;
}

.section, .item, .callout, .score-card {
    orphans: 3;
    widows: 3;
}
`;