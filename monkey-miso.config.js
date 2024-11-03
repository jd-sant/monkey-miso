var exec_date = Date.now()
module.exports = {
    env:{
          appName:"Monkey Miso",
          events:20,
          delay:300,
          seed:6735,
          pct_clicks:25,
          pct_keys:25,
          pct_combo:25,
          pct_buttons:25,
      },
    e2e: {
      // We've imported your old cypress plugins here.
      baseUrl:"https://losestudiantes.com",
      specPattern: "./cypress/e2e/monkey-miso.cy.js",
      video: true,
      videoCompression: 15,
      videosFolder: './results_' + exec_date + '/videos',
      LOG_FILENAME: "./results_" + exec_date + "/monkey-execution.html",
      screenshotOnRunFailure: true, 
      screenshotsFolder: './results_' + exec_date + '/screenshots',
      pageLoadTimeout:20000,
      defaultCommandTimeout:20000,
      // You may want to clean this up later by importing these.
      setupNodeEvents(on, config) {
        return require('./cypress/plugins/index.js')(on, config)
      },
    },
  }