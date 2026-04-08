import { test, expect } from '@playwright/test';

test.describe('Checkout Page Functionality', () => {
  
  test.beforeEach(async ({ page }) => {
    // Capture console messages
    page.on('console', msg => {
      if (msg.type() === 'error') {
        console.log(`Console Error: ${msg.text()}`);
      }
    });
    
    // Capture page errors
    page.on('pageerror', err => {
      console.log(`Page Error: ${err.message}`);
    });
  });

  test('1. Navigate to /checkout when cart is empty - should show empty cart message', async ({ page }) => {
    // Go directly to checkout
    await page.goto('/checkout');
    
    // Verify empty cart message is displayed
    await expect(page.locator('.checkout-empty')).toBeVisible();
    await expect(page.locator('.checkout-empty h2')).toContainText('Your cart is empty');
    await expect(page.locator('.checkout-empty p')).toContainText('Add some delicious pizzas before checking out!');
    
    // Verify "Browse Menu" button exists
    const browseMenuBtn = page.locator('.checkout-empty .btn');
    await expect(browseMenuBtn).toBeVisible();
    
    // Click and verify navigation to menu
    await browseMenuBtn.click();
    await expect(page).toHaveURL(/.*\/menu/);
  });

  test('2. Add items to cart from /menu, then navigate to /checkout', async ({ page }) => {
    // Start fresh at home page to get a clean cart state
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Navigate to menu
    await page.goto('/menu');
    await page.waitForSelector('.pizza-card');
    
    // Get the first pizza's name
    const firstPizzaName = await page.locator('.pizza-card-title').first().textContent();
    
    // Click the Add button
    await page.locator('.add-btn').first().click();
    
    // Wait for "Added!" state
    await expect(page.locator('.add-btn').first()).toHaveText('Added!');
    
    // Verify cart count in navigation shows 1
    await expect(page.locator('.cart-count')).toHaveText('1');
    
    // Navigate to checkout via the cart link
    await page.click('a.cart-btn');
    await page.waitForURL(/.*\/cart/);
    await expect(page.locator('.cart-page')).toBeVisible();
    
    // Click the proceed to checkout button
    await page.click('.checkout-btn');
    await page.waitForURL(/.*\/checkout/);
    await page.waitForSelector('.checkout-form');
    
    // Verify checkout page is displayed (not empty cart)
    await expect(page.locator('.checkout-page')).toBeVisible();
    await expect(page.locator('.checkout-title')).toContainText('Checkout');
    
    // Verify pizza item appears in order summary
    await expect(page.locator('.order-item')).toHaveCount(1);
    await expect(page.locator('.item-name')).toHaveText(firstPizzaName);
  });

  test('3. Verify form validation shows errors for invalid inputs', async ({ page }) => {
    // Add item to cart first - go to menu, add item
    await page.goto('/menu');
    await page.waitForSelector('.pizza-card');
    await page.locator('.add-btn').first().click();
    await page.waitForTimeout(500);
    
    // Navigate to checkout via cart
    await page.click('a.cart-btn');
    await page.waitForURL(/.*\/cart/);
    await page.click('.checkout-btn');
    await page.waitForURL(/.*\/checkout/);
    await page.waitForSelector('.checkout-form');
    
    // Fill in some fields but leave others empty to test validation
    // First let's test invalid email format
    await page.fill('#firstName', 'John');
    await page.fill('#email', 'invalid-email');
    await page.locator('#email').blur();
    await expect(page.locator('#email-error')).toContainText('Please enter a valid email');
    
    // Clear and test valid email
    await page.fill('#email', 'john@example.com');
    await page.locator('#email').blur();
    await expect(page.locator('#email-error')).not.toBeVisible();
    
    // Test invalid phone
    await page.fill('#phone', '123');
    await page.locator('#phone').blur();
    await expect(page.locator('#phone-error')).toContainText('Please enter a valid phone number');
    
    // Test valid phone
    await page.fill('#phone', '555-123-4567');
    await page.locator('#phone').blur();
    await expect(page.locator('#phone-error')).not.toBeVisible();
    
    // Test invalid zip code
    await page.fill('#zipCode', 'abc');
    await page.locator('#zipCode').blur();
    await expect(page.locator('#zipCode-error')).toContainText('Please enter a valid ZIP code');
    
    // Test valid zip
    await page.fill('#zipCode', '10001');
    await page.locator('#zipCode').blur();
    await expect(page.locator('#zipCode-error')).not.toBeVisible();
    
    // Test invalid card number
    await page.fill('#cardNumber', '1234');
    await page.locator('#cardNumber').blur();
    await expect(page.locator('#cardNumber-error')).toContainText('Please enter a valid card number');
    
    // Test valid card
    await page.fill('#cardNumber', '1234567890123456');
    await page.locator('#cardNumber').blur();
    await expect(page.locator('#cardNumber-error')).not.toBeVisible();
    
    // Test invalid expiry date
    await page.fill('#expiryDate', 'invalid');
    await page.locator('#expiryDate').blur();
    await expect(page.locator('#expiryDate-error')).toContainText('Please enter a valid expiry');
    
    // Test valid expiry
    await page.fill('#expiryDate', '1225');
    await page.locator('#expiryDate').blur();
    await expect(page.locator('#expiryDate-error')).not.toBeVisible();
    
    // Test invalid CVV
    await page.fill('#cvv', 'ab');
    await page.locator('#cvv').blur();
    await expect(page.locator('#cvv-error')).toContainText('Please enter a valid CVV');
    
    // Test valid CVV
    await page.fill('#cvv', '123');
    await page.locator('#cvv').blur();
    await expect(page.locator('#cvv-error')).not.toBeVisible();
  });

  test('4. Fill out the checkout form with valid data and submit', async ({ page }) => {
    // Add item to cart first
    await page.goto('/menu');
    await page.waitForSelector('.pizza-card');
    await page.locator('.add-btn').first().click();
    await page.waitForTimeout(500);
    
    // Navigate to checkout via cart button
    await page.click('a.cart-btn');
    await page.waitForURL(/.*\/cart/);
    await page.click('.checkout-btn');
    await page.waitForURL(/.*\/checkout/);
    await page.waitForSelector('.checkout-form');
    
    // Fill in personal information
    await page.fill('#firstName', 'John');
    await page.fill('#lastName', 'Doe');
    await page.fill('#email', 'john@example.com');
    await page.fill('#phone', '555-123-4567');
    
    // Fill in delivery address
    await page.fill('#address', '123 Main Street');
    await page.fill('#city', 'New York');
    await page.fill('#state', 'NY');
    await page.fill('#zipCode', '10001');
    
    // Fill in payment details
    await page.fill('#cardName', 'John Doe');
    await page.fill('#cardNumber', '1234567890123456');
    await page.fill('#expiryDate', '1225');
    await page.fill('#cvv', '123');
    
    // Submit the form
    await page.locator('.place-order-btn').click();
    
    // Wait for processing
    await expect(page.locator('.place-order-btn')).toContainText('Processing Order...');
    
    // Wait for order completion (1.5s simulated delay)
    await page.waitForTimeout(2000);
  });

  test('5. Verify the order success page displays after submission', async ({ page }) => {
    // Add item to cart first
    await page.goto('/menu');
    await page.waitForSelector('.pizza-card');
    await page.locator('.add-btn').first().click();
    await page.waitForTimeout(500);
    
    // Navigate to checkout via cart
    await page.click('a.cart-btn');
    await page.waitForURL(/.*\/cart/);
    await page.click('.checkout-btn');
    await page.waitForURL(/.*\/checkout/);
    await page.waitForSelector('.checkout-form');
    
    // Fill in all required fields with valid data
    await page.fill('#firstName', 'John');
    await page.fill('#lastName', 'Doe');
    await page.fill('#email', 'john@example.com');
    await page.fill('#phone', '555-123-4567');
    await page.fill('#address', '123 Main Street');
    await page.fill('#city', 'New York');
    await page.fill('#state', 'NY');
    await page.fill('#zipCode', '10001');
    await page.fill('#cardName', 'John Doe');
    await page.fill('#cardNumber', '1234567890123456');
    await page.fill('#expiryDate', '1225');
    await page.fill('#cvv', '123');
    
    // Submit the form
    await page.locator('.place-order-btn').click();
    
    // Wait for order to complete
    await page.waitForTimeout(2000);
    
    // Verify order success page is displayed
    await expect(page.locator('.order-success')).toBeVisible();
    await expect(page.locator('.success-icon')).toBeVisible();
    await expect(page.locator('.order-success h1')).toContainText('Order Placed Successfully');
    await expect(page.locator('.order-success p').first()).toContainText('Thank you for your order, John!');
    
    // Verify order number is displayed
    await expect(page.locator('.order-number')).toBeVisible();
    await expect(page.locator('.order-number')).toContainText('Order #');
    
    // Verify delivery message shows correct address
    await expect(page.locator('.delivery-message')).toContainText('123 Main Street');
    await expect(page.locator('.delivery-message')).toContainText('New York, NY 10001');
    
    // Verify action buttons exist
    await expect(page.locator('.success-actions .btn-primary')).toContainText('Order More Pizzas');
    await expect(page.locator('.success-actions .btn-secondary')).toContainText('Back to Home');
  });

  test('6. Verify cart is cleared after successful order', async ({ page }) => {
    // Add item to cart first
    await page.goto('/menu');
    await page.waitForSelector('.pizza-card');
    await page.locator('.add-btn').first().click();
    await page.waitForTimeout(500);
    
    // Verify cart has 1 item
    await expect(page.locator('.cart-count')).toHaveText('1');
    
    // Navigate to checkout via cart and complete order
    await page.click('a.cart-btn');
    await page.waitForURL(/.*\/cart/);
    await page.click('.checkout-btn');
    await page.waitForURL(/.*\/checkout/);
    await page.waitForSelector('.checkout-form');
    
    await page.fill('#firstName', 'John');
    await page.fill('#lastName', 'Doe');
    await page.fill('#email', 'john@example.com');
    await page.fill('#phone', '555-123-4567');
    await page.fill('#address', '123 Main Street');
    await page.fill('#city', 'New York');
    await page.fill('#state', 'NY');
    await page.fill('#zipCode', '10001');
    await page.fill('#cardName', 'John Doe');
    await page.fill('#cardNumber', '1234567890123456');
    await page.fill('#expiryDate', '1225');
    await page.fill('#cvv', '123');
    await page.locator('.place-order-btn').click();
    
    // Wait for order to complete
    await page.waitForTimeout(2000);
    await expect(page.locator('.order-success')).toBeVisible();
    
    // Navigate to home first then menu to check cart
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Go to menu
    await page.goto('/menu');
    
    // Verify cart count is now 0 (no cart count badge should be visible)
    const cartCountElement = page.locator('.cart-count');
    const count = await cartCountElement.count();
    
    // Either the element is not present or text is '0'
    if (count > 0) {
      await expect(cartCountElement).toHaveText('0');
    } else {
      // Cart count element doesn't exist means 0 items
      expect(true).toBe(true);
    }
  });
});
