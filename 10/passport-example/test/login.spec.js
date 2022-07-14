// NODE_ENV=test mocha --timeout 60000 test/login.spec.js

const app = require('../app');
const puppeteer = require('puppeteer');
const connection = require('../libs/connection');
const assert = require('assert');
const config = require('../config');

// puppeteer options
const opts = {
  headless: false,
  slowMo: 50,
  timeout: 60000,
  args: [
    '--disable-notifications',
  ],
};

describe('passport-vkontakte tests', () => {
  let server;
  let browser;
  let page;

  before((done) => {
    server = app.listen(3000, () => {
      puppeteer
          .launch(opts)
          .then((_browser) => {
            browser = _browser;
            done();
          });
    });
  });

  after((done) => {
    browser.close();
    connection.close();
    server.close(done);
  });

  it('should login user using vkontakte', async () => {
    page = await browser.newPage();
    await page.goto('http://localhost:3000', {waitUntil: 'networkidle0'});
    
    const heading = await page.evaluate(() => document.querySelector('form > p').textContent);

    assert.strictEqual(heading, 'Вход');
    await page.click('.fa-vk');
    
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    await page.type("input[name*='email']", config.providers.vkontakte.test.login);
    await page.type("input[name*='pass']", config.providers.vkontakte.test.password);
    await page.click('#install_allow');
    
    // await page.waitForNavigation({waitUntil: 'networkidle0'});
    await new Promise(resolve => setTimeout(resolve, 3000));

    assert.strictEqual(page.url(), 'http://localhost:3000/');

    const greeting = await page.evaluate(() => document.querySelector('.h4.mb-4').textContent);
    assert.strictEqual(greeting, 'Добро пожаловать, вы успешно вошли на сайт');
  });
});
