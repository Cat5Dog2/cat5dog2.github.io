---
layout: ../../layouts/ProjectLayout.astro
title: "PetHealthManagement"
description: "ペットの健康記録や通院履歴を管理するWebアプリ。認証・画像保存・Azure運用設計・E2Eテストまで含めて作っています。"
tags: ["ASP.NET Core MVC", "Identity", "EF Core", "SQL Server", "Azure", "Playwright", "GitHub Actions"]
repo: "https://github.com/Cat5Dog2/PetHealthManagement"
stage: "デプロイ済み"
highlights:
  - "認証、健康ログ、予定、通院履歴、画像保存を含むWebアプリ"
  - "ビルド、テスト、フォーマット、Playwright E2EをGitHub Actionsで検証"
  - "Azure App Service、Azure SQL、Key Vault、ロールバックまで運用設計"
evidence:
  - label: "リポジトリ"
    url: "https://github.com/Cat5Dog2/PetHealthManagement"
  - label: "CI workflow"
    url: "https://github.com/Cat5Dog2/PetHealthManagement/blob/main/.github/workflows/ci.yml"
  - label: "README・運用設計"
    url: "https://github.com/Cat5Dog2/PetHealthManagement/blob/main/README.md"
---

## 概要

ペットの健康記録、予定、通院履歴をまとめて管理できるWebアプリです。ASP.NET Core MVC、Identity、EF Core、SQL Serverを中心に作っています。

## ポイント

- 認証、健康ログ、予定、通院履歴、画像保存を含むWebアプリとして設計
- Azure App Service、Azure SQL Database、Key Vault、DataProtectionを含めた本番運用方針
- GitHub Actionsでビルド、テスト、Playwright E2E、フォーマットチェックを実行
- 個人開発でも運用・セキュリティ・コストを意識しています

## なぜこの技術構成か

- **ASP.NET Core MVC**: 型安全なサーバーサイドで認証・認可を堅牢に実装できる。Identityとの統合で、セッション管理・パスワードハッシュ・CSRF対策を一貫して扱える
- **Azure App Service + SQL Database**: 個人開発でもコスト管理しやすく、Key VaultやManaged Identityで本番水準のセキュリティを実現できる
- **Playwright E2E**: 手動テストの限界を個人開発でも超えるため導入。CIに組み込むことでリグレッションを防止
- **GitHub Actions**: プッシュごとにビルド・テスト・フォーマットを検証し、品質を自動で担保

## 技術判断

単純なCRUDに留めず、fail fastな設定検証・機密情報管理・DataProtectionキーの永続化・Migrationのロールバック手順まで設計・実装しました。個人開発でも本番運用を前提に判断しています。

## 今後の計画

- 主要画面のスクリーンショット
- Azure構成図
- E2Eテストの実行画面
- デモユーザーで触れる公開環境
