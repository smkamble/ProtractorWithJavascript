"use strict";

//import the class
import BasePage from './basePage';

//import the data file
var testData = require("../support/properties.json");

class HomePage extends BasePage {
    constructor() {
        //Home Page Locator
        super();
        this.vacationDirectHeadingLink = $("div.header-branding>a");
        this.hotelButton = $("#search-hotel-button");
        this.destinationHotelTextBox = $("#inputDestination");
        this.hotelAutoSuggetDestination = element.all(by.css(".autosuggest-item span"));
        this.checkInDateHotelTextBox = $("#inputCheckInDate");
        this.checkOutDateHotelTextBox = $("#inputCheckOutDate");
        this.datePickerDay = $$(".datepicker-group table td>a");
        this.adultsHotelDropDown = element(by.id("selectHotelNumberAdults"));
        this.childrenHotelDropDown = element(by.id("selectHotelNumberChildren"));
        this.searchHotelsButton = $("#hotelSearchButton");

        this.pageLoaded = this.isPresent(this.vacationDirectHeadingLink);
    }

    /**
    * return site title
    * @param  {string} site Title
    * @return {promise}
    */
    getTitle() {
        getTitle.then(function (title) {
            return title;
        });
    }

    /**
    * click on Hotel Button
    */
    clickHotel() {
        return this.hotelButton.click();
    }

    /**
    * set destination city and select matched city
    */
    async setDestination(city) {
        try {
            await browser.wait(this.isPresent(this.destinationHotelTextBox), testData.timeout.xl);
            await this.destinationHotelTextBox.sendKeys(city);
            await this.filterAndClick(this.hotelAutoSuggetDestination, city);
        }
        catch (error) {
            throw new Error("Issue while searching with destination " + city + "\n" + error);
        }
    }

    /**
    * select check in and check out date
    * @requires check in date and check out date
    */
    async selectCheckInDate(checkInDay, checkOutDay) {
        try {
            if (parseInt(checkInDay) > parseInt(checkOutDay)) {
                throw new Error("Check out day should be greater than check in day");
            } else {
                await this.checkInDateHotelTextBox.click();
                await this.dateSelect(this.datePickerDay, checkInDay);
                await this.dateSelect(this.datePickerDay, checkOutDay);
            }
        }
        catch (error) {
            throw new Error("Unable to select date from calender :" + error);
        }
    }

    /**
    * select Adults Number from dropdown
    * @requires number of adults 
    */
    selectAdults(number) {
        return this.selectDropdownValue(this.adultsHotelDropDown, number);
    }

    /**
    * click on Hotel Search Button
    */
    clickSearchHotel() {
        return this.searchHotelsButton.click();
    }

}
export default new HomePage();