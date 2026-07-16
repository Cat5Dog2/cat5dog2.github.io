import { test, expect } from '@playwright/test';

/** 主要ページがエラーなく表示されることのスモークテスト */
test.describe('ページ表示', () => {
  const pages = [
    { path: '/', heading: '仕様書から、' },
    { path: '/career/', heading: 'Web集客から制作・システム開発・IT実務へ' },
    { path: '/projects/', heading: '注力プロジェクト' },
    { path: '/projects/pet-health-management/', heading: 'PetHealthManagement' },
  ];

  for (const { path, heading } of pages) {
    test(`${path} が表示され、コンソールエラーがない`, async ({ page }) => {
      const errors: string[] = [];
      page.on('pageerror', (error) => errors.push(error.message));
      page.on('console', (message) => {
        if (message.type() === 'error') errors.push(message.text());
      });

      await page.goto(path);

      await expect(page.locator('h1')).toContainText(heading);
      expect(errors).toEqual([]);
    });
  }
});

test.describe('ナビゲーションの出し分け', () => {
  test('デスクトップではグローバルナビを表示し、モバイルメニューを隠す', async ({ page, isMobile }) => {
    test.skip(isMobile, 'デスクトップ表示専用のテスト');

    await page.goto('/');

    await expect(page.locator('.site-nav')).toBeVisible();
    await expect(page.locator('.mobile-menu')).toBeHidden();
  });

  test('モバイルではグローバルナビを隠し、メニュートグルを表示する', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'モバイル表示専用のテスト');

    await page.goto('/');

    await expect(page.locator('.site-nav')).toBeHidden();
    await expect(page.locator('.mobile-menu summary')).toBeVisible();
  });
});
