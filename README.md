# Cat5Dog2 Portfolio Draft

Astro + Markdown + 自前CSSで作る就活用ポートフォリオの初稿です。

公開URL: `https://cat5dog2.github.io/`

## 起動

```bash
npm install
npm run dev
```

## ビルド

```bash
npm run build
npm run preview
```

## 方針

- `dist/` はGit管理しない
- 実績ページは `src/pages/projects/*.md` で管理
- デザインは `src/styles/global.css` とAstroコンポーネントで管理
- CSSは custom properties + cascade layers + FLOCSS風命名
- GitHub Pagesのユーザーサイトとしてルート直下に公開
- 内部リンクとpublic assetsは`src/utils/paths.ts`でbase pathを付与
