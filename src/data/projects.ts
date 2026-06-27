export type Project = {
  title: string;
  slug: string;
  summary: string;
  role: string;
  stage: string;
  stack: string[];
  metrics: string[];
  repo: string;
  status: string;
};

export const projects: Project[] = [
  {
    title: 'PetHealthManagement',
    slug: 'projects/pet-health-management/',
    summary: 'ペットの健康記録や通院履歴を管理するWebアプリ。認証・画像保存・Azure運用設計・E2Eテストまで含めて作っています。',
    role: '設計 / 実装 / CI / 運用設計',
    stage: 'デプロイ済み',
    stack: ['ASP.NET Core MVC', 'Identity', 'EF Core', 'SQL Server', 'Azure', 'Playwright'],
    metrics: ['Azure設計', 'E2E', 'CI'],
    repo: 'https://github.com/Cat5Dog2/PetHealthManagement',
    status: 'デプロイ済み',
  },
  {
    title: 'Web Writing Tool',
    slug: 'projects/web-writing-tool/',
    summary: 'AI記事作成からWordPress投稿までをつなぐ制作支援ツール。今は設計と開発基盤、Blazorの骨格、最小CIまでできています。',
    role: '要件整理 / 設計 / 開発基盤 / CI',
    stage: '実装済み',
    stack: ['Blazor Web App', 'ASP.NET Core', 'EF Core', 'PostgreSQL', 'Docker', 'Caddy'],
    metrics: ['AI連携', 'WordPress連携', 'Docker smoke'],
    repo: 'https://github.com/Cat5Dog2/web-writing-tool',
    status: '実装済み',
  },
  {
    title: 'Handmade Item Management',
    slug: 'projects/handmade-item-management/',
    summary: 'ハンドメイド作家向けの在庫・販売管理アプリ。QRコードで商品を識別して、販売状況・顧客別の購入履歴・ダッシュボードを見られます。',
    role: 'プロダクト設計 / フロントエンド / API / Firebase設計',
    stage: 'デプロイ済み',
    stack: ['React', 'TypeScript', 'Vite', 'Express', 'Firebase', 'PWA'],
    metrics: ['QR管理', 'PWA', 'モバイルファースト'],
    repo: 'https://github.com/Cat5Dog2/Handmade_Item_Management',
    status: 'デプロイ済み',
  },
  {
    title: 'SEO Intelligence Platform',
    slug: 'projects/seo-intelligence-platform/',
    summary: 'キーワード調査と順位監視を一つにまとめるSEO分析基盤。設計ドキュメントとバックログを整備し、Clean Architectureの骨格まで作りました。',
    role: '要件定義 / ドメイン設計 / アーキテクチャ設計',
    stage: '実装済み',
    stack: ['.NET', 'Blazor', 'Hangfire', 'PostgreSQL', 'Redis', 'OpenTelemetry'],
    metrics: ['SEO分析', '非同期ジョブ', 'Clean Architecture'],
    repo: 'https://github.com/Cat5Dog2/seo-intelligence-platform',
    status: '実装済み',
  },
];
