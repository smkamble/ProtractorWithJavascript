### Protrctor with Javascript Framework

<p align="center">
   <i><strong>This project demonstrates the protractor-jasmine-javascript framework.
</strong></i>
<p>
<p align="center">
  <a href="https://www.protractortest.org">Documentation</a> |
  <a href="https://www.protractortest.org/#/api">Protractor API Docs</a> |
</p>

### Introduction 
This is Test Automation framework designed using Protractor, Jasmine and Javascript for end-to-end testing and to be used by QA Engineer.

### Framework Structure
```
├───.vscode                         # This folder contains Workspace setting and debug configuration setting
│   ├───launch.json                 # This contains Protractor debug setting
│   └───settings.json               # This contains VSCode setting
├───node_modules                    # This contains downloaded libraries
├───pages                           # This folder contains page file
│   ├───basePage.js                 # This contains common code used in page file
│   └───pagefile                    # This contains methods, locators etc.
├───specs                           # This folder contains spec/test file
├───support                         # This folder contains data file properties.json used in test
└───package.json                    # This contains dependencies, script section, other information
```
### Tools and Technologies
Protractor (7.0.0)
NodeJS installed and setup(To download protractor and its dependencies)
```
```
### Prerequisite:
* Download and install Chrome browser.
* Download and install Node.js:
  * [Install Node.JS](https://qaloop.tk/blog/install-node-js/ "Install Node.JS")
* Download and install any Text Editor like Visual Code
  * [Install Visual Studio Code](https://qaloop.tk/blog/install-visual-studio-code/ "Install Visual Studio Code")
```
```
### Setup Scripts 
* Clone the repository into a folder 
* Install Protractor using command: `npm install -g protractor`
* Go to Project root directory and install Dependency using command: `npm install`
* All the dependencies from package.json and ambient typings would be installed in node_modules folder.
* Update necessary binaries of webdriver-manager: `npm run update` or `webdriver-manager update`
* Check downloaded dependencies at `ProtractorWithJavascript\node_modules\protractor\node_modules\webdriver-manager\selenium`
* If not present then copy and paste it from `AppData\Roaming\npm\node_modules\protractor\node_modules\webdriver-manager\selenium`

```
```
### How to Run Test
* Go to Project root directory and Run complete Test Suite: `npm run test`