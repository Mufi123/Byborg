const searchTexts = require('./locators/searchTexts.js');
const buttonSelectors = require('./locators/buttonSelectors.js');
const pageObjects = require('./locators/objects')

Feature('Psychic Search and Validation');

const assert = require('chai').assert;
Scenario('Searching for partial text should display only matching psychics.', async ({ I }) => {
        let searchText = searchTexts.partialSearchTexts;

                for(const inputText of searchText){
                        // Navigate to the search page
                        await I.amOnPage('/');
                        // Wait for the search tab is displayed
                        await I.waitForElement(pageObjects.searchText, 30);

                        // Enter the search text
                        await I.fillField(pageObjects.searchText, inputText);

                        // click the search button
                        await I.click(pageObjects.clickSearch);

                        // Assert that all results contain the search text
                        const textContents  = await I.grabTextFromAll(pageObjects.getText);
                        const filteredTextContents = textContents.filter(content => content.toLowerCase().includes(inputText.toLowerCase()));
                        assert.isNotEmpty(filteredTextContents, `No elements contain the text "${inputText}"`);
                        console.log(inputText  +"  : is contains"+filteredTextContents +"\n")
                        //count for the related text
                        console.log(`Number of filtered elements: ${filteredTextContents.length} \n\n\n`);
        }


});

Scenario('Full text search shows a specific psychic profile', async ({ I }) => {
        let searchText = searchTexts.fullSearchTexts;

        for(const inputText of searchText){
                // Navigate to the search page
                await I.amOnPage('/');
                // Wait for the search tab is displayed
                I.waitForElement(pageObjects.searchText, 30);

                // Enter the search text
                await I.fillField(pageObjects.searchText, inputText);

                // Wait for search results to load
                await I.click(pageObjects.clickSearch);

                // Assert that all results contain the search text
                const textContents  = await I.grabTextFromAll(pageObjects.getSearchResult);
                const filteredTextContents = textContents.filter(content => content.toLowerCase().includes(inputText.toLowerCase()));
                assert.isNotEmpty(filteredTextContents, `No elements contain the text "${inputText}"`);
                assert.lengthOf(filteredTextContents, 1, `Expected exactly one element containing the partial text "${inputText}"`);
                console.log(inputText  +"  : is contains"+filteredTextContents +"\n")
                //count for the related text
                console.log(`Number of filtered elements: ${filteredTextContents.length} \n\n\n`);
        }

});

Scenario('Validate "Sign up" overlay on live stream page', async ({ I }) => {
        // Navigate to the live stream page
        I.amOnPage(searchTexts.liveUrl);

        // Validate Add to favorites button
        I.click(buttonSelectors.surpriseButton);
        I.waitForElement(pageObjects.checkPopup);

        // Validate Get Coins button
        I.click(pageObjects.buyCreditIcon);
        I.waitForElement(pageObjects.checkPopup);

        // Trigger the "Get Credits" overlay
        I.click(pageObjects.getCredits);
        I.seeElement(pageObjects.checkPopup);

        // Validate Surprise buttons (if applicable)
        const surpriseButtons = await I.grabNumberOfVisibleElements('[data-test-id^="surprise-button-"]');
        for (let i = 1; i <= surpriseButtons; i++) {
                I.click(`[data-test-id="surprise-button-${i}"]`);
                I.seeElement('[data-test-id="sign-up-overlay"]');
        }


});
