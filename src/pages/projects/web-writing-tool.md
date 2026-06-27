---
layout: ../../layouts/ProjectLayout.astro
title: "Web Writing Tool"
description: "AI記事作成からWordPress投稿までをつなぐ制作支援ツール。今は設計と開発基盤、Blazorの骨格、最小CIまでできています。"
tags: ["Blazor Web App", "ASP.NET Core", "EF Core", "PostgreSQL", "Docker", "Caddy", "Gemini", "WordPress"]
repo: "https://github.com/Cat5Dog2/web-writing-tool"
stage: "実装済み"
highlights:
  - "要件、画面、データ、外部連携、運用を設計書として整理"
  - ".NET SDK開発環境、Solution、Blazor Web App、テスト基盤を構築"
  - "最小CIとDocker Compose + Caddyの配置方針を整備"
evidence:
  - label: "リポジトリ"
    url: "https://github.com/Cat5Dog2/web-writing-tool"
  - label: "CI workflow"
    url: "https://github.com/Cat5Dog2/web-writing-tool/blob/main/.github/workflows/ci.yaml"
  - label: "README・現在の状態"
    url: "https://github.com/Cat5Dog2/web-writing-tool/blob/main/README.md"
---

## 概要

AI記事作成、記事管理、本文生成、WordPress投稿、Discord通知をひとつの流れで扱うWebアプリです。今はP0の開発基盤までを実装し、機能実装は`todo.md`に沿って段階的に進めています。

## ポイント

- SEO・WordPressの実務経験を、現在の.NET開発へ接続している
- Blazor Web App、ASP.NET Core、EF Core、PostgreSQL、BackgroundServiceを使用
- Gemini、検索API、X API、WordPress、Discordなど外部連携を設計済み
- Docker Compose + CaddyによるVPS配置を想定
- Playwright E2E smoke、Production Docker smoke、ヘルスチェックまでCIに含める

## なぜこの技術構成か

- **Blazor Web App**: SEO・CMSの実務で蓄積したドメイン知識を、C#の型安全な環境で形にできる。サーバーサイドレンダリングとインタラクティブモードの使い分けが可能
- **PostgreSQL**: オープンソースで運用コストを抑えつつ、JSON型やフルテキスト検索など柔軟なデータ操作に対応
- **Docker Compose + Caddy**: VPSへの配置を想定し、リバースプロキシ・TLS・ヘルスチェックをコードで管理
- **BackgroundService**: 記事生成やAPI連携を非同期ジョブとして分離し、UIの応答性を確保

## 技術判断

SEO・CMSの実務経験から生まれた要件を、.NETで設計・実装しています。段階的に実装中で、現在のスコープと今後の計画はREADMEに記載しています。

## 今後の計画

- 記事生成フロー図
- WordPress投稿までの画面遷移
- 外部連携アーキテクチャ図
- CI/CDのスクリーンショット
