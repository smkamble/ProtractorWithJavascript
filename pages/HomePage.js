"use strict";

// page is non-angular
browser.ignoreSynchronization = true;

//import the class
import BasePage from './basePage';
import { element } from 'protractor';

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
        this.datePickerDate = $$(".datepicker-group table td>a");
        this.adultsHotelDropDown = $("#selectHotelNumberAdults");
        this.childrenHotelDropDown = $("#selectHotelNumberChildren");
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
        this.hotelButton.click();
    }

    /**
    * set destination city and select matched city
    */
    async setDestination(city) {
        await browser.wait(this.isPresent(this.destinationHotelTextBox), 8000);
        await this.destinationHotelTextBox.sendKeys(city);
        await this.filterAndClick(this.hotelAutoSuggetDestination, city);
    }

    /**
    * select check in and check out date
    * @requires check in date and check out date
    */  
    async selectFromDate(checkInDate, checkOutDate) {
        await this.checkInDateHotelTextBox.click();
        await this.dateSelect(this.datePickerDate, checkInDate);
        await this.dateSelect(this.datePickerDate, checkOutDate);
    }
}
export default new HomePage();