import { test, expect } from '@playwright/test';

test('EPAM: Services -> Explore Our Client Work -> verify Client Work text', async ({ page }) => {
  await page.goto('https://www.epam.com/', { waitUntil: 'domcontentloaded' });

  // Best-effort cookie banner handling (may vary by region/session)
  const acceptCookies = page.getByRole('button', { name: /accept|agree/i }).first();
  if (await acceptCookies.isVisible().catch(() => false)) {
    await acceptCookies.click();
  }

  // "Services" typically opens a menu on hover.
  const servicesNavItem = page.getByRole('link', { name: /^Services$/i }).first();
  await expect(servicesNavItem).toBeVisible();
  await servicesNavItem.hover();

  const exploreClientWork = page.getByRole('link', { name: /Explore Our Client Work/i }).first();
  await expect(exploreClientWork).toBeVisible();
  await exploreClientWork.click();

  await expect(page.getByText(/Client Work/i).first()).toBeVisible();
});
