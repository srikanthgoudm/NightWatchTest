# NightWatchTest

Test automation framework for End to End UI Test testing using [`NodeJS`](https://nodejs.org/), [`Nightwatch`](http://nightwatchjs.org/), [`Typescript`](http://www.typescriptlang.org/),
[`Selenium`](http://www.seleniumhq.org/) for testing  locally and  [`Sauce Labs`](https://saucelabs.com/).

##Prerequisites
---------------

To proceed you need a Mac, Windows, or Linux machine, and:

1. [`node`](https://nodejs.org/) installed. (4.* LTS release)
2. [`npm`](https://www.npmjs.com/) installed (usually installed along with `node`). After installing nodejs, 
    the version shipped by nodejs for 4.* LTS release is very old and needs to be upgraded to the latest version (3.*).
    To install npm 
    ```
        npm install npm -g
    ```
3. If tests are to be executed on Sauce Labs, Sauce labs Username and API Key for the user

4. Copy of this repository using Git or from a browser
    ```
        git clone https://github.com/rkavalap/NightWatchTest 
        or 
        https://github.com/rkavalap/NightWatchTest/archive/master.zip
    ```
5. From the copy of the source i.e NightWatchTest directory
    ```
        npm install
    ```
    Install's all the dependent packages for this project under node_modules folder.    

##To clean & compile source:
----------------------------

```
    npm run build
```

##To Execute Test:
------------------

To execute individual test suite (single file of test cases) use the "-t" argument and path of the test case under build output folder and "--env" argument.

```
    node node_modules/nightwatch/bin/runner.js -t buildOutput/javascript1.js --env devtest-chrome-win8
```

To execute multiple test cases you can use --tag argument to nightwatch. Each test suite needs to have tag attribute defined.

##Configs
---------

There are two kinds of environment/configs in this project:

1. The default config is defined in `defaults.json5`, which all other configs inherit from.
2. Dynamically configurations are generated by combining each of the top-level objects in `capabilities.json5` and `deployments.json5`.

###Config Merging
----------------

When `nightwatch` starts, it's passed configuration that is gathered or generated by `nightwatch.conf.js`. The generation does these things:

1. Loads `defaults.json5`, which contains the base configuration.
2. Generates what `nightwatch` refers to as an "environment" (a configuration object within `test_settings`), for each combination of objects in `capabilities.json5` and `deployments.json5`. The generated environments are like `devtest-chrome-win8`.
    - deployments are things like `devtest` or `CI`. Configs here are available to all generated environments with the same deployment (i.e. `devtest-chrome-win8` but not `ci-chrome-win8`).
    - capabilities are selenium settings (i.e. the `-chrome-win8` part). Configs here are available to all generated environments with the same capability (i.e. `devtest-chrome-win8` and `ci-chrome-win8`, but not `devtest-ie10-win7`).
3. Loads any settings in `configs/`, and applies them also as environments under `test_settings`.


##Project source Layout:
------------------------

* `tests`   - Contains all the UI test scripts.
* `globalsmodule.js` - Nightwatch globals module file
* `gulpfile.js` - Build file (compilation from ts to js using Gulp)
* `nightwatch.conf.js` - config file for nightwatch
* `package.json` - dependent nodejs packages used for this project installed under node_modules directory
* `typings` - Created on execution of build. Provides intellisense support for Nightwatch framework.

##Intellisense 
------------------------

![VS Code](https://cloud.githubusercontent.com/assets/80310/17427868/e05a09fe-5a98-11e6-8c77-882095244bf5.png)

Experience should be similar to Visual studio and other IDE's supporting Typescript Intellisense.

##References
------------

* [`Nightwatch Guide`](http://nightwatchjs.org/guide)
* [`Nightwatch Wiki`](https://github.com/beatfactor/nightwatch/wiki)
* [`Page Object`](http://martinfowler.com/bliki/PageObject.html) article by Martin Fowler
* [`Selenium PageObjects wiki`](https://code.google.com/p/selenium/wiki/PageObjects)
* [`Selenium DesiredCapabilities`](https://code.google.com/p/selenium/wiki/DesiredCapabilities)


