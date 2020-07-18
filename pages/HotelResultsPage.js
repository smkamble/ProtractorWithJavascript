"use strict";

//import the class
import BasePage from './basePage';
import { element, ElementFinder, browser } from 'protractor';
const testData = require("../support/properties.json");

class HotelResultsPage extends BasePage {

    constructor() {
        //Home Page Locator
        super();
        this.hotelResultHeading = $("h1.view-title");
        this.searchCityDateText = $("#WayfinderWrapper>.wayfinder-info");
        this.searchDayNightText = $("#WayfinderWrapper div:nth-child(2) span");
        this.starRatingCheckBox = $$(".js-hotelrating-filter label.star-filter-label");
        this.ratingCountText = $$(".rating-count");
        this.resultPaginationCountText = $(".hotel-results-pagination-count-header");
        this.hotelNameTitleLink = $$(".hotel-name-title");
        this.bookThisRoomButton = $$("button[class$='Button_BookRoom']");
        this.hotelAddedLabel = $(".header-content h1");

        this.pageLoaded = this.isPresent(this.hotelResultHeading);
    }

    async hasHotelResultHeading() {
        await browser.wait(this.isPresent(this.hotelResultHeading), testData.timeout.xl);
        return await this.hotelResultHeading.isPresent();
    }

    async getSearchCityDateText() {
        await browser.wait(this.isPresent(this.searchCityDateText), testData.timeout.xl);
        return await this.searchCityDateText.getText();
    }

    async getSearchDayNightText() {
        await browser.wait(this.isPresent(this.searchCityDateText), testData.timeout.l);
        return await this.searchDayNightText.getText();
    }

    async selectStarRating(rating) {
        try {
            await browser.wait(this.isPresent(this.starRatingCheckBox), testData.timeout.xl);
            await this.starRatingCheckBox.filter(function (elem) {
                return elem.getAttribute("for").then(function (text) {
                    return text.includes(rating);
                });
            }).first().click();
            await browser.sleep(testData.timeout.l)
        }
        catch (error) {
            throw new Error("Enter correct rating :" + rating + ", accepted rating 5, 4, 3, 2 only");
        }
    }

    async getStarRatingCount(rating) {
        let starRatingCountElement = element(by.xpath("//input[@id='StarRatingFilter" + rating + "']/following-sibling::label//span[@class='rating-count']"));
        await browser.wait(this.isPresent(starRatingCountElement), testData.timeout.xl);
        let count = await starRatingCountElement.getText();
        count = count.substring(1, 6).replace(")", "");
        return count

    }

    async resultPaginationCount() {
        await browser.wait(this.isPresent(this.resultPaginationCountText), testData.timeout.xl);
        return await this.resultPaginationCountText.getText();
    }

    async clickHotelName() {
        await browser.wait(this.isPresent(this.hotelNameTitleLink), testData.timeout.xl);
        return await this.hotelNameTitleLink.first().click();
    }

    async clickBookThisRoom() {
        await browser.wait(this.isPresent(this.bookThisRoomButton), testData.timeout.xl);
        if (this.bookThisRoomButton.count == 0) {
            throw new Error("Selected hotel room is not available to book still displaying to book room");
        }
        else
            return await this.bookThisRoomButton.first().click();
    }

    async getHotelAddedText() {
        await browser.wait(this.isPresent(this.hotelAddedLabel), testData.timeout.xl);
        return await this.hotelAddedLabel.getText();
    }
}
export default new HotelResultsPage();