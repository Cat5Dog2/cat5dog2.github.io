import { test, expect } from '@playwright/test';

/**
 * モバイルメニューの開閉挙動のテスト。
 * details/summary のネイティブな開閉に加え、インラインJSで補っている
 * 「リンク選択・Escape・フォーカスアウト・メニュー外クリックで閉じる」を検証する。
 */
test.describe('モバイルメニュー', () => {
  test.skip(({ isMobile }) => !isMobile, 'モバイル表示専用のテスト');

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('初期状態では閉じており、ナビリンクは操作できない', async ({ page }) => {
    await expect(page.locator('.mobile-menu summary')).toBeVisible();
    await expect(page.locator('.mobile-menu__nav')).toBeHidden();
  });

  test('トグルで開閉できる', async ({ page }) => {
    const summary = page.locator('.mobile-menu summary');
    const nav = page.locator('.mobile-menu__nav');

    await summary.click();
    await expect(nav).toBeVisible();

    await summary.click();
    await expect(nav).toBeHidden();
  });

  test('同一ページ内リンクを選ぶと閉じて対象セクションへ移動する', async ({ page }) => {
    await page.locator('.mobile-menu summary').click();
    await page.locator('.mobile-menu__nav').getByRole('link', { name: 'Projects', exact: true }).click();

    await expect(page).toHaveURL(/#projects$/);
    await expect(page.locator('.mobile-menu__nav')).toBeHidden();
    await expect(page.locator('#projects')).toBeInViewport();
  });

  test('開閉してもブラウザ履歴とURLが汚れない', async ({ page }) => {
    const historyBefore = await page.evaluate(() => history.length);

    await page.locator('.mobile-menu summary').click();
    await expect(page.locator('.mobile-menu__nav')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.locator('.mobile-menu__nav')).toBeHidden();

    const historyAfter = await page.evaluate(() => history.length);
    expect(historyAfter).toBe(historyBefore);
    expect(new URL(page.url()).hash).toBe('');
  });

  test('メニュー経由の遷移後に「戻る」してもメニューは再表示されない', async ({ page }) => {
    await page.locator('.mobile-menu summary').click();
    await page.locator('.mobile-menu__nav').getByRole('link', { name: 'Projects', exact: true }).click();
    await expect(page).toHaveURL(/#projects$/);

    await page.goBack();

    await expect(page).toHaveURL((url) => url.hash === '');
    await expect(page.locator('.mobile-menu__nav')).toBeHidden();
  });

  test('Escapeで閉じてフォーカスがトグルへ戻る', async ({ page }) => {
    const summary = page.locator('.mobile-menu summary');

    await summary.click();
    await page.keyboard.press('Tab'); // メニュー内の最初のリンクへ
    await expect(page.locator('.mobile-menu__nav a').first()).toBeFocused();

    await page.keyboard.press('Escape');

    await expect(page.locator('.mobile-menu__nav')).toBeHidden();
    await expect(summary).toBeFocused();
  });

  test('Tabでメニュー外へフォーカスが出ると閉じる', async ({ page }) => {
    await page.locator('.mobile-menu summary').click();

    const lastLink = page.locator('.mobile-menu__nav a').last();
    await lastLink.focus();
    await expect(lastLink).toBeFocused();

    await page.keyboard.press('Tab'); // メニューの外の要素へ

    await expect(page.locator('.mobile-menu__nav')).toBeHidden();
  });

  test('メニュー外のタップで閉じる', async ({ page }) => {
    await page.locator('.mobile-menu summary').click();
    await expect(page.locator('.mobile-menu__nav')).toBeVisible();

    // 開いたドロップダウンは右上を覆うため、確実にメニュー外となる左下側を選ぶ
    await page.locator('body').click({ position: { x: 10, y: 500 } });

    await expect(page.locator('.mobile-menu__nav')).toBeHidden();
  });

  test('別タブで開くリンク（GitHub）を選んでも閉じる', async ({ page, context }) => {
    // 外部サイトへは接続しない
    await context.route('https://github.com/**', (route) => route.abort());

    await page.locator('.mobile-menu summary').click();

    const pagePromise = context.waitForEvent('page');
    await page.locator('.mobile-menu__nav a[target="_blank"]').click();
    const newTab = await pagePromise;
    await newTab.close();

    await expect(page.locator('.mobile-menu__nav')).toBeHidden();
  });
});
