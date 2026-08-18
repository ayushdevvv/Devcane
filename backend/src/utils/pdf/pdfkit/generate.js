import path from "path";
import { countPages, writeToFile, ensureTempDir } from "./renderEngine.js";
import { drawResume } from "./resumeRenderer.js";
import { drawAnalysis } from "./analysisRenderer.js";

const MARGIN = { top: 32, bottom: 32, left: 36, right: 36 };
const SCALE_STEPS = [1, 0.95, 0.9, 0.85, 0.8, 0.75, 0.7, 0.65];

async function fitAndRender(drawFn, data, filePath) {
  let chosenScale = SCALE_STEPS[SCALE_STEPS.length - 1];

  for (const scale of SCALE_STEPS) {
    const pages = await countPages(doc => drawFn(doc, data, scale), MARGIN);

    console.log(`PDF scale ${scale}: ${pages} page(s)`);

    if (pages <= 1) {
      chosenScale = scale;
      break;
    }
  }

  console.log(`PDF selected scale: ${chosenScale}`);

  return writeToFile(doc => drawFn(doc, data, chosenScale), filePath, MARGIN);
}

export const generateResumePdf = async (resume, fileName) => {
  const dir = ensureTempDir();
  const safeName = fileName || `resume-${resume?._id || Date.now()}`;
  const filePath = path.join(dir, `${safeName}.pdf`);
  return fitAndRender(drawResume, resume, filePath);
};

export const generateAnalysisPdf = async (analysis, fileName) => {
  const dir = ensureTempDir();
  const safeName = fileName || `analysis-${analysis?._id || Date.now()}`;
  const filePath = path.join(dir, `${safeName}.pdf`);
  return fitAndRender(drawAnalysis, analysis, filePath);
};