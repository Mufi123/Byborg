// Feature('OranumTest');
//
// Scenario('Searching for partial text should display only matching psychics', ({ I }) => {
//         I.amOnPage('/');
//         I.fillField('#search-input', 'Matt');
//         I.seeElement('.result-item:contains("matt")');
//         I.fillField('#search-input', 'Myst');
//         I.seeElement('.result-item:contains("myst")');
//
// });

Feature('Psychic Search and Validation');
const assert = require('chai').assert;
Scenario('Searching for partial text should display only matching psychics.', async ({ I }) => {
        let searchText = ["Matt", "Myst", "Ann", "psy"];

                for(const inputText of searchText){
                        // Navigate to the search page
                        await I.amOnPage('/');
                        // Wait for the search tab is displayed
                        I.waitForElement({name:'searchText'}, 30);

                        // Enter the search text
                        await I.fillField({name:'searchText'}, inputText);

                        // Wait for search results to load
                        await I.click('//button[contains(@class,\'toolbar-search-button\')]');

                        // Assert that all results contain the search text
                        const textContents  = await I.grabTextFromAll('//div[(@class=\'thumb-data-item--name\')]');
                        const filteredTextContents = textContents.filter(content => content.toLowerCase().includes(inputText.toLowerCase()));
                        assert.isNotEmpty(filteredTextContents, `No elements contain the text "${inputText}"`);
                        console.log(inputText  +"  : is contains"+filteredTextContents +"\n")
                        //count for the related text
                        console.log(`Number of filtered elements: ${filteredTextContents.length} \n\n\n`);
        }


});

Scenario.only('Full text search shows a specific psychic profile', async ({ I }) => {
        let searchText = ["MattWarren", "MysticMilena", "EternalFlame"];

        for(const inputText of searchText){
                // Navigate to the search page
                await I.amOnPage('/');
                // Wait for the search tab is displayed
                I.waitForElement({name:'searchText'}, 30);

                // Enter the search text
                await I.fillField({name:'searchText'}, inputText);

                // Wait for search results to load
                await I.click('//button[contains(@class,\'toolbar-search-button\')]');

                // Assert that all results contain the search text
                const textContents  = await I.grabTextFromAll('//div[(@class=\'thumb-data-item--name\')]');
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
        I.amOnPage('https://oranum.com/en/chat/LovePsychyicAnie');

        // Trigger the "Get Credits" overlay
        I.click('Get Credits');
        I.waitForElement('.signupOverlay');

        // Trigger the "Add to Favorites" overlay
        I.click('Add to Favorites');
        I.waitForElement('.signupOverlay');

        // Trigger the "Surprise" overlays
        const surpriseButtons = await I.grabNumberOfVisibleElements('.surpriseButton');
        for (let i = 0; i < surpriseButtons; i++) {
                I.click('.surpriseButton');
                I.waitForElement('.signupOverlay');
        }

        // Trigger the "Start Session" overlay
        I.click('Start Session');
        I.waitForElement('.signupOverlay');

        // Trigger the "Get Coins" overlay
        I.click('Get Coins');
        I.waitForElement('.signupOverlay');
});
