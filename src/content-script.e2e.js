const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const path = require('path');
const CHROME_CRX_PATH = path.join(__dirname, '../tmp/dist/gh-repo-findr.crx');

describe('on github pages', () => {
  let driver;

  before(() => {
    let path = require('chromedriver').path;
    let service = new chrome.ServiceBuilder(path).build();
    chrome.setDefaultService(service);

    let options = new chrome.Options();
    options.addExtensions(CHROME_CRX_PATH);

    driver = new webdriver.Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();
  });

  after(() => {
    driver.close();
  });

  it('should display the search box when triggered by key shortcut', () => {
    driver.get('https://github.com/bengro/gh-repo-findr');
  });
});