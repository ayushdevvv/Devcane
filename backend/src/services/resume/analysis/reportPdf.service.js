import { generatePDF } from "../../../utils/pdf/pdf.js";
import { generateAnalysisHTML } from "../../../utils/pdf/template/analysis.template.js";


export const generateReportPdf = async (analysis, fileName) => {
    const html = generateAnalysisHTML(analysis);
    const pdfPath = await generatePDF(html, fileName || `analysis-${analysis?._id || Date.now()}`);
    return pdfPath;
};