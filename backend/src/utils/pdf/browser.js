import puppeteer from 'puppeteer';
import { execSync } from 'child_process';
import path from 'path';

function resolveChromePath() {
  if (!process.env.RENDER) return undefined;

  try {
    const baseDir = '/opt/render/project/.render/chrome';
    const versionFolder = execSync(`ls ${baseDir}`).toString().trim().split('\n')[0];
    return path.join(baseDir, versionFolder, 'chrome-linux64/chrome');
  } catch (err) {
    console.error('⚠️ Could not resolve Chrome path, falling back to default:', err.message);
    return undefined;
  }
}

const CHROME_PATH = resolveChromePath();

let browserInstance = null;

export async function getBrowser() {
  if (browserInstance && browserInstance.isConnected()) {
    return browserInstance;
  }
  browserInstance = await puppeteer.launch({
    executablePath: CHROME_PATH,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  return browserInstance;
}

export const closeBrowser = async () => {
  if (!browserInstance) return;
  await browserInstance.close();
  browserInstance = null;
};