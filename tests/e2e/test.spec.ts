import { test, expect } from '@wordpress/e2e-test-utils-playwright';

test.beforeEach(async ({ page }) => {
  await page.goto('/wp-login.php');
  await page.waitForTimeout(1500);
  await page.locator('#user_login').fill('admin');
  await page.locator('#user_pass').fill('password');
  await page.locator('#wp-submit').click();
  await page.waitForTimeout(1500);
  await expect(
    page.getByRole('heading', { name: 'Dashboard', level: 1 }),
  ).toBeVisible();
});

test('should open command palette and navigate to Permalink Settings', async ({ page }) => {
  await page.goto('/wp-admin/');

  // Open command palette with Cmd+K
  await page.keyboard.press('Meta+KeyK');

  // Wait for palette to appear (assume role dialog or similar)
  await expect(page.getByRole('dialog')).toBeVisible();

  // Type 'Settings Permalink'
  await page.keyboard.type('Settings Permalink');

	// Wait for the option to be visible
	const option = page.getByText('Go to: Settings – Permalinks');
	await expect(option).toBeVisible();

	// Click the option
	await option.click();

  // Should be redirected to Permalink Settings
  await expect(page).toHaveURL(/\/wp-admin\/options-permalink\.php$/);
});

test('should navigate to Add Post and Settings General via palette', async ({ admin, page }) => {
  // Go to admin dashboard
  await page.goto('/wp-admin/');

  // Open palette and search for "Add Post"
  await page.keyboard.press('Meta+KeyK');
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.type('Add Post');

  // Click the first option
  const firstOption = page.getByRole('option').first();
  await expect(firstOption).toBeVisible();
  await firstOption.click();

  // Should be redirected to Add Post
  await expect(page).toHaveURL(/\/wp-admin\/post-new\.php$/);

  await admin.editor.setPreferences('core/edit-post', {
    welcomeGuide: false,
    fullscreenMode: false,
  });

  // Wait a few seconds to ensure the editor is fully loaded.
  await page.waitForTimeout(3000);

  // Open palette and search for "Settings General"
  await page.keyboard.press('Meta+KeyK');
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.type('Settings Reading');

  // Click the first option
  const generalOption = page.getByRole('option').first();
  await expect(generalOption).toBeVisible();
  await generalOption.click();

  // Should be redirected to Reading Settings
  await expect(page).toHaveURL(/\/wp-admin\/options-reading\.php$/);
});

test('should navigate to Edit Profile via palette', async ({ page }) => {
  await page.goto('/wp-admin/');

  // Open palette and search for "edit profile"
  await page.keyboard.press('Meta+KeyK');
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.type('edit profile');

  // Click the first option
  const profileOption = page.getByRole('option').first();
  await expect(profileOption).toBeVisible();
  await profileOption.click();

  // Should be redirected to profile.php
  await expect(page).toHaveURL(/\/wp-admin\/profile\.php$/);
});

test('should navigate to multisite via palette', async ({ page }) => {
  await page.goto('/wp-admin/');

  // Open palette and search for "Test Site"
  await page.keyboard.press('Meta+KeyK');
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.type('Test Site');

  // Click the first option
  const siteOption = page.getByRole('option').first();
  await expect(siteOption).toBeVisible();
  await siteOption.click();

  // Should be redirected to /test-site/wp-admin/
  await expect(page).toHaveURL(/\/test-site\/wp-admin\/$/);
});

test('should navigate to logout via palette', async ({ page }) => {
  await page.goto('/wp-admin/');

  // Open palette and search for "Logout"
  await page.keyboard.press('Meta+KeyK');
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.type('Logout');

  // Click the first option
  const logoutOption = page.getByRole('option').first();
  await expect(logoutOption).toBeVisible();
  await logoutOption.click();

  // Should be redirected to wp-login.php
  await expect(page).toHaveURL(/\/wp-login\.php/);

  // Expect to see 'You are now logged out.' on the page.
  await expect(page.getByText('You are now logged out.')).toBeVisible();
});
