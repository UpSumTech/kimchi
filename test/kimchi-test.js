var assert = require('assert'),
  test = require('selenium-webdriver/testing');
  webdriver = require('selenium-webdriver'),
  SeleniumServer = require('selenium-webdriver/remote').SeleniumServer,
  pathToSeleniumJar = "/Users/suman/lib/selenium-server-2.42.0/selenium-server-standalone-2.42.0.jar";

test.describe("End to end test", function() {
  var server, driver;

  test.before(function() {
    var server = new SeleniumServer(pathToSeleniumJar, { port: "4444" });
    server.start();
    driver = new webdriver.Builder().
      usingServer(server.address()).
      withCapabilities(webdriver.Capabilities.firefox()).
      build();
  });

  test.describe('Google Search', function() {
    it('should work', function() {
      driver.get('http://www.google.com');
      var searchBox = driver.findElement(webdriver.By.name('q'));
      searchBox.sendKeys('webdriver');
      searchBox.getAttribute('value').then(function(value) {
        assert.equal(value, 'webdriver');
      });
    });
  });

  test.after(function() { driver.quit(); });
});
