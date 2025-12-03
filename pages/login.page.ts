import { Locator, Page } from '@playwright/test';

export default class LoginPage {
    private readonly personUsername: Locator;
    private readonly personPassword: Locator;
    private readonly loginButton: Locator;
    private readonly productDetailsPage: Locator;
    private readonly LoginErrorMessage: Locator;

    constructor(public readonly page: Page) {
        this.personUsername = page.getByTestId("username");
        this.personPassword = page.getByTestId("password");
        this.loginButton = page.getByTestId("login-button");
        this.productDetailsPage = page.getByTestId("inventory-container")
        this.LoginErrorMessage = this.page.getByTestId('error');
    }

    async login(username: string, password: string): Promise<void> {
        await this.username(username);
        await this.password(password);
        await this.clickLoginBtn();
    }

    async username(username: string): Promise<void> {
        await this.personUsername.fill(username);
    }

    async password(password: string): Promise<void> {
        await this.personPassword.fill(password);
    }

    async clickLoginBtn(): Promise<void> {
        await this.loginButton.click();
    }

    isProductPageDisplayed() {
        return this.productDetailsPage;
    }

    errorMessage() {
        return this.LoginErrorMessage;
    }

}