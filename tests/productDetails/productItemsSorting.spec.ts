import { test, expect } from '../../fixtures/auth.fixture';
// import { test, expect } from '../../fixtures/productPage.fixture';
import { config } from "../../config";
import { SortOption } from '../../enum/productSortingEnums.enum';

test.describe('Product Sorting', () => {
    test.beforeEach(async ( { page, baseURL, loginPage }) => {
        await page.goto(`${baseURL}`);
        await loginPage.login(config.standardUsername, config.standardPassword);
    })

    test("Sorting Product items A-Z", async ({ productSortingPage }) => {
        await productSortingPage.selectSortOption(SortOption.NAME_A_TO_Z);

         // Get actual product names after sorting
        const actualProducts = await productSortingPage.getAllProductNames();

         // Create expected sorted array
        const expectedProducts = [...actualProducts].sort((a, b) => 
            a.localeCompare(b, 'en', { sensitivity: 'base' })
        );
        
         // Assert
        expect(actualProducts).toEqual(expectedProducts);
        
         // Additional assertion: Verify first and last items
        expect(actualProducts[0]).toBe(expectedProducts[0]);
        expect(actualProducts[actualProducts.length - 1]).toBe(
            expectedProducts[expectedProducts.length - 1]
        );
    })

    test("Sorting Product items Z-A", async ({ productSortingPage }) => {
        await productSortingPage.selectSortOption(SortOption.NAME_Z_TO_A);

         // Get actual product names after sorting
        const actualProducts = await productSortingPage.getAllProductNames();

         // Create expected sorted array
        const expectedProducts = [...actualProducts].sort((a, b) => 
            b.localeCompare(a, 'en', { sensitivity: 'base' })
        );

         // Assert
        expect(actualProducts).toEqual(expectedProducts);
    })

    test("Sorting Product Price(low to high)", async ({ productSortingPage }) => {
        await productSortingPage.selectSortOption(SortOption.PRICE_LOW_TO_HIGH);

         // Get actual product names after sorting
        const actualPrices = await productSortingPage.getAllProductPrices();

         // Create expected sorted array
        const expectedPrices = [...actualPrices].sort((a, b) => a - b);
                
        //  // Assert
        expect(actualPrices).toEqual(expectedPrices);
    })

    test("Sorting Product Price(high to low)", async ({ productSortingPage }) => {
        await productSortingPage.selectSortOption(SortOption.PRICE_HIGH_TO_LOW);

         // Get actual product names after sorting
        const actualPrices = await productSortingPage.getAllProductPrices();

         // Create expected sorted array
        const expectedPrices = [...actualPrices].sort((a, b) => b - a);
                
        //  // Assert
        expect(actualPrices).toEqual(expectedPrices);
    })

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
})
