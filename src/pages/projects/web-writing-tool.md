---
layout: ../../layouts/ProjectLayout.astro
title: "Web Writing Tool"
description: "AI記事作成からWordPress投稿・Discord通知までをつなぐ制作支援ツール。Blazorと.NETでMVPの主要フローを実装しています。"
tags: ["Blazor Web App", "ASP.NET Core", "EF Core", "PostgreSQL", "Docker", "Caddy", "Gemini", "WordPress"]
repo: "https://github.com/Cat5Dog2/web-writing-tool"
stage: "MVP実装済み"
highlights:
  - "要件、画面、データ、外部連携、運用を設計書として整理"
  - "Identity認証、記事管理、AI生成ジョブ、検索連携、WordPress投稿、Discord通知を実装"
  - "GitHub Actionsでビルド、テスト、E2E、Docker smokeを検証"
evidence:
  - label: "リポジトリ"
    url: "https://github.com/Cat5Dog2/web-writing-tool"
  - label: "CI workflow"
    url: "https://github.com/Cat5Dog2/web-writing-tool/blob/main/.github/workflows/ci.yaml"
  - label: "実装バックログ"
    url: "https://github.com/Cat5Dog2/web-writing-tool/blob/main/todo.md"
---

## 概要

AI記事作成、記事管理、本文生成、WordPress投稿、Discord通知をひとつの流れで扱うWebアプリです。Blazorと.NETでMVPの主要フローを実装し、`todo.md`の完了条件に沿って検証しています。

## ポイント

- SEO・WordPressの実務経験を、現在の.NET開発へ接続している
- Blazor Web App、ASP.NET Core、EF Core、PostgreSQL、BackgroundServiceを使用
- Gemini、検索API、X API、WordPress、Discordとの外部連携を実装
- Docker Compose + CaddyによるVPS配置構成をコード化
- Playwright E2E smoke、Production Docker smoke、ヘルスチェックをCIで検証

## なぜこの技術構成か

- **Blazor Web App**: SEO・CMSの実務で蓄積したドメイン知識を、C#の型安全な環境で形にできる。サーバーサイドレンダリングとインタラクティブモードの使い分けが可能
- **PostgreSQL**: オープンソースで運用コストを抑えつつ、JSON型やフルテキスト検索など柔軟なデータ操作に対応
- **Docker Compose + Caddy**: VPSへの配置を想定し、リバースプロキシ・TLS・ヘルスチェックをコードで管理
- **BackgroundService**: 記事生成やAPI連携を非同期ジョブとして分離し、UIの応答性を確保

## 技術判断

SEO・CMSの実務経験から生まれた要件を.NETで設計し、MVPの主要フローまで実装しました。実装範囲と進捗はコードと`todo.md`で管理しています。

## 今後の計画

- 記事生成フロー図
- WordPress投稿までの画面遷移
- 外部連携アーキテクチャ図
- CI/CDのスクリーンショット
