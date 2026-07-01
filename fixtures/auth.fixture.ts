import { test as base } from "@playwright/test"
import TestLoginPage from "../pages/testLogin.page"
import ProductSortingPage from "../pages/productSorting.page";
import LoginPage from "../pages/login.page";


type pages = {
    loginPage: LoginPage;
    testLoginPage: TestLoginPage;
    productSortingPage: ProductSortingPage;
}

const testPages = base.extend<pages>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    productSortingPage: async ({ page }, use) => {
        await use(new ProductSortingPage(page));
    },
    testLoginPage: async ({ page }, use) => {
        await use(new TestLoginPage(page));
    },

    // === AFTER EACH TEST: ALWAYS CLOSE PAGE ===
    // page: async ({ page }, use) => {
    //     await use(page);
    //     await page.close();
    // },

})

export const test = testPages;
export const expect = testPages.expect;