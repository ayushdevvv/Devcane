import puppeteer from 'puppeteer';
import { execSync } from 'child_process';

function resolveChromePath() {
  if (!process.env.RENDER) return undefined; // local dev, use puppeteer's default

  try {
    const baseDir = '/opt/render/project/.render/chrome';
    const result = execSync(`find ${baseDir} -type f -name chrome -perm -u+x`)
      .toString()
      .trim();
    const chromePath = result.split('\n')[0];

    if (!chromePath) {
      throw new Error(`No chrome binary found under ${baseDir}`);
    }
    return chromePath;
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