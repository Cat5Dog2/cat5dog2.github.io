export type Project = {
  title: string;
  slug: string;
  summary: string;
  role: string;
  stage: string;
  featuredRank?: 1 | 2;
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
    stage: 'Azure環境で公開中',
    featuredRank: 1,
    stack: ['ASP.NET Core MVC', 'Identity', 'EF Core', 'SQL Server', 'Azure', 'Playwright'],
    metrics: ['Azure運用設計', 'Playwright E2E', 'CI/CD'],
    repo: 'https://github.com/Cat5Dog2/PetHealthManagement',
    status: '公開デモ利用可',
  },
  {
    title: 'Handmade Item Management',
    slug: 'projects/handmade-item-management/',
    summary: 'ハンドメイド作家向けの在庫・販売管理アプリ。QRコードで商品を識別して、販売状況・顧客別の購入履歴・ダッシュボードを見られます。',
    role: 'プロダクト設計 / フロントエンド / API / Firebase設計',
    stage: 'Firebase / GCP環境で公開中',
    featuredRank: 2,
    stack: ['React', 'TypeScript', 'Vite', 'Express', 'Firebase', 'PWA'],
    metrics: ['QR販売フロー', 'PWA', 'モバイルファースト'],
    repo: 'https://github.com/Cat5Dog2/Handmade_Item_Management',
    status: '公開デモ利用可',
  },
  {
    title: 'Web Writing Tool',
    slug: 'projects/web-writing-tool/',
    summary: 'AI記事作成からWordPress投稿・Discord通知までをつなぐ制作支援ツール。Blazorと.NETでMVPの主要フローを実装しています。',
    role: '要件整理 / 設計 / 開発基盤 / CI',
    stage: 'MVP実装済み',
    stack: ['Blazor Web App', 'ASP.NET Core', 'EF Core', 'PostgreSQL', 'Docker', 'Caddy'],
    metrics: ['AI連携', 'WordPress連携', 'Dockerスモークテスト'],
    repo: 'https://github.com/Cat5Dog2/web-writing-tool',
    status: 'ソースコード公開',
  },
  {
    title: 'SEO Intelligence Platform',
    slug: 'projects/seo-intelligence-platform/',
    summary: 'キーワード探索・検索ボリューム調査・機会スコア・CSV出力を扱うSEO分析基盤。.NETのClean ArchitectureでMVPを実装しています。',
    role: '要件定義 / ドメイン設計 / アーキテクチャ設計',
    stage: 'MVP実装済み',
    stack: ['.NET', 'Blazor', 'Hangfire', 'PostgreSQL', 'Redis', 'OpenTelemetry'],
    metrics: ['SEO分析', '非同期ジョブ', 'Clean Architecture'],
    repo: 'https://github.com/Cat5Dog2/seo-intelligence-platform',
    status: 'ソースコード公開',
  },
];
