// // import { test as base } from "@playwright/test";
// // import LoginPage from "../pages/login.page";
// // import ProductSortingPage from "../pages/productSorting.page";
// // import { config } from "../config";

// // type pages = {
// //     loginPage: LoginPage;
// //     productSortingPage: ProductSortingPage;
// // };

// // export const test = base.extend<pages>({
// //     loginPage: async ({ page }, use) => {
// //         const loginPage = new LoginPage(page);

// //         await page.goto(config.baseURL);
// //         await loginPage.login(config.standardUsername, config.standardPassword);

// //         await use(loginPage);
// //     },

// //     productSortingPage: async ({ page }, use) => {
// //         await use(new ProductSortingPage(page));
// //     }
// // });

// // Export expect
// // export const expect = test.expect;

// import { test as base } from "./auth.fixture";
// import { config } from "../config";
// import LoginPage from "../pages/login.page"
// import ProductSortingPage from "../pages/productSorting.page";

// export const test = base.extend({
//     loginPage: async ({ page, loginPage }, use) => {
//         await page.goto(config.baseURL);
//         await loginPage.login(config.standardUsername, config.standardPassword);
//         await use(page);
//     }
// });
