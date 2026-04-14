import { test, expect } from '@playwright/test'

test.describe('Cricket Team Dashboard', () => {
  test('Dashboard page loads correctly', async ({ page }) => {
    await page.goto('http://localhost:5173/')
    
    // Check main heading
    await expect(page.locator('.dashboard-header h1, .header-content h1').first()).toContainText('Team Dashboard')
    
    // Check navigation
    await expect(page.locator('.navbar')).toBeVisible()
    
    // Check stats cards are visible
    await expect(page.locator('.stats-grid')).toBeVisible()
    const statCards = page.locator('.stat-card')
    await expect(statCards).toHaveCount(6)
    
    // Check charts are visible
    await expect(page.locator('.charts-row')).toBeVisible()
    
    // Check no console errors
    const consoleErrors = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    
    // Wait for page to fully load
    await page.waitForTimeout(1000)
    
    expect(consoleErrors).toHaveLength(0)
  })

  test('Summary page loads correctly', async ({ page }) => {
    await page.goto('http://localhost:5173/summary')
    
    // Check main heading
    await expect(page.locator('.summary-header h1')).toContainText('Season Summary')
    
    // Check hero stats section
    await expect(page.locator('.hero-stats')).toBeVisible()
    
    // Check awards section
    await expect(page.locator('.awards-section')).toBeVisible()
    const awardCards = page.locator('.award-card')
    await expect(awardCards.first()).toBeVisible()
    
    // Check stats table
    await expect(page.locator('.stats-table')).toBeVisible()
  })

  test('Navigation works correctly', async ({ page }) => {
    await page.goto('http://localhost:5173/')
    
    // Click on Summary link
    await page.locator('.nav-link:has-text("Season Summary")').click()
    
    // Should be on summary page
    await expect(page).toHaveURL(/.*summary/)
    await expect(page.locator('.summary-header h1')).toContainText('Season Summary')
    
    // Click on Dashboard link
    await page.locator('.nav-link:has-text("Dashboard")').click()
    
    // Should be on dashboard page
    await expect(page).toHaveURL(/.*\/$/)
    await expect(page.locator('.dashboard-header h1')).toContainText('Team Dashboard')
  })

  test('All data displays correctly', async ({ page }) => {
    await page.goto('http://localhost:5173/')
    
    // Check player performers list has items
    const performerItems = page.locator('.performer-item')
    await expect(performerItems.first()).toBeVisible()
    
    // Check match results are displayed
    const resultItems = page.locator('.result-item')
    await expect(resultItems.first()).toBeVisible()
    
    // Check upcoming match is shown
    await expect(page.locator('.next-match')).toBeVisible()
  })
})
