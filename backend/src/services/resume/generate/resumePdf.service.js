import { generateResumePdf as generateResumePdfKit } from "../../../utils/pdf/pdfkit/generate.js";

export const generateResumePdf = async (resume, fileName) => {
    return generateResumePdfKit(resume, fileName || `resume-${resume?._id || Date.now()}`);
};