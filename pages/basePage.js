"use strict";

import { browser } from "protractor";

//import the data file
var testData = require("../support/properties.json");


export default class BasePage {

    /**
     * wait and verify that a page is loaded
     * @returns {promise}
     * @requires a page to include `pageLoaded` method
     */
    async loaded() {
        return browser.wait(async () => {
            return await this.pageLoaded();
        }, testData.timeout.xl, 'Timeout: waiting for page to load');
    }

    /**
     * launch a page via it's `url`
     * and verify/wait via loaded()
     */
    OpenBrowser(url) {
        browser.ignoreSynchronization = true; // for non-angular websites
        browser.get(url);
        browser.manage().window().maximize();
        return this.loaded();
    }

    /**
     * Wrappers for expected conditions
     * @returns {ExpectedCondition}
     */
    isVisible(locator) {
        return protractor.ExpectedConditions.visibilityOf(locator);
    }

    isNotVisible(locator) {
        return protractor.ExpectedConditions.invisibilityOf(locator);
    }

    isPresent(locator) {
        return protractor.ExpectedConditions.presenceOf(locator);
    }

    isNotPresent(locator) {
        return protractor.ExpectedConditions.stalenessOf(locator);
    }

    isClickable(locator) {
        return protractor.ExpectedConditions.elementToBeClickable(locator);
    }

    hasText(locator, text) {
        return protractor.ExpectedConditions.textToBePresentInElement(locator, text);
    }

    notHasText(locator, text) {
        return protractor.ExpectedConditions.not(protractor.ExpectedConditions.textToBePresentInElement(locator, text));
    }

    and(arrayOfFunctions) {
        return protractor.ExpectedConditions.and(arrayOfFunctions);
    }

    titleIs(title) {
        return protractor.ExpectedConditions.titleIs(title);
    }

    /**
    * Get Next month name
    * @returns month name in short format like Aug
    */
    monthName() {
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return months[new Date().getMonth() + 1];
    }

    /**
    * Find searchValue from list of element and click on it
    * * @requires a list of element locator and value to be search
    */
    async filterAndClick(locator, searchValue) {
        await browser.wait(this.isPresent(locator), testData.timeout.xl);
        await locator.filter(function (elem) {
            return elem.getText().then(function (text) {
                return text.includes(searchValue);
            });
        }).first().click();
    }

    /**
    * Find date from date picker and click on it
    * * @requires a date list locator and date to be select
    */
    async dateSelect(datePicker, day) {
        await browser.wait(this.isPresent(datePicker), testData.timeout.xl);
        var monthName = this.monthName(day);
        await datePicker.filter(async function (elem) {
            return await elem.getAttribute("title").then(async function (text) {
                return await text.includes(monthName + " " + day);
            });
        }).first().click();
    }

    /**
    * Get next month and date in mm/dd/yy format
    * @returns mm/dd/yy format
    */
    formatDate(day) {
        //get the year and pull the last two digits of the year
        var year = new Date().getFullYear().toString().substr(-2);

        //increment month by 1 since it is 0 indexed
        //converts month to a string
        var month = (new Date().getMonth() + 2).toString();

        //if month is 1-9 pad right with a 0 for two digits
        month = month.length > 1 ? month : '0' + month

        //if day is between 1-9 pad right with a 0 for two digits
        day = day.toString().length > 1 ? day : '0' + day;

        //return the string "MM/dd/yy"
        return month + "/" + day + "/" + year;
    }

    /**
    * Select value form normal dropdown having select tagname
    * @requires dropdown loctor and value to be select
    */
    selectDropdownValue(selectLocator, value) {
        selectLocator.element(by.cssContainingText('option', value)).click();
        browser.actions().sendKeys(protractor.Key.TAB).perform();
    }

    /**
    * Get value from locator
    * @return text value locator
    * @requires locator to read value
    */
    async readText(locator) {
        await locator.getText().then((text) => {
            return text;
        })
    }

}