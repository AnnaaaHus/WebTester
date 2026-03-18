import { test, expect } from '@playwright/test';

test('EPAM - navigate via Services to Client Work and verify text', async ({ page }) => {
  // Step 1: Navigate to https://www.epam.com/
  await page.goto('https://www.epam.com/', { waitUntil: 'domcontentloaded' });

  // Optional: cookie banner (may appear depending on region)
  const acceptCookies = page.getByRole('button', { name: /accept|agree/i });
  if (await acceptCookies.isVisible().catch(() => false)) {
    await acceptCookies.click();
  }

  // Step 2: Select "Services" from the header menu
  await page.getByRole('link', { name: /^services$/i }).click();

  // Step 3: Click the "Explore Our Client Work" link
  await page.getByRole('link', { name: /explore our client work/i }).click();

  // Step 4: Verify that the "Client Work" text is visible on the page
  await expect(page.getByText('Client Work', { exact: false })).toBeVisible();
});
