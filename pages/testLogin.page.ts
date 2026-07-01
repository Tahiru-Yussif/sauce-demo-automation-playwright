import { Locator, Page } from '@playwright/test';

export default class LoginPage {
    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;
    private readonly inventoryContainer: Locator;
    private readonly errorMessage: Locator;

    constructor(public readonly page: Page) {
        this.usernameInput = page.getByTestId("username");
        this.passwordInput = page.getByTestId("password");
        this.loginButton = page.getByTestId("login-button");
        this.inventoryContainer = page.getByTestId("inventory-container");
        this.errorMessage = page.getByTestId('error');
    }

    async login(username: string, password: string): Promise<void> {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLoginBtn();
    }

    private async enterUsername(username: string): Promise<void> {
        await this.usernameInput.fill(username);
    }

    private async enterPassword(password: string): Promise<void> {
        await this.passwordInput.fill(password);
    }

    private async clickLoginBtn(): Promise<void> {
        await this.loginButton.click();
    }

    getInventoryContainer(): Locator {
        return this.inventoryContainer;
    }

    getErrorMessage(): Locator {
        return this.errorMessage;
    }

}