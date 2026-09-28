import { test, expect, type Locator, type Page } from '@playwright/test';

/**
 * PC向けアプリの画面プレビュー（PCモニター型のモックアップ）のテスト。
 * JavaScriptを使わず、ラジオボタンと :has() だけで表示を切り替えているため、
 * CSSの変更で切り替えが壊れていないかを、プレビューを載せた作品ごとに検証する。
 */
const previews = [
  {
    project: 'Web Writing Tool',
    path: '/projects/web-writing-tool/',
    tabs: ['記事一覧', '記事作成', '構成・本文編集', 'プレビュー', '一括作成', '一括生成の状況'],
    firstImage: /記事一覧画面/,
    switchTo: { tab: 'プレビュー', image: /記事プレビュー画面/ },
    // モニターの表示領域に収まる画面と、縦に長くモニター内をスクロールできる画面
    fitsScreen: '記事一覧',
    tallScreens: ['プレビュー', '記事作成'],
  },
  {
    project: 'SEO Intelligence Platform',
    path: '/projects/seo-intelligence-platform/',
    tabs: ['ダッシュボード', 'キーワード探索', '検索ボリューム', 'トピッククラスター', 'リライト管理', '順位監視'],
    firstImage: /ダッシュボード画面/,
    switchTo: { tab: '順位監視', image: /順位監視画面/ },
    fitsScreen: 'トピッククラスター',
    tallScreens: ['ダッシュボード', '検索ボリューム'],
  },
];

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

for (const { project, path, tabs, firstImage, switchTo, fitsScreen, tallScreens } of previews) {
  test.describe(`${project}の画面プレビュー`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(path);
    });

    test('初期状態では先頭の画面を表示し、タブで画面を切り替えられる', async ({ page }) => {
      const initialImage = page.getByRole('img', { name: firstImage });
      const switchedImage = page.getByRole('img', { name: switchTo.image });

      await expect(tabList(page).getByRole('radio', { name: tabs[0] })).toBeChecked();
      await expect(initialImage).toBeVisible();
      await expect(switchedImage).toBeHidden();

      await selectTab(page, switchTo.tab);

      await expect(switchedImage).toBeVisible();
      await expect(initialImage).toBeHidden();
    });

    test('全画面のスクリーンショットを読み込める', async ({ page }) => {
      for (const name of tabs) {
        await selectTab(page, name);
        await expectImageLoaded(visibleScreen(page));
      }
    });

    test('画面より縦に長いスクリーンショットだけスクロール案内を表示する', async ({ page }) => {
      const scrollHint = page.getByText('↓ Scroll ↓');

      await selectTab(page, fitsScreen);
      await expect(scrollHint).toBeHidden();

      await selectTab(page, tallScreens[0]);
      await expect(scrollHint).toBeVisible();
    });

    test('縦に長い画面はモニター内をキーボードでスクロールできる', async ({ page }) => {
      await selectTab(page, tallScreens[0]);
      const screen = visibleScreen(page);
      await expectImageLoaded(screen);

      await scrollDownWithKeyboard(page, screen);
    });

    test('スクロール位置を切り替え先の画面へ引き継がない', async ({ page }) => {
      await selectTab(page, tallScreens[0]);
      await expectImageLoaded(visibleScreen(page));
      await scrollDownWithKeyboard(page, visibleScreen(page));

      await selectTab(page, tallScreens[1]);
      const nextScreen = visibleScreen(page);
      await expectImageLoaded(nextScreen);

      // 切り替え先もスクロールできる高さがあるため、スクロール領域を共有していると位置が引き継がれる
      expect(await nextScreen.evaluate((element) => element.scrollHeight > element.clientHeight)).toBe(true);
      expect(await scrollTopOf(nextScreen)).toBe(0);
    });

    test('モニター枠がページの横スクロールを発生させない', async ({ page }) => {
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );

      expect(overflow).toBeLessThanOrEqual(0);
    });
  });
}
