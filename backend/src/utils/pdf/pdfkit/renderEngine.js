import fs from "fs";
import path from "path";
import { Writable } from "stream";
import PDFDocument from "pdfkit";

class NullWritable extends Writable {
  _write(chunk, encoding, callback) {
    callback();
  }
}

export const ensureTempDir = () => {
  const dir = path.join(process.cwd(), "temp");
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  return dir;
};

// Renders into a throwaway document just to count how many pages it takes.
// PDFKit auto-adds a page whenever content overflows, so counting
// 'pageAdded' events tells us if a given font scale fits on one page.
export const countPages = (renderFn, margin) =>
  new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ size: "A4", margin, bufferPages: true, autoFirstPage: true });
      let pages = 1;
      doc.on("pageAdded", () => { pages += 1; });
      doc.pipe(new NullWritable());
      renderFn(doc);
      doc.end();
      doc.on("end", () => resolve(pages));
      doc.on("error", reject);
    } catch (err) {
      reject(err);
    }
  });

export const writeToFile = (renderFn, filePath, margin) =>
  new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ size: "A4", margin, bufferPages: true });
      const stream = fs.createWriteStream(filePath);
      doc.pipe(stream);
      stream.on("finish", () => resolve(filePath));
      stream.on("error", reject);
      renderFn(doc);
      doc.end();
    } catch (err) {
      reject(err);
    }
  });