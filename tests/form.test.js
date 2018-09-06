const puppeteer = require('puppeteer');
jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000;

test('Opening Site', async () => {
  const browser = await puppeteer.launch({
    headless: false
  });

  const page = await browser.newPage();

  await page.goto('localhost:8080')

  const text = await page.$eval('form label', el => el.innerHTML);
  expect(text).toEqual('First Name');
  await browser.close();
});

test('Cant send form if inputs are empty', async () => {
  const browser = await puppeteer.launch({
    headless: false
  });

  const page = await browser.newPage();
  await page.goto('localhost:8080')
  await page.click('.btn');

  page.on('dialog', async dialog => {
    const text = await dialog.message();
    expect(text).toEqual('Invalid email form');
  })
  await browser.close();
});
