import { test, expect } from '../../fixtures/auth.fixture';
import testData from "../../test-data/login.json" with { type: "json" };
import { ROUTES } from "../constants/routes";
import * as allure from 'allure-js-commons';

test.describe('Authentication', () => {

    test.describe.configure({ mode: 'parallel' });

    test.beforeEach(async ({ page, context }) => {
        await allure.step("Setup clean session", async () => {
            await context.clearCookies();
            await page.goto('/');
            await expect(page).toHaveURL(ROUTES.LOGIN);
        });
    });

    test("Should login successfully with valid credentials", async ({ testLoginPage }) => {

        allure.feature("Authentication");
        allure.story("Valid Login");
        allure.severity("critical");

        await allure.step("Login with valid credentials", async () => {
            await testLoginPage.login(
                testData.validUser.username,
                testData.validUser.password
            );
        });

        await allure.step("Verify successful navigation to inventory page", async () => {
            await expect(testLoginPage.getInventoryContainer()).toBeVisible();
            await expect(testLoginPage.page).toHaveURL(ROUTES.INVENTORY);
        });
    });

    test.describe("Invalid Login Scenarios", () => {

        for (const invalidUser of testData.invalidUsers) {

            test(
                `Invalid login -> user: ${invalidUser.username || "empty"} | pass: ${invalidUser.password || "empty"}`,
                async ({ testLoginPage }) => {

                    allure.feature("Authentication");
                    allure.story("Invalid Login");
                    allure.severity("normal");

                    await allure.step("Attempt login with invalid credentials", async () => {
                        await testLoginPage.login(
                            invalidUser.username,
                            invalidUser.password
                        );
                    });

                    await allure.step("Verify correct error message is displayed", async () => {
                        await expect(testLoginPage.getErrorMessage())
                            .toContainText(invalidUser.error);
                    });

                    await allure.step("Verify user remains on login page", async () => {
                        await expect(testLoginPage.page).toHaveURL(ROUTES.LOGIN);
                        await expect(testLoginPage.getInventoryContainer()).not.toBeVisible();
                    });
                }
            );
        }

        test("Should fail login for locked out user", async ({ testLoginPage }) => {

            allure.feature("Authentication");
            allure.story("Locked User Login");
            allure.severity("critical");

            await allure.step("Attempt login with locked out user", async () => {
                await testLoginPage.login(
                    testData.lockedOutUser.username,
                    testData.lockedOutUser.password
                );
            });

            await allure.step("Verify locked out error message", async () => {
                await expect(testLoginPage.getErrorMessage())
                    .toContainText(testData.lockedOutUser.error);
            });

            await allure.step("Verify user remains on login page", async () => {
                await expect(testLoginPage.page).toHaveURL(ROUTES.LOGIN);
            });
        });
    });
});