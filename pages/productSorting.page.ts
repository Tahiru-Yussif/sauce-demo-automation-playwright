import { Locator, Page, expect } from '@playwright/test';
import { SortOption } from '../enum/productSortingEnums.enum';

export default class ProductSortingPage {
    private readonly sortDropdown: Locator;
    private readonly productNames: Locator;
    private readonly productPrices: Locator;

    constructor(public readonly page: Page) {
        this.sortDropdown = page.getByTestId('product-sort-container');
        this.productNames = page.getByTestId('inventory-item-name');
        this.productPrices = page.getByTestId('inventory-item-price');
    }

      // Actions
    async selectSortOption(option: SortOption): Promise<void> {
        await this.sortDropdown.selectOption(option);
        // Wait for products to re-render after sort
        // await this.page.waitForLoadState('networkidle');
        await this.productNames.first().waitFor({ state: 'visible'});

    }

     // Getters for validation
    async getAllProductNames(): Promise<string[]> {
        await this.productNames.first().waitFor({ state: 'visible'});
        const names = await this.productNames.allTextContents();
        if (names.length === 0) {
            throw new Error("No product names found");
            
        }
        return names;
    }

    async getAllProductPrices(): Promise<number[]> {
        await this.productPrices.first().waitFor({ state: 'visible' });
        
        const priceTexts = await this.productPrices.allTextContents();
        const prices = priceTexts.map(price => parseFloat(price.replace('$', '')));
        
        if (prices.some(isNaN)) {
            throw new Error('Invalid price format detected');
        }
        
        return prices;
    }

    // async getCurrentSortValue(): Promise<string> {
    //     return await this.sortDropdown.inputValue();
    // }

    // // Utility methods
    async waitForProductsToLoad(): Promise<void> {
        await this.sortDropdown.waitFor({ state: 'visible' });
        await this.productNames.first().waitFor();
    }
}