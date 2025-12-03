import { test, expect } from '../../fixtures/auth.fixture';
import { config } from "../../config";
import testData from "../../test-data/login.json" assert { type: "json" };

test.describe('Authentication', () => {
    test.beforeEach(async ( { page, baseURL, context }) => {
        // Ensure clean state
        await context.clearCookies();
        await page.goto(`${baseURL}`);
        // Verify we're on login page
        await expect(page).toHaveURL(/.*saucedemo/);
    })

    test("Should login successfully with valid credentials", async ({ loginPage }) => {
        // Act
        await loginPage.login(config.standardUsername, config.standardPassword);
        // Assert 
        await expect(loginPage.isProductPageDisplayed()).toBeVisible();
        await expect(loginPage.page).toHaveURL(/.*inventory/);
    });

    for (const invalidUser of testData.invalidUsers) {
        test(`Should fail login with invalid credentials -> ${invalidUser.username || "empty username"}`, 
        async ({ loginPage }) => {
            // Act
            await loginPage.login(invalidUser.username, invalidUser.password);
            // Assert 
            await expect(loginPage.errorMessage()).toBeVisible();
            await expect(loginPage.page).toHaveURL(/.*saucedemo/);
        });
    }

    test("Should fail login with empty fields", async ({ loginPage }) => {
        // Act
        await loginPage.login("", "");
        // Assert 
        await expect(loginPage.errorMessage()).toBeVisible();
        await expect(loginPage.page).toHaveURL(/.*saucedemo/);
    });

    test("Should fail login for locked out users", async ({ loginPage }) => {
        // Act
        await loginPage.login(testData.lockedOutUser.username, testData.lockedOutUser.password);
        // Assert 
        await expect(loginPage.errorMessage()).toBeVisible();
        await expect(loginPage.page).toHaveURL(/.*saucedemo/);
    });
});