# Cat5Dog2 Portfolio

.NET・TypeScript・Azureで設計からCI/CDまで一貫した開発を実践するWebエンジニアのポートフォリオサイトです。このリポジトリ自体を「コード品質のサンプル」として位置づけ、CSS設計・アクセシビリティ・パフォーマンス・SEOまで含めて管理しています。

公開URL: https://cat5dog2.github.io/

## 技術スタック

- **Astro** — 静的サイト生成。JavaScriptバンドルは0KB（モバイルメニュー補助の軽量インラインJSのみ）
- **MDX** — プロジェクト詳細ページのコンテンツ管理
- **自前CSS** — フレームワーク不使用。Cascade Layers + Custom Properties + FLOCSS風命名
- **GitHub Actions** — `astro check` + ビルドを検証し、GitHub Pagesへ自動デプロイ

## 設計方針

### CSS

- `@layer reset, tokens, base, layout, components, pages, utilities` で詳細度に依存しないカスケード設計
- 色・タイポグラフィ・余白・角丸などの主要な値を `tokens` レイヤーのCustom Propertiesで管理
- Webフォントを使わずシステムフォントスタックで高速表示

### アクセシビリティ

- セマンティックHTMLと適切なランドマーク・見出し階層
- スキップリンク、`:focus-visible` によるフォーカスインジケーター
- `prefers-reduced-motion` を尊重したスクロール挙動
- `details`/`summary` ベースのモバイルメニュー（JS無効でも開閉可能。リンク選択・Escape・メニュー外操作で閉じる挙動をインラインJSで補助）

### SEO / メタデータ

- サイトマップ自動生成（`@astrojs/sitemap`）+ `robots.txt`
- JSON-LD構造化データ（`WebSite` / `Person` / 下層ページの`BreadcrumbList`）
- OGP・Twitter Card・canonical URLを全ページで出力

### パフォーマンス

- 画像は `astro:assets` でWebPへ自動変換・遅延読み込み
- JavaScriptバンドルなしの完全静的配信

## ディレクトリ構成

```
src/
├── assets/      # プロジェクトのスクリーンショット（ビルド時に最適化）
├── components/  # Astroコンポーネント（Header, ProjectCard, Mockupなど）
├── data/        # プロジェクト一覧などの構造化データ
├── layouts/     # BaseLayout（メタデータ・JSON-LD）/ ProjectLayout
├── pages/       # ルーティング。実績詳細は projects/*.mdx
├── styles/      # global.css（Cascade Layers）
└── utils/       # base path解決などのユーティリティ
```

## 開発

```bash
npm install
npm run dev      # 開発サーバー（localhost:4321）
npm run check    # 型・構文チェック
npm run build    # 本番ビルド
npm run preview  # ビルド結果の確認
```

## デプロイ

`main` ブランチへのpushで GitHub Actions が起動し、`astro check` とビルドを実行してGitHub Pagesへデプロイします。`dist/` はGit管理しません。

## 運用ルール

- 変更はフィーチャーブランチ + Pull Requestで管理
- 実績ページは `src/pages/projects/*.mdx` で追加・更新
- 内部リンクとpublic assetsは `src/utils/paths.ts` の `withBase()` でbase pathを付与
