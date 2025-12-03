// import { test, expect } from '../../fixtures/auth.fixture';
// import { config } from "../../config";
// import testData from "../../test-data/login.json" assert { type: "json" };
// import { config } from "../../config";


// export const test = base.extend<Fixtures>({
//   loginPage: async ({ page }, use) => {
//     const loginPage = new LoginPage(page);

//     // ---- BEFORE EACH TEST (automatic login) ----
//     await page.goto(config.baseURL);
//     await loginPage.login(config.standardUsername, config.standardPassword);

//     // pass fixture to tests
//     await use(loginPage);

//     // ---- AFTER EACH TEST (automatic page close) ----
//     await page.close();
//   },
// });

// // Re-export expect for convenience
