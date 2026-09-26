import { test, expect } from '@playwright/test';

/**
 * 作品の見せ方のテスト。
 * 読み手が作品の画面・用途・デモの入口へ早くたどり着けることと、
 * 作品ページの冒頭の入口や目次が壊れていないことを検証する。
 */
const projectPages = [
  { path: '/projects/pet-health-management/', access: '新規登録で試せる' },
  { path: '/projects/web-writing-tool/', access: 'ゲストで試せる' },
  { path: '/projects/handmade-item-management/', access: 'ゲストで試せる' },
  { path: '/projects/seo-intelligence-platform/', access: 'ゲストで試せる' },
];

test.describe('トップページの制作実績', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('全作品のカードに画面・用途・デモの利用条件・詳細への導線がある', async ({ page }) => {
    const cards = page.locator('#projects .project-card');

    await expect(cards).toHaveCount(projectPages.length);
    for (const card of await cards.all()) {
      await expect(card.locator('.project-thumb')).toBeVisible();
      await expect(card.locator('.project-card__category')).not.toBeEmpty();
      await expect(card.locator('.access-badge')).toHaveText(/で試せる$/);
      await expect(card.getByText('詳細を見る')).toBeVisible();
    }
  });

  test('カードの画面キャプチャを読み込める', async ({ page }) => {
    const images = page.locator('#projects .project-thumb img');

    await expect(images.first()).toBeAttached();
    for (const image of await images.all()) {
      await image.scrollIntoViewIfNeeded();
      await expect.poll(() => image.evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0);
    }
  });

  test('ナビゲーションに同じ内容の作品一覧を重複して載せない', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'All Projects' })).toHaveCount(0);
  });

  test('ページが横にはみ出さない', async ({ page }) => {
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );

    expect(overflow).toBeLessThanOrEqual(0);
  });
});

test.describe('作品ページの冒頭', () => {
  for (const { path, access } of projectPages) {
    test(`${path} はデモの入口と利用条件を最初の画面に表示する`, async ({ page }) => {
      await page.goto(path);

      const demoLink = page.getByRole('link', { name: 'デモを試す' });
      await expect(demoLink).toBeInViewport();
      await expect(demoLink).toHaveAttribute('href', /^https:\/\//);
      await expect(demoLink).toHaveAttribute('target', '_blank');
      await expect(demoLink).toHaveAttribute('rel', /noreferrer/);

      await expect(page.locator('.project-hero .access-badge')).toHaveText(access);
      await expect(page.getByRole('link', { name: 'GitHub', exact: true }).first()).toBeVisible();
      await expect(page.getByRole('link', { name: '設計資料' })).toBeVisible();
    });

    test(`${path} の目次は本文の見出しへ移動できる`, async ({ page }) => {
      await page.goto(path);

      const toc = page.locator('.project-toc');
      await toc.locator('summary').click();

      const links = toc.getByRole('link');
      await expect(links.first()).toBeVisible();

      const targets = await links.evaluateAll((anchors) =>
        anchors.map((anchor) => decodeURIComponent(anchor.getAttribute('href')!.slice(1))),
      );
      for (const id of targets) {
        await expect(page.locator(`[id="${id}"]`)).toHaveCount(1);
      }

      await links.last().click();
      await expect(page.locator(`[id="${targets.at(-1)}"]`)).toBeInViewport();
    });
  }
});
