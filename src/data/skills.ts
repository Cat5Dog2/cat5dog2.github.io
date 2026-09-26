import type { Project } from './projects';

/**
 * 実務で使った技術。経歴ページの記載と本人の確認に基づく。
 * 個人開発だけで使った技術はここへ入れず、personalSkills で作品と結びつける。
 */
export const workSkillGroups: { area: string; skills: string[] }[] = [
  { area: '開発', skills: ['Ruby on Rails', 'PHP', 'JavaScript', 'jQuery', 'HTML/CSS', 'WordPress'] },
  { area: 'DB・インフラ', skills: ['PostgreSQL', 'SQL Server', 'Docker', 'AWS'] },
  { area: '上流工程・推進', skills: ['要件定義', 'DB設計', 'チームリード'] },
];

/** 個人開発で使った技術と、実装を確認できる作品 */
export const personalSkills: { name: string; projects: Project['id'][] }[] = [
  { name: 'C# / ASP.NET Core / EF Core', projects: ['pet-health', 'web-writing', 'seo'] },
  { name: 'Blazor', projects: ['web-writing', 'seo'] },
  { name: 'TypeScript / React / Vite', projects: ['handmade'] },
  { name: 'Azure（App Service / SQL Database / Key Vault）', projects: ['pet-health'] },
  { name: 'Firebase / Cloud Run', projects: ['handmade'] },
  { name: 'PostgreSQL / SQL Server', projects: ['web-writing', 'seo', 'pet-health'] },
  { name: 'Docker', projects: ['web-writing', 'seo', 'handmade'] },
  { name: 'Hangfire / Redis', projects: ['seo'] },
  { name: 'GitHub Actions', projects: ['pet-health', 'web-writing', 'handmade', 'seo'] },
  { name: 'Playwright E2E', projects: ['pet-health', 'web-writing', 'seo'] },
  { name: '仕様駆動開発（要件・設計・テスト仕様の文書化）', projects: ['pet-health', 'web-writing', 'handmade', 'seo'] },
];
