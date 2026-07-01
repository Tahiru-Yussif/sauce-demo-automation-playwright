import { test, expect } from '../../fixtures/auth.fixture';
import testData from "../../test-data/login.json" with { type: "json" };
import { ROUTES } from "../constants/routes";
import * as allure from 'allure-js-commons';

test.describe('Authentication', () => {

    test.beforeEach(async ({ page, context }) => {
        // Shared Allure metadata — runs before every test in this describe
        await allure.epic('Authentication');
        await allure.feature('Login');

        // Setup actions
        await allure.step("Setup: clear session and navigate to login", async () => {
            await context.clearCookies();
            await page.goto('/');
            await expect(page).toHaveURL(ROUTES.LOGIN);
        });
    });

     // Automatic screenshot on any test failure
    test.afterEach(async ({ page }, testInfo) => {
        if (testInfo.status !== testInfo.expectedStatus) {
            await allure.attachment(
                `Failed - ${testInfo.title}`,
                await page.screenshot({ fullPage: true }),
                'image/png'
            );
        }
    });

    test("Should login successfully with valid credentials", 
        { tag: "@smoke" }, 
        async ({ loginPage }) => {

        await allure.story('Valid Login');
        await allure.severity('critical');
        await allure.description('Verify that a user with valid credentials can successfully log in and is redirected to the inventory page.');

        await test.step("Login and navigate to inventory", async () => {
            await loginPage.login(
                testData.validUser.username,
                testData.validUser.password
            );
        });

        await test.step("Verify successful navigation to inventory page", async () => {
            await loginPage.shouldNavigateToInventory();
        });
    });

    test.describe("Invalid Login Scenarios", () => {

        for (const invalidUser of testData.invalidUsers) {
            test(
                `Should reject ${invalidUser.username || "empty"} / ${invalidUser.password || "empty"}`,
                { tag: "@smoke" },
                async ({ loginPage }) => {

                    await allure.story('Invalid Login');
                    await allure.severity('normal');
                    await allure.description(
                        `Verify that login fails for invalid credentials (username: ${invalidUser.username || "empty"}, password: ${invalidUser.password || "empty"}) and an appropriate error message is displayed.`
                    );

                    await test.step("Attempt invalid login", async () => {
                        await loginPage.loginExpectingError(
                            invalidUser.username,
                            invalidUser.password
                        );
                    });

                    await test.step("Verify error and page state", async () => {
                        await loginPage.shouldShowError(invalidUser.error);
                        await loginPage.shouldStayOnLoginPage();
                    });
                }
            );
        }

        test("Should block locked out user",  
            { tag: "@smoke" },
            async ({ loginPage }) => {

            await allure.story('Locked User');
            await allure.severity('critical');
            await allure.description(
                'Verify that a locked-out user cannot log in and receives the correct error message while remaining on the login page.'
            );

            await test.step("Attempt login with locked user", async () => {
                await loginPage.loginExpectingError(
                    testData.lockedOutUser.username,
                    testData.lockedOutUser.password
                );
            });

            await test.step("Verify locked out error", async () => {
                await loginPage.shouldShowError(testData.lockedOutUser.error);
                await loginPage.shouldStayOnLoginPage();
            });
        });
    });
});