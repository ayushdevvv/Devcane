import fs from "fs";
import path from "path";

import { getBrowser } from "./browser.js";

export const generatePDF = async (html, fileName = `file-${Date.now()}`) => {
    const browser = await getBrowser();
    const page = await browser.newPage();

    try {
        await page.setViewport({
            width: 1240,
            height: 1754,
            deviceScaleFactor: 2
        });


        await page.setContent(html, {
            waitUntil: ["domcontentloaded", "networkidle0"]
        });

        await page.emulateMediaType("screen");

        const dir = path.join(process.cwd(), "temp");
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        const pdfPath = path.join(dir, `${fileName}.pdf`);

        await page.pdf({
            path: pdfPath,
            format: "A4",
            printBackground: true,
            preferCSSPageSize: true,
            margin: {
                top: "8mm",
                bottom: "8mm",
                left: "8mm",
                right: "8mm"
            }
        });

        return pdfPath;
    } finally {
        await page.close();
    }
};