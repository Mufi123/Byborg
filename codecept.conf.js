const { setHeadlessWhen, setCommonPlugins } = require('@codeceptjs/configure');
require("ts-node/register");
// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

/** @type {CodeceptJS.MainConfig} */
exports.config = {
  tests: './test/oranumTest.js',
  output: './output',
  helpers: {
    Playwright: {
      url: 'https://www.oranum.com',
      show: true,
      browser: 'chromium'
    }
  },
  include: {
    I: './steps_file.js'
  },
  name: 'Byborg',
  plugins: {
    pauseOnFail:{},
    retryFailedStep:{
      enabled: true
    },
    tryTo: {
      enabled: true
    },
    screenshotOnFail:{
      enabled:true
    },
    allure: {
      enabled: true,
      require: '@codeceptjs/allure-legacy',
    },
  },
}