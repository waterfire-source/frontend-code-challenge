import { test, expect } from '@playwright/test';

test('homepage loads and shows search bar', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByPlaceholder('Search products...')).toBeVisible();
}); 