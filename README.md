# Monkey Miso
This repository contains the code for a random tester developed using [Cypress](https://www.cypress.io/). 

## How to run
In order to use the tester, you will have to follow these steps:
- Get the source code from this repository: Click on Download as Zip and unzip the folder in your machine or clone the repo
- Install the required modules: Using [Node Package Manager](https://www.npmjs.com/), run `npm install` on the root folder; this will install the cypress CLI module.
- Configure the desired parameters: The repository's root folder contains the JSON files which have the configuration parameters for testing. Open it and edit the parameters as needed. You can change the baseURL, the seed for the test, the percentage of events, the delay between events, and the number of events.
- Run the desired tester: The commands for running the tests must be executed from the root folder, so do not forget to change de directory again with the `cd` command. For the random tester, run `cypress run --config-file ./monkey-miso.config.js`.

\* Note: The default browser is Electron 188 in headless mode. In order to test another browser, add the `--browser <browser-name-or-path>` option to the run command, indicating which of the [supported browsers](https://docs.cypress.io/guides/guides/launching-browsers.html#Browsers) you want to use

## Events
This tester run 4 random events that are:
- **Random Click Link Event**
- **Random Click Buttom Event**
- **Random Click Dropdown Event:**
For this event, the tester picks svg tags due page http://losestudiantes.com have their dropdown lists as svg icons. This also allow add another random event that is Random Click SVG event
- **Ramdom Fill Text Event**

## Results
When the test finishes running, an HTML report and a video of the execution in a browser will be generated in the results folder.

## Special Mention
This monkey is based on monkey-cypress repo https://github.com/TheSoftwareDesignLab/monkey-cypress