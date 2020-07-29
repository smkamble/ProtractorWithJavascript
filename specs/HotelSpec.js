import basePage from '../pages/basePage';
import homePage from '../pages/homePage';
import hotelResultsPage from '../pages/hotelResultsPage';


const testData = require("../support/properties.json");


describe("Hotel Search Scenario", () => {
    beforeEach(async () => {
        await homePage.OpenBrowser(testData.url);
    });

    it("Verify User able to Search for hotels in 'New York City' for dates a month in the future", async () => {
        await homePage.clickHotel();
        await homePage.setDestination(testData.destinationCity);
        await homePage.selectAdults(testData.adults);
        await homePage.selectCheckInDate(testData.checkInDay, testData.checkOutDay);
        await homePage.clickSearchHotel();

        expect(await hotelResultsPage.hasHotelResultHeading()).toBe(true, "Hotel Result screen not present");
        expect(await hotelResultsPage.getSearchCityDateText()).toContain(testData.destinationCity, testData.destinationCity + "city is not present at critria text");
        expect(await hotelResultsPage.getSearchCityDateText()).toContain(testData.checkInDay, testData.checkInDay + "day is not present at critria text");
        expect(await hotelResultsPage.getSearchCityDateText()).toContain(testData.checkOutDay, testData.checkOutDay + "day is not present at critria text");
        expect(await hotelResultsPage.getSearchDayNightText()).toContain(testData.adults + " Adults", testData.adults + " Adults is not present at critria text");
    });

    it("Verify User able to filter hotel search results based on 'Star Rating'", async () => {
        await homePage.clickHotel();
        await homePage.setDestination(testData.destinationCity);
        await homePage.selectCheckInDate(testData.checkInDay, testData.checkOutDay);
        await homePage.clickSearchHotel();

        await hotelResultsPage.selectStarRating(testData.starRating);

        expect(await hotelResultsPage.resultPaginationCount()).toContain(await hotelResultsPage.getStarRatingCount(testData.starRating) + " Hotels", "Star Count rating is not present at Result pagination with hotel count label");
        expect(await hotelResultsPage.resultPaginationCount()).toContain(await hotelResultsPage.hotelNameTitleLink.count(), "Hotels count is not present at Result pagination with hotel count label");
    });

    it("Verify User able to See available rooms after selecting a hotel from the hotel search results", async () => {
        await homePage.clickHotel();
        await homePage.setDestination(testData.destinationCity);
        await homePage.selectCheckInDate(testData.checkInDay, testData.checkOutDay);
        await homePage.clickSearchHotel();

        await hotelResultsPage.selectStarRating(testData.starRating);
        await hotelResultsPage.clickHotelName();
        await hotelResultsPage.clickBookThisRoom();

        expect(await hotelResultsPage.getHotelAddedText()).toBe(testData.hotelAddedLabel, "Selected Hotel not added or success message mismatch");
    });
});