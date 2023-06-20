# Byborg
# Psychic Search and Validation

This project focuses on performing psychic search and validation using automated tests. It utilizes CodeceptJS as the testing framework and Chai for assertions. The tests cover scenarios such as searching for partial text, searching for full text, and validating the "Sign up" overlay on the live stream page.

## Setup

1. Clone the repository: git clone <repository-url>

2. Install the dependencies: npm install


## Project Configuration

Before running the tests, ensure that the following configuration is set up correctly:

### Project path

Project locators are in different folder below

- Adjust the locator paths in the `searchTexts.js`, `buttonSelectors.js`, and `objects.js` files to match your application's locators.

## Usage

To execute the tests, run the following command:


- npx codeceptjs run --steps  --> for step by step run
- npx codeceptjs run    ---> for normal run 

 - npx codeceptjs run --plugins allure ----> with allure report 

After run
- allure serve output  --> for generating allure report

