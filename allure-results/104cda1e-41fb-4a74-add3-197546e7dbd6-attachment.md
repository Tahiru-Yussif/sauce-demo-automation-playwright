# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: login\login.spec.ts >> Authentication >> Invalid Login Scenarios >> Should reject standard_user / empty
- Location: tests\login\login.spec.ts:55:13

# Error details

```
TimeoutError: locator.waitFor: Timeout 10000ms exceeded.
Call log:
  - waiting for getByTestId('serror') to be visible

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]: Swag Labs
  - generic [ref=e5]:
    - generic [ref=e9]:
      - generic [ref=e10]:
        - textbox "Username" [ref=e11]: standard_user
        - img [ref=e12]
      - generic [ref=e14]:
        - textbox "Password" [ref=e15]
        - img [ref=e16]
      - 'heading "Epic sadface: Password is required" [level=3] [ref=e19]':
        - button [ref=e20] [cursor=pointer]:
          - img [ref=e21]
        - text: "Epic sadface: Password is required"
      - button "Login" [active] [ref=e23] [cursor=pointer]
    - generic [ref=e25]:
      - generic [ref=e26]:
        - heading "Accepted usernames are:" [level=4] [ref=e27]
        - text: standard_user
        - text: locked_out_user
        - text: problem_user
        - text: performance_glitch_user
        - text: error_user
        - text: visual_user
      - generic [ref=e28]:
        - heading "Password for all users:" [level=4] [ref=e29]
        - text: secret_sauce
```

# Test source

```ts
  1  | import { Locator, Page, expect } from '@playwright/test';
  2  | import { ROUTES } from '../tests/constants/routes';
  3  | import { TIMEOUTS } from '../tests/constants/timeout';
  4  | 
  5  | export default class LoginPage {
  6  |     readonly usernameInput: Locator;
  7  |     readonly passwordInput: Locator;
  8  |     readonly loginButton: Locator;
  9  |     readonly inventoryContainer: Locator;
  10 |     readonly errorMessage: Locator;
  11 | 
  12 |     constructor(public readonly page: Page) {
  13 |         this.usernameInput = page.getByTestId("username");
  14 |         this.passwordInput = page.getByTestId("password");
  15 |         this.loginButton = page.getByTestId("login-button");
  16 |         this.inventoryContainer = page.getByTestId("inventory-container");
  17 |         this.errorMessage = page.getByTestId('serror');
  18 |     }
  19 | 
  20 |     // ========== Actions ==========
  21 |     async login(username: string, password: string): Promise<void> {
  22 |         await this.enterUsername(username);
  23 |         await this.enterPassword(password);
  24 |         await this.clickLoginBtn();
  25 |         await this.inventoryContainer.waitFor({ timeout: TIMEOUTS.MEDIUM});
  26 |     }
  27 | 
  28 |     async loginExpectingError(username: string, password: string): Promise<void> {
  29 |         await this.enterUsername(username);
  30 |         await this.enterPassword(password);
  31 |         await this.clickLoginBtn();
> 32 |         await this.errorMessage.waitFor({ timeout: TIMEOUTS.MEDIUM});
     |                                 ^ TimeoutError: locator.waitFor: Timeout 10000ms exceeded.
  33 |     }
  34 | 
  35 |     // ========== Private Helpers ==========
  36 |     private async enterUsername(username: string): Promise<void> {
  37 |         await this.usernameInput.fill(username);
  38 |     }
  39 | 
  40 |     private async enterPassword(password: string): Promise<void> {
  41 |         await this.passwordInput.fill(password);
  42 |     }
  43 | 
  44 |     private async clickLoginBtn(): Promise<void> {
  45 |         await this.loginButton.click();
  46 |     }
  47 | 
  48 |     // ========== Assertions (Playwright style) ==========
  49 |     async shouldShowError(expectedError: string): Promise<void> {
  50 |         await expect(this.errorMessage).toBeVisible();
  51 |         await expect(this.errorMessage).toContainText(expectedError);
  52 |     }
  53 | 
  54 |     async shouldStayOnLoginPage(): Promise<void> {
  55 |         await expect.soft(this.page).toHaveURL(ROUTES.LOGIN);
  56 |         await expect.soft(this.inventoryContainer).not.toBeVisible();
  57 |     }
  58 | 
  59 |     async shouldNavigateToInventory(): Promise<void> {
  60 |         await expect(this.inventoryContainer).toBeVisible();
  61 |         await expect(this.page).toHaveURL(ROUTES.INVENTORY);
  62 |     }
  63 | }
```