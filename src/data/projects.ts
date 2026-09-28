import type { ImageMetadata } from 'astro';

import petHealthRecordMenu from '../assets/portfolio/pethealth/record-menu.png';
import petHealthHealthLogList from '../assets/portfolio/pethealth/health-log-list.png';
import handmadeDashboard from '../assets/portfolio/handmade/dashboard.png';
import handmadeQrScanSuccess from '../assets/portfolio/handmade/qr-scan-success.png';
import webWritingArticleList from '../assets/portfolio/webwriting/article-list.png';
import seoDashboard from '../assets/portfolio/seo/dashboard.png';

/** デモの入口。ボタン付近とカードに、試す前に必要な手間を明示する */
export type DemoAccess = 'guest' | 'signup';

export const demoAccessLabels: Record<DemoAccess, string> = {
  guest: 'ゲストで試せる',
  signup: '新規登録で試せる',
};

/**
 * カードに載せる画面。
 * スマホ画面（縦長）とPC画面（横長）は比率が異なるため、端末の枠ごとに描き分ける。
 */
export type ProjectPreview =
  | { kind: 'mobile'; images: [ImageMetadata, ImageMetadata] }
  | { kind: 'desktop'; image: ImageMetadata };

export type Project = {
  /** スキル欄など、ほかのデータから作品を参照するための識別子 */
  id: 'pet-health' | 'web-writing' | 'handmade' | 'seo';
  title: string;
  /** リンクなど幅が限られる場所で使う短い名前 */
  shortTitle: string;
  slug: string;
  /** 何のためのアプリかを日本語で一言。英語の作品名より先に読ませる */
  category: string;
  summary: string;
  role: string;
  stage: string;
  stack: string[];
  repo: string;
  docs: string;
  demo: {
    url: string;
    access: DemoAccess;
    /** 利用条件の補足。デモボタンの直下に表示する */
    note: string;
  };
  preview: ProjectPreview;
};

export const projects: Project[] = [
  {
    id: 'pet-health',
    title: 'PetHealthManagement',
    shortTitle: 'PetHealth',
    slug: 'projects/pet-health-management/',
    category: 'ペットの健康記録・通院管理',
    summary: 'ペットの健康記録や通院履歴を管理するWebアプリ。認証・画像保存・Azure運用設計・E2Eテストまで含めて開発しています。',
    role: '設計 / 実装 / CI/CD / 運用設計',
    stage: 'Azure環境で公開中',
    stack: ['ASP.NET Core MVC', 'Identity', 'EF Core', 'SQL Server', 'Azure', 'Playwright'],
    repo: 'https://github.com/Cat5Dog2/PetHealthManagement',
    docs: 'https://github.com/Cat5Dog2/PetHealthManagement/tree/main/docs',
    demo: {
      url: 'https://app-pethealth-prod-dkedakd8c0g2hza2.japanwest-01.azurewebsites.net/',
      access: 'signup',
      note: 'メールアドレスとパスワードで新規登録すると、確認メールなしですぐに使えます。初回アクセス時は表示まで時間がかかる場合があります。登録ユーザーと保存データは定期的に削除します。',
    },
    preview: { kind: 'mobile', images: [petHealthRecordMenu, petHealthHealthLogList] },
  },
  {
    id: 'web-writing',
    title: 'Web Writing Tool',
    shortTitle: 'Web Writing Tool',
    slug: 'projects/web-writing-tool/',
    category: 'AI記事作成・WordPress投稿の支援',
    summary: 'AI記事作成からWordPress投稿・Discord通知までをつなぐ制作支援ツール。Blazorと.NETで実装し、VPS上の本番環境で公開しています。',
    role: '要件整理 / 設計 / 開発基盤 / CI/CD / 本番デプロイ',
    stage: 'VPS環境で公開中',
    stack: ['Blazor Web App', 'ASP.NET Core', 'EF Core', 'PostgreSQL', 'Docker', 'Caddy'],
    repo: 'https://github.com/Cat5Dog2/web-writing-tool',
    docs: 'https://github.com/Cat5Dog2/web-writing-tool/tree/main/docs',
    demo: {
      url: 'https://web-writing.cloud/login',
      access: 'guest',
      note: 'ログイン画面の「ゲストとして試す」から登録不要で使えます。生成・検索結果はサンプル応答で、外部APIへは接続しません。ゲストのデータは利用開始から8時間後に自動削除されます。',
    },
    preview: { kind: 'desktop', image: webWritingArticleList },
  },
  {
    id: 'handmade',
    title: 'Handmade Item Management',
    shortTitle: 'Handmade',
    slug: 'projects/handmade-item-management/',
    category: 'ハンドメイド作品の在庫・販売管理',
    summary: 'ハンドメイド作家向けの在庫・販売管理アプリ。QRコードで商品を識別し、販売状況・顧客別の購入履歴・ダッシュボードを確認できます。',
    role: 'プロダクト設計 / フロントエンド / API / Firebase設計',
    stage: 'Firebase / GCP環境で公開中',
    stack: ['React', 'TypeScript', 'Vite', 'Express', 'Firebase', 'PWA'],
    repo: 'https://github.com/Cat5Dog2/Handmade_Item_Management',
    docs: 'https://github.com/Cat5Dog2/Handmade_Item_Management/tree/main/docs',
    demo: {
      url: 'https://fir-handmade-item-management.web.app/login',
      access: 'guest',
      note: 'ログイン画面の「ゲストとして試す」から登録不要で使えます。データは定期的にリセットします。',
    },
    preview: { kind: 'mobile', images: [handmadeDashboard, handmadeQrScanSuccess] },
  },
  {
    id: 'seo',
    title: 'SEO Intelligence Platform',
    shortTitle: 'SEO Intelligence',
    slug: 'projects/seo-intelligence-platform/',
    category: 'SEOのキーワード調査・分析',
    summary: 'キーワード調査、競合・コンテンツ分析、順位監視、レポートをまとめるSEO分析基盤。Web・API・Workerの3プロセスを.NET 10で実装し、VPS上で公開しています。',
    role: '要件定義 / ドメイン設計 / アーキテクチャ設計 / CI/CD',
    stage: 'VPS環境で公開中',
    stack: ['.NET 10', 'Blazor', 'Hangfire', 'PostgreSQL', 'Redis', 'Docker'],
    repo: 'https://github.com/Cat5Dog2/seo-intelligence-platform',
    docs: 'https://github.com/Cat5Dog2/seo-intelligence-platform/tree/main/docs',
    demo: {
      url: 'https://seo-intelligence.cloud/login',
      access: 'guest',
      note: 'ログイン画面の「登録不要でデモを試す」から使えます。デモはサンプルデータで動作し、外部APIへの接続やクレジットの消費はありません。セッションは1時間で終了します。',
    },
    preview: { kind: 'desktop', image: seoDashboard },
  },
];

export function findProject(id: Project['id']): Project {
  const project = projects.find((item) => item.id === id);
  if (!project) {
    throw new Error(`作品データ ${id} が見つかりません`);
  }
  return project;
}
