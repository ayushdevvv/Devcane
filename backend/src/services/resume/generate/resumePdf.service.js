import { generateResumePdf as generateResumePdfKit } from "../../../utils/pdf/pdfkit/generate.js";

export const generateResumePdf = async (resume, fileName) => {
  const name = fileName || `resume-${resume?._id || Date.now()}`;
  return generateResumePdfKit(resume, name);
};