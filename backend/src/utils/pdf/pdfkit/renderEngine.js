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

export const countPages = (renderFn, margin) => new Promise((resolve, reject) => {
  let settled = false;

  const finish = (fn, value) => {
    if (settled) return;
    settled = true;
    fn(value);
  };

  try {
    const doc = new PDFDocument({
      size: "A4",
      margin,
      bufferPages: true,
      autoFirstPage: true
    });

    let pages = 1;

    doc.on("pageAdded", () => {
      pages += 1;
    });

    doc.on("error", err => finish(reject, err));

    const output = new NullWritable();
    output.on("error", err => finish(reject, err));

    doc.pipe(output);

    renderFn(doc);
    doc.end();

    doc.on("end", () => finish(resolve, pages));
  } catch (err) {
    finish(reject, err);
  }
});

export const writeToFile = (renderFn, filePath, margin) => new Promise((resolve, reject) => {
  let settled = false;

  const finish = (fn, value) => {
    if (settled) return;
    settled = true;
    fn(value);
  };

  try {
    const doc = new PDFDocument({
      size: "A4",
      margin,
      bufferPages: true,
      autoFirstPage: true
    });

    const stream = fs.createWriteStream(filePath);

    doc.on("error", err => finish(reject, err));
    stream.on("error", err => finish(reject, err));
    stream.on("finish", () => finish(resolve, filePath));

    doc.pipe(stream);

    renderFn(doc);
    doc.end();
  } catch (err) {
    finish(reject, err);
  }
});