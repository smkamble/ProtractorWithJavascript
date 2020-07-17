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
    async loaded(url) {
        return browser.wait(async () => {
            return await this.pageLoaded();
        }, testData.timeout.xl, 'timeout: waiting for page to load. The url is: ' + url);
    }

    /**
     * launch a page via it's `url`
     * and verify/wait via loaded()
     */
    async OpenBrowser(url) {
        await browser.waitForAngularEnabled(false);
        await browser.get(url);
        await browser.manage().window().maximize();
        return await this.loaded(url);
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

    and(arrayOfFunctions) {
        return protractor.ExpectedConditions.and(arrayOfFunctions);
    }

    titleIs(title) {
        return protractor.ExpectedConditions.titleIs(title);
    }

    /**
    * Next month name
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
    async dateSelect(datePicker, date) {
        await browser.wait(this.isPresent(datePicker), testData.timeout.xl);
        var month = this.monthName(date);
        await datePicker.filter(async function (elem) {
            return await elem.getAttribute("title").then(async function (text) {
                return await text.includes(month + " " + date);
            });
        }).first().click();
    }
}