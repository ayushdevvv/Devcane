import fs from "fs";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import Tesseract from "tesseract.js";

export const extractPdfText = async (filePath) => {

    try {

        const data = new Uint8Array(fs.readFileSync(filePath));

        const pdf = await pdfjsLib.getDocument({ data }).promise;

        console.log("Pages:", pdf.numPages);

        let text = "";

        for (let i = 1; i <= pdf.numPages; i++) {

            const page = await pdf.getPage(i);

            const content = await page.getTextContent();

            const pageText = content.items.map(item => item.str).join(" ");

            console.log(`Page ${i} Text:`, pageText);

            text += pageText + "\n";

        }

        console.log("Final Length:", text.length);

        return text.trim();

    } catch (err) {

        console.log(err);

        throw new Error("Unable to parse PDF.");

    }

};

export const extractImageText = async (filePath) => {

    try {

        const { data: { text } } = await Tesseract.recognize(filePath, "eng");

        return text.trim();

    } catch {

        throw new Error("Unable to parse image.");

    }

};

export const extractResumeText = async (filePath, fileType) => {

    if (fileType === "pdf") return extractPdfText(filePath);

    if (fileType === "image") return extractImageText(filePath);

    throw new Error("Unsupported file type.");

};