import { generateAnalysisPdf as generateAnalysisPdfKit } from "../../../utils/pdf/pdfKit/generate.js";

export const generateReportPdf = async (analysis, fileName) => {
    return generateAnalysisPdfKit(analysis, fileName || `analysis-${analysis?._id || Date.now()}`);
};