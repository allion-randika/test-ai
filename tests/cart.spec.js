import { test, expect } from '@playwright/test';

test.describe('Shopping Cart Features', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate to the home page first
    await page.goto('http://localhost:5173');
  });

  test('1. Navigate to /menu and add a pizza to cart', async ({ page }) => {
    await page.goto('http://localhost:5173/menu');
    
    // Wait for pizzas to load
    await page.waitForSelector('.pizza-card');
    
    // Get the first pizza's name and price
    const firstPizzaName = await page.locator('.pizza-card-title').first().textContent();
    const firstPizzaPrice = await page.locator('.pizza-card-price').first().textContent();
    
    // Click the Add button
    await page.locator('.add-btn').first().click();
    
    // Wait for the button to show "Added!" state
    await expect(page.locator('.add-btn').first()).toHaveText('Added!');
    
    // Verify cart count in navigation shows 1
    await expect(page.locator('.cart-count')).toHaveText('1');
    
    console.log(`Added pizza: ${firstPizzaName} at ${firstPizzaPrice}`);
  });

  test('2. Click cart icon in navigation - should navigate to /cart', async ({ page }) => {
    await page.goto('http://localhost:5173/menu');
    
    // Add a pizza first
    await page.locator('.add-btn').first().click();
    await page.waitForTimeout(500);
    
    // Click the cart icon in navigation
    await page.locator('.cart-btn').click();
    
    // Verify URL is /cart
    await expect(page).toHaveURL(/.*\/cart/);
    
    // Verify cart page is displayed
    await expect(page.locator('.cart-page')).toBeVisible();
    await expect(page.locator('.cart-title')).toContainText('Cart');
  });

  test('3. Verify the cart shows the added pizza with correct price', async ({ page }) => {
    await page.goto('http://localhost:5173/menu');
    
    // Get pizza details from menu
    const pizzaName = await page.locator('.pizza-card-title').first().textContent();
    const pizzaPrice = await page.locator('.pizza-card-price').first().textContent();
    const priceValue = parseFloat(pizzaPrice.replace('$', ''));
    
    // Add pizza to cart
    await page.locator('.add-btn').first().click();
    await page.waitForTimeout(500);
    
    // Navigate to cart
    await page.locator('.cart-btn').click();
    await page.waitForURL(/.*\/cart/);
    
    // Verify pizza name in cart
    await expect(page.locator('.item-name')).toHaveText(pizzaName);
    
    // Verify pizza price in cart
    await expect(page.locator('.item-price')).toContainText(`$${priceValue.toFixed(2)} each`);
    
    // Verify subtotal (should be same as price since quantity is 1)
    await expect(page.locator('.item-subtotal')).toContainText(pizzaPrice);
  });

  test('4. Test quantity +/- buttons - should update quantity and total', async ({ page }) => {
    await page.goto('http://localhost:5173/menu');
    
    // Add a pizza
    await page.locator('.add-btn').first().click();
    await page.waitForTimeout(500);
    
    // Navigate to cart
    await page.locator('.cart-btn').click();
    await page.waitForURL(/.*\/cart/);
    
    // Verify initial quantity is 1
    await expect(page.locator('.qty-value')).toHaveText('1');
    
    // Get the item price
    const itemPrice = await page.locator('.item-price').textContent();
    const priceValue = parseFloat(itemPrice.replace('$', '').replace(' each', ''));
    
    // Click the + button to increase quantity
    const plusBtn = page.locator('.qty-btn').nth(1); // Second button is plus
    await plusBtn.click();
    
    // Verify quantity is now 2
    await expect(page.locator('.qty-value')).toHaveText('2');
    
    // Verify subtotal is doubled
    const expectedSubtotal = (priceValue * 2).toFixed(2);
    await expect(page.locator('.item-subtotal')).toContainText(`$${expectedSubtotal}`);
    
    // Click the - button to decrease quantity back to 1
    const minusBtn = page.locator('.qty-btn').first(); // First button is minus
    await minusBtn.click();
    
    // Verify quantity is back to 1
    await expect(page.locator('.qty-value')).toHaveText('1');
    
    // Verify subtotal is back to original
    const expectedSubtotal1 = priceValue.toFixed(2);
    await expect(page.locator('.item-subtotal')).toContainText(`$${expectedSubtotal1}`);
  });

  test('5. Test remove button - should remove item from cart', async ({ page }) => {
    await page.goto('http://localhost:5173/menu');
    
    // Add a pizza
    await page.locator('.add-btn').first().click();
    await page.waitForTimeout(500);
    
    // Navigate to cart
    await page.locator('.cart-btn').click();
    await page.waitForURL(/.*\/cart/);
    
    // Verify cart has items
    await expect(page.locator('.cart-item')).toHaveCount(1);
    
    // Click the remove button (trash icon)
    await page.locator('.remove-btn').click();
    
    // Verify cart is now empty (empty state)
    await expect(page.locator('.cart-empty')).toBeVisible();
    await expect(page.locator('.cart-empty h2')).toContainText('Your Cart is Empty');
    
    // Verify cart count is 0
    const cartCount = await page.locator('.cart-count').count();
    expect(cartCount).toBe(0);
  });

  test('6. Add multiple different pizzas and verify they all appear in cart', async ({ page }) => {
    await page.goto('http://localhost:5173/menu');
    
    // Wait for pizzas to load
    await page.waitForSelector('.pizza-card');
    
    // Get all pizza names on the page
    const pizzaNames = await page.locator('.pizza-card-title').allTextContents();
    const firstPizza = pizzaNames[0];
    const secondPizza = pizzaNames[1];
    const thirdPizza = pizzaNames[2];
    
    // Add 3 different pizzas
    await page.locator('.add-btn').nth(0).click();
    await page.waitForTimeout(300);
    await page.locator('.add-btn').nth(1).click();
    await page.waitForTimeout(300);
    await page.locator('.add-btn').nth(2).click();
    await page.waitForTimeout(500);
    
    // Navigate to cart
    await page.locator('.cart-btn').click();
    await page.waitForURL(/.*\/cart/);
    
    // Verify all 3 pizzas are in cart
    await expect(page.locator('.cart-item')).toHaveCount(3);
    
    // Verify each pizza name appears in cart
    const cartItemNames = await page.locator('.item-name').allTextContents();
    expect(cartItemNames).toContain(firstPizza);
    expect(cartItemNames).toContain(secondPizza);
    expect(cartItemNames).toContain(thirdPizza);
  });

  test('7. Verify cart total calculates correctly', async ({ page }) => {
    await page.goto('http://localhost:5173/menu');
    
    // Get prices of first two pizzas
    const prices = await page.locator('.pizza-card-price').allTextContents();
    const price1 = parseFloat(prices[0].replace('$', ''));
    const price2 = parseFloat(prices[1].replace('$', ''));
    
    // Add first pizza once
    await page.locator('.add-btn').first().click();
    await page.waitForTimeout(300);
    
    // Add second pizza twice
    await page.locator('.add-btn').nth(1).click();
    await page.waitForTimeout(300);
    await page.locator('.add-btn').nth(1).click();
    await page.waitForTimeout(500);
    
    // Navigate to cart
    await page.locator('.cart-btn').click();
    await page.waitForURL(/.*\/cart/);
    
    // Calculate expected subtotal: price1*1 + price2*2
    const expectedSubtotal = price1 + (price2 * 2);
    
    // Get the Items total from summary
    const itemsTotal = await page.locator('.summary-row').first().locator('span').nth(1).textContent();
    const actualTotal = parseFloat(itemsTotal.replace('$', ''));
    
    // Verify the total matches (this is the subtotal before tax)
    expect(actualTotal).toBeCloseTo(expectedSubtotal, 2);
    
    // Verify total with tax (subtotal * 1.08 for 8% tax)
    const expectedWithTax = expectedSubtotal * 1.08;
    const totalWithTax = await page.locator('.summary-row.total span').nth(1).textContent();
    const actualWithTax = parseFloat(totalWithTax.replace('$', ''));
    
    expect(actualWithTax).toBeCloseTo(expectedWithTax, 2);
    
    console.log(`Expected subtotal: $${expectedSubtotal.toFixed(2)}, Actual: $${actualTotal.toFixed(2)}`);
    console.log(`Expected total with tax: $${expectedWithTax.toFixed(2)}, Actual: $${actualWithTax.toFixed(2)}`);
  });

  test('8. Test the checkout button - should navigate to checkout page', async ({ page }) => {
    await page.goto('http://localhost:5173/menu');
    
    // Add a pizza
    await page.locator('.add-btn').first().click();
    await page.waitForTimeout(500);
    
    // Navigate to cart
    await page.locator('.cart-btn').click();
    await page.waitForURL(/.*\/cart/);
    
    // Click checkout button
    await page.locator('.checkout-btn').click();
    
    // Verify navigation to checkout page
    await expect(page).toHaveURL(/.*\/checkout/);
    await expect(page.locator('.checkout-page')).toBeVisible();
    await expect(page.locator('.checkout-title')).toContainText('Checkout');
  });

  test('9. Test empty cart state', async ({ page }) => {
    // Navigate directly to cart (no items added)
    await page.goto('http://localhost:5173/cart');
    
    // Verify empty cart state is displayed
    await expect(page.locator('.cart-empty')).toBeVisible();
    await expect(page.locator('.cart-empty h2')).toContainText('Your Cart is Empty');
    await expect(page.locator('.empty-icon')).toContainText('🍕');
    
    // Verify "Browse Menu" button exists and links to /menu
    const browseMenuBtn = page.locator('.cart-empty .btn');
    await expect(browseMenuBtn).toBeVisible();
    await browseMenuBtn.click();
    await expect(page).toHaveURL(/.*\/menu/);
  });
});
