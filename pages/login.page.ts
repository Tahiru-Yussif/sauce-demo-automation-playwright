import { Locator, Page, expect } from '@playwright/test';
import { ROUTES } from '../tests/constants/routes';
import { TIMEOUTS } from '../tests/constants/timeout';

export default class LoginPage {
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly inventoryContainer: Locator;
    readonly errorMessage: Locator;

    constructor(public readonly page: Page) {
        this.usernameInput = page.getByTestId("username");
        this.passwordInput = page.getByTestId("password");
        this.loginButton = page.getByTestId("login-button");
        this.inventoryContainer = page.getByTestId("inventory-container");
        this.errorMessage = page.getByTestId('error');
    }

    // ========== Actions ==========
    async login(username: string, password: string): Promise<void> {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLoginBtn();
        await this.inventoryContainer.waitFor({ timeout: TIMEOUTS.MEDIUM});
    }

    async loginExpectingError(username: string, password: string): Promise<void> {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLoginBtn();
        await this.errorMessage.waitFor({ timeout: TIMEOUTS.MEDIUM});
    }

    // ========== Private Helpers ==========
    private async enterUsername(username: string): Promise<void> {
        await this.usernameInput.fill(username);
    }

    private async enterPassword(password: string): Promise<void> {
        await this.passwordInput.fill(password);
    }

    private async clickLoginBtn(): Promise<void> {
        await this.loginButton.click();
    }

    // ========== Assertions (Playwright style) ==========
    async shouldShowError(expectedError: string): Promise<void> {
        await expect(this.errorMessage).toBeVisible();
        await expect(this.errorMessage).toContainText(expectedError);
    }

    async shouldStayOnLoginPage(): Promise<void> {
        await expect.soft(this.page).toHaveURL(ROUTES.LOGIN);
        await expect.soft(this.inventoryContainer).not.toBeVisible();
    }

    async shouldNavigateToInventory(): Promise<void> {
        await expect(this.inventoryContainer).toBeVisible();
        await expect(this.page).toHaveURL(ROUTES.INVENTORY);
    }
}