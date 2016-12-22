const chai = require('chai');
var assert = chai.assert;

const webdriver = require('selenium-webdriver');
const By = webdriver.By;
const Input = require('selenium-webdriver/lib/input');
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

    return driver;
  });

  after(() => {
    driver.close();
  });

  it('should display the search box when triggered by key shortcut', (done) => {
    driver.get('https://github.com/bengro/gh-repo-findr');
    Input.Key.chord(Input.Key.SHIFT, Input.Key.ENTER);

    let searchBox = driver.findElement(By.id('gh-repo-findr-box'));
    searchBox.isDisplayed().then((isDisplayed) => {
      assert.equal(isDisplayed, true);
      done();
    });
  });
});