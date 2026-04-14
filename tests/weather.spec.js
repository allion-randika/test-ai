import { test, expect } from '@playwright/test';

test('weather app loads, displays UI and fetches weather data', async ({ page }) => {
  // Collect console errors
  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });
  
  // Navigate to the app
  await page.goto('http://localhost:5173');
  
  // Wait for page to load
  await page.waitForLoadState('domcontentloaded');
  
  // Check that the main header is visible
  await expect(page.locator('h1')).toContainText('Weather Dashboard');
  
  // Check that the search input exists
  await expect(page.locator('#city-search')).toBeVisible();
  
  // Check unit toggle buttons exist
  await expect(page.locator('button:has-text("°C")')).toBeVisible();
  await expect(page.locator('button:has-text("°F")')).toBeVisible();
  
  // Check that the loading state is shown initially
  await expect(page.locator('.loading-state')).toBeVisible();
  
  // Wait for weather data to load (should replace loading state)
  await page.waitForSelector('.weather-content', { timeout: 15000 });
  
  // Verify weather content is now visible
  await expect(page.locator('.weather-content')).toBeVisible();
  
  // Check for the forecast sections
  await expect(page.locator('.forecast')).toBeVisible();
  await expect(page.locator('.hourly-forecast')).toBeVisible();
  
  // Check for city name (New York is default)
  await expect(page.locator('.city-name')).toContainText('New York');
  
  // Verify no critical JavaScript errors (filter network issues)
  const criticalErrors = consoleErrors.filter(err => 
    !err.includes('Failed to fetch') && 
    !err.includes('net::ERR') &&
    !err.includes('CORS') &&
    !err.includes('Failed to load resource')
  );
  
  // Check for any JS errors
  expect(criticalErrors).toHaveLength(0);
});
