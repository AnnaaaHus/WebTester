import { test, expect } from '@playwright/test';

test.describe('EPAM - Services -> Client Work', () => {
  test('navigate via Services and verify Client Work page', async ({ page }) => {
    await page.goto('https://www.epam.com/', { waitUntil: 'domcontentloaded' });

    // Best-effort cookie consent dismissal (OneTrust is common on epam.com)
    const acceptCookies = page.getByRole('button', { name: /accept all|accept cookies/i });
    if (await acceptCookies.isVisible().catch(() => false)) {
      await acceptCookies.click();
    }

    // Open "Services" from the header
    await page.getByRole('link', { name: /^services$/i }).click();

    // Click "Explore Our Client Work"
    await page.getByRole('link', { name: /explore our client work/i }).click();

    // Verify "Client Work" text is visible
    await expect(page.getByRole('heading', { name: /client work/i })).toBeVisible();
  });
});
