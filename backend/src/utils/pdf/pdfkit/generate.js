import path from "path";
import { countPages, writeToFile, ensureTempDir } from "./renderEngine.js";
import { drawResume } from "./resumeRenderer.js";
import { drawAnalysis } from "./analysisRenderer.js";

const MARGIN = { top: 32, bottom: 32, left: 36, right: 36 };
const SCALE_STEPS = [1, 0.95, 0.9, 0.85, 0.8, 0.75, 0.7, 0.65];

// Renders into a throwaway doc at each scale step (largest first) until one
// fits on a single page, then does the real render at that scale.
async function fitAndRender(drawFn, data, filePath) {
  let chosenScale = SCALE_STEPS[SCALE_STEPS.length - 1];

  for (const scale of SCALE_STEPS) {
    const pages = await countPages((doc) => drawFn(doc, data, scale), MARGIN);
    if (pages <= 1) {
      chosenScale = scale;
      break;
    }
  }

  return writeToFile((doc) => drawFn(doc, data, chosenScale), filePath, MARGIN);
}

export const generateResumePdf = async (resume, fileName) => {
  const dir = ensureTempDir();
  const filePath = path.join(dir, `${fileName || `resume-${resume?._id || Date.now()}`}.pdf`);
  return fitAndRender(drawResume, resume, filePath);
};

export const generateAnalysisPdf = async (analysis, fileName) => {
  const dir = ensureTempDir();
  const filePath = path.join(dir, `${fileName || `analysis-${analysis?._id || Date.now()}`}.pdf`);
  return fitAndRender(drawAnalysis, analysis, filePath);
};