import { test, expect, type Locator, type Page } from '@playwright/test';

/**
 * Web Writing Toolの画面プレビュー（PCモニター型のモックアップ）のテスト。
 * JavaScriptを使わず、ラジオボタンと :has() だけで表示を切り替えているため、
 * CSSの変更で切り替えが壊れていないかを検証する。
 */
test.describe('Web Writing Toolの画面プレビュー', () => {
  const tabNames = ['記事一覧', '記事作成', '構成・本文編集', 'プレビュー', '一括作成', '一括生成の状況'];

  const tabList = (page: Page) => page.getByRole('radiogroup', { name: '機能一覧' });

  // 非表示の画面はアクセシビリティツリーから外れるため、表示中の1画面だけに一致する
  const visibleScreen = (page: Page) => page.getByRole('region', { name: '選択した画面のプレビュー' });

  const scrollTopOf = (screen: Locator) => screen.evaluate((element) => element.scrollTop);

  // ラジオボタン本体は視覚的に隠しているため、利用者と同じくラベルをクリックして切り替える
  const selectTab = async (page: Page, name: string) => {
    await tabList(page).getByText(name, { exact: true }).click();
    await expect(tabList(page).getByRole('radio', { name })).toBeChecked();
  };

  // 画像は遅延読み込みのため、表示後に読み込みが完了して実寸を持つまで待つ
  const expectImageLoaded = async (screen: Locator) => {
    const image = screen.getByRole('img');
    await expect(image).toBeVisible();
    await expect.poll(() => image.evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0);
  };

  // キーボード利用者と同じく画面にフォーカスしてスクロールし、モニター内の位置が動くことを確認する
  const scrollDownWithKeyboard = async (page: Page, screen: Locator) => {
    await screen.focus();
    await page.keyboard.press('PageDown');
    await expect.poll(() => scrollTopOf(screen)).toBeGreaterThan(0);
  };

  test.beforeEach(async ({ page }) => {
    await page.goto('/projects/web-writing-tool/');
  });

  test('初期状態では記事一覧を表示し、タブで画面を切り替えられる', async ({ page }) => {
    const listImage = page.getByRole('img', { name: /記事一覧画面/ });
    const previewImage = page.getByRole('img', { name: /記事プレビュー画面/ });

    await expect(tabList(page).getByRole('radio', { name: '記事一覧' })).toBeChecked();
    await expect(listImage).toBeVisible();
    await expect(previewImage).toBeHidden();

    await selectTab(page, 'プレビュー');

    await expect(previewImage).toBeVisible();
    await expect(listImage).toBeHidden();
  });

  test('全画面のスクリーンショットを読み込める', async ({ page }) => {
    for (const name of tabNames) {
      await selectTab(page, name);
      await expectImageLoaded(visibleScreen(page));
    }
  });

  test('画面より縦に長いスクリーンショットだけスクロール案内を表示する', async ({ page }) => {
    const scrollHint = page.getByText('↓ Scroll ↓');

    await expect(scrollHint).toBeHidden();

    await selectTab(page, '記事作成');

    await expect(scrollHint).toBeVisible();
  });

  test('縦に長い画面はモニター内をキーボードでスクロールできる', async ({ page }) => {
    await selectTab(page, 'プレビュー');
    const screen = visibleScreen(page);
    await expectImageLoaded(screen);

    await scrollDownWithKeyboard(page, screen);
  });

  test('スクロール位置を切り替え先の画面へ引き継がない', async ({ page }) => {
    await selectTab(page, 'プレビュー');
    await expectImageLoaded(visibleScreen(page));
    await scrollDownWithKeyboard(page, visibleScreen(page));

    await selectTab(page, '記事作成');
    const createScreen = visibleScreen(page);
    await expectImageLoaded(createScreen);

    // 切り替え先もスクロールできる高さがあるため、スクロール領域を共有していると位置が引き継がれる
    expect(await createScreen.evaluate((element) => element.scrollHeight > element.clientHeight)).toBe(true);
    expect(await scrollTopOf(createScreen)).toBe(0);
  });

  test('モニター枠がページの横スクロールを発生させない', async ({ page }) => {
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );

    expect(overflow).toBeLessThanOrEqual(0);
  });
});
