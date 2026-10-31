const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function testViewport(browser, width, height, filename) {
  const page = await browser.newPage();
  await page.setViewport({ width, height, deviceScaleFactor: 1 });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle2' });

  // Wait 1.5 seconds for preloader to complete
  await new Promise((r) => setTimeout(r, 1600));

  const info = await page.evaluate(() => {
    const root = document.getElementById('root');
    const main = document.querySelector('main');
    const hero = document.querySelector('section');
    const heroStage = hero ? hero.querySelector('.absolute.inset-0 > div') : null;

    const getBox = (el) => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      const s = window.getComputedStyle(el);
      return {
        width: r.width,
        height: r.height,
        left: r.left,
        top: r.top,
        maxWidth: s.maxWidth,
        minWidth: s.minWidth,
        transform: s.transform,
        overflow: s.overflow,
      };
    };

    return {
      window: { width: window.innerWidth, height: window.innerHeight },
      body: getBox(document.body),
      main: getBox(main),
      hero: getBox(hero),
      heroStage: getBox(heroStage),
    };
  });

  console.log(`\n=== Viewport ${width}x${height} ===`);
  console.log(JSON.stringify(info, null, 2));

  const outPath = path.join(__dirname, filename);
  await page.screenshot({ path: outPath });
  console.log(`Saved screenshot: ${outPath} (${fs.statSync(outPath).size} bytes)`);

  await page.close();
}

async function main() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    await testViewport(browser, 390, 844, 'screenshot_390.png');
    await testViewport(browser, 768, 1024, 'screenshot_768.png');
    await testViewport(browser, 1440, 900, 'screenshot_1440.png');
  } catch (err) {
    console.error('Error during capture:', err);
  } finally {
    await browser.close();
  }
}

main();

