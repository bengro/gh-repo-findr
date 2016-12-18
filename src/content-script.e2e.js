const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const CHROME_CRX_PATH = '/Users/pivotal/workspace/gh-repo-findr/tmp/dist/gh-repo-findr.crx';

describe('on github pages', () => {
  let driver;

  before((done) => {
    let options = new chrome.Options();
    options.addExtensions(CHROME_CRX_PATH);

    driver = new webdriver.Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();

    // done()
  });

  after(() => {
    driver.close();
  });

  it('should display the search box when triggered by key shortcut', () => {
    driver.get('https://github.com/bengro/gh-repo-findr');
  });
});