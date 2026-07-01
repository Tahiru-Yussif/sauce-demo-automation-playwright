import { test, expect } from '../../fixtures/auth.fixture';
import { config } from "../../config";
import testData from "../../test-data/login.json" with { type: "json" };
import { SortOption } from '../../enum/productSortingEnums.enum';

test.describe('Product Sorting', () => {

    test.beforeEach(async ( { page, context, loginPage }) => {
        await context.clearCookies();
        await page.goto('/');
        await loginPage.login(testData.validUser.username, testData.validUser.password);
    });

test.describe('Name sorting', () => {
    test('should sort product items A-Z @smoke', async ({ productSortingPage }) => {

            await test.step('Select A-Z sort option', async () => {
                await productSortingPage.selectSortOption(SortOption.NAME_A_TO_Z);
            });

            let actualProducts: string[];
            let expectedProducts: string[];
            await test.step('Verify products are sorted correctly', async () => {
                actualProducts = await productSortingPage.getAllProductNames();
                expectedProducts = [...actualProducts].sort((a, b) => 
                    a.localeCompare(b, 'en', { sensitivity: 'base' })
                );
            });
                
            await test.step("Validate products are sorted A-Z", async () => {
                expect(actualProducts.length).toBeGreaterThan(0);
                expect(actualProducts).toEqual(expectedProducts);
            });
        });

    test('should sort product items Z-A', async ({ productSortingPage }) => {
            await test.step('Select Z-A sort option', async () => {
                await productSortingPage.selectSortOption(SortOption.NAME_Z_TO_A);
            });

            let actualProducts: string[];
            let expectedProducts: string[];
            await test.step('Verify products are sorted correctly', async () => {
                actualProducts = await productSortingPage.getAllProductNames();
                expectedProducts = [...actualProducts].sort((a, b) => 
                    b.localeCompare(a, 'en', { sensitivity: 'base' })
                );
            });

                await test.step("Validate products are sorted Z-A", async () => {
                    expect(actualProducts.length).toBeGreaterThan(0);
                    expect(actualProducts).toEqual(expectedProducts);
                });
            });
});

    test.describe('Price Sorting', () => {
        test("should sort product prices low to high @smoke", async ({ productSortingPage }) => {

            await test.step("Select price low → high sorting", async () => {
                await productSortingPage.selectSortOption(SortOption.PRICE_LOW_TO_HIGH);
            });

            let actualPrices: number[];
            let expectedPrices: number[];
            await test.step('Verify products are sorted correctly', async () => {
                actualPrices = await productSortingPage.getAllProductPrices();
                expectedPrices = [...actualPrices].sort((a, b) => a - b);
            });

            await test.step("Validate prices are sorted ascending", async () => {
                expect(actualPrices).toEqual(expectedPrices);
        });
    });

    test("Sorting Product Price(high to low)", async ({ productSortingPage }) => {

        await test.step("Select price high → low sorting", async () => {
            await productSortingPage.selectSortOption(SortOption.PRICE_HIGH_TO_LOW);
        });

        let actualPrices: number[];
        let expectedPrices: number[];
        await test.step('Verify products are sorted correctly', async () => {
            actualPrices = await productSortingPage.getAllProductPrices();
            expectedPrices = [...actualPrices].sort((a, b) => b - a);
        });
                
        await test.step("Validate prices are sorted descending", async () => {
            expect(actualPrices).toEqual(expectedPrices);
        });
    });
});

    test('Should sort products within acceptable time', async ({ productSortingPage }) => {
        // Get start execution start time.
        const startTime = Date.now();
    
        await productSortingPage.selectSortOption(SortOption.NAME_A_TO_Z);
        await productSortingPage.waitForProductsToLoad();
        // Get end time and the time difference
        const endTime = Date.now();
        const duration = endTime - startTime;
        
        // Assert sorting completes within 2 seconds
        expect(duration).toBeLessThan(config.responseTime);
    });
});