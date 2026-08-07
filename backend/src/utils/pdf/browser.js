import puppeteer from "puppeteer";

let browserInstance = null;

export const getBrowser = async () => {
    if (browserInstance) return browserInstance;

    browserInstance = await puppeteer.launch({
        headless: "new",
        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--font-render-hinting=medium"
        ]
    });

    return browserInstance;
};

export const closeBrowser = async () => {
    if (!browserInstance) return;

    await browserInstance.close();
    browserInstance = null;
};