import { test, expect } from '@playwright/test';

test.describe('Checkout Page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:8080/');
    });

    test('should load basket items correctly', async ({ page }) => {
        await expect(page.locator('text=Your order')).toBeVisible();
        await expect(page.locator('text=Loading basket...')).not.toBeVisible();
    });

    test('should apply a valid coupon', async ({ page }) => {
        await page.fill('input[placeholder="Enter code here"]', '25OFF');
        await page.click('button:has-text("Confirm")');
        
        await expect(page.locator('text=25OFF')).toBeVisible();
    });

    test('should show error for invalid coupon', async ({ page }) => {
        await page.fill('input[placeholder="Enter code here"]', 'DoesNotExist');
        await page.click('button:has-text("Confirm")');
        
        await expect(page.locator('.text-red-500')).toBeVisible();
    });

    test('should show validation errors on empty payment form', async ({ page }) => {
        await page.click('button:has-text("Pay by Card")');
        
        await expect(page.locator('.text-red-500')).toHaveCount(6);
    });

    test('should successfully submit payment with valid details', async ({ page }) => {
        await page.fill('input[name="email"]', 'test@testing.com');
        await page.fill('input[name="cardNumber"]', '1234123412341234');
        await page.fill('input[name="cardExpiry"]', '12/25');
        await page.fill('input[name="cardCvc"]', '123');
        await page.fill('input[name="postalCode"]', '12345');
        await page.fill('input[name="nameOnCard"]', 'This Is A Test');
        
        await page.click('button:has-text("Pay by Card")');
        
        await expect(page.locator('text=Order Confirmed')).toBeVisible();
        await expect(page.locator('text=Order number: ')).toBeVisible();
    });

    test('should not submit with invalid card details', async ({ page }) => {
        await page.fill('input[name="email"]', 'test@testing.com');
        await page.fill('input[name="cardNumber"]', 'thisIsNotValid');
        await page.fill('input[name="cardExpiry"]', '12/25');
        await page.fill('input[name="cardCvc"]', '123');
        await page.fill('input[name="postalCode"]', '12345');
        await page.fill('input[name="nameOnCard"]', 'This Is A Test');

        await page.click('button:has-text("Pay by Card")');

        await expect(page.locator('.text-red-500')).toHaveText('Invalid card number');
        await expect(page.locator('text=Order number: ')).not.toBeVisible();
    });
});
