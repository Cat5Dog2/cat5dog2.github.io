import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: 'http://127.0.0.1:4322',
    trace: 'on-first-retry',
  },
  // ビルドは pretest:e2e で実行済みの前提（npm run test:e2e が自動で先にビルドする）。
  // previewはnodeを直接起動する。npm経由のラッパープロセスを挟むと、
  // Windowsでテスト終了時に子プロセスを終了できず孤児化するため。
  // ポートは開発サーバー（4321）と衝突しない専用の4322を使う。
  webServer: {
    command: 'node node_modules/astro/bin/astro.mjs preview --host 127.0.0.1 --port 4322',
    url: 'http://127.0.0.1:4322',
    reuseExistingServer: false,
    timeout: 120_000,
  },
  projects: [
    // モバイルメニューは760px未満でのみ表示されるため、モバイルとデスクトップの両方で検証する
    {
      name: 'mobile-chromium',
      use: { ...devices['Pixel 7'] },
    },
    {
      name: 'desktop-chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
