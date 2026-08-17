import { generateAnalysisPdf as generateAnalysisPdfKit } from "../../../utils/pdf/pdfkit/generate.js";

export const generateReportPdf = async (analysis, fileName) => {
    return generateAnalysisPdfKit(analysis, fileName || `analysis-${analysis?._id || Date.now()}`);
};