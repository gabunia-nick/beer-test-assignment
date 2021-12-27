import puppeteer from 'puppeteer';

describe('Basic e2e test', () => {
  let browser: puppeteer.Browser;
  let page: puppeteer.Page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  it("Loading message is being displayed", async () => {
    await page.goto("http://localhost:3000");
    await page.waitForSelector('.BeerList-LoadingMessage');

    const loadingText = await page.$eval('.BeerList-LoadingMessage', (e) => e.textContent);
    expect(loadingText).toContain('Loading...');
  });

  it("Beer cards are displayed according to the requirement", async () => {
    await page.goto("http://localhost:3000");
    await page.waitForSelector('.BeerCard');

    const cardElems = await page.$$('.BeerCard');
    expect(cardElems.length).toBe(30);
  }, 30000);

  afterAll(() => browser.close());
});
