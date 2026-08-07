import { generatePDF } from "../../../utils/pdf/pdf.js";
import { generateResumeHTML } from "../../../utils/pdf/template/resume.template.js";


export const generateResumePdf = async (resume, fileName) => {
    const html = generateResumeHTML(resume);
    const pdfPath = await generatePDF(html, fileName || `resume-${resume?._id || Date.now()}`);
    return pdfPath;
};