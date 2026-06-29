---
layout: ../../layouts/ProjectLayout.astro
title: "PetHealthManagement"
description: "ペットの健康記録や通院履歴を管理するWebアプリ。認証・画像保存・Azure運用設計・E2Eテストまで含めて作っています。"
tags: ["ASP.NET Core MVC", "Identity", "EF Core", "SQL Server", "Azure", "Playwright", "GitHub Actions"]
repo: "https://github.com/Cat5Dog2/PetHealthManagement"
stage: "Azure環境で動作確認済み"
featuredRank: 1
facts:
  - label: "位置づけ"
    value: "主力プロジェクト 01"
  - label: "動作確認"
    value: "Azure App Service / Azure SQL Database"
  - label: "担当範囲"
    value: "要件整理・設計・実装・テスト・CI/CD・運用設計"
  - label: "公開状況"
    value: "アプリ環境は非公開 / ソースコードは公開"
highlights:
  - "認証、健康ログ、予定、通院履歴、画像保存を一つのWebアプリで管理"
  - "Azure App Service、Azure SQL、Key Vaultを使う構成で動作確認"
  - "ビルド、テスト、フォーマット、Playwright E2E、デプロイ後smokeを自動検証"
  - "Migration、機密情報、Data Protection、ロールバックまで運用手順を設計"
evidence:
  - label: "GitHubリポジトリ"
    url: "https://github.com/Cat5Dog2/PetHealthManagement"
  - label: "CIワークフロー"
    url: "https://github.com/Cat5Dog2/PetHealthManagement/blob/main/.github/workflows/ci.yml"
  - label: "README・詳細な運用設計"
    url: "https://github.com/Cat5Dog2/PetHealthManagement/blob/main/README.md"
---

## 概要

ペットの健康記録、予定、通院履歴をまとめて管理できるWebアプリです。飼い主が日々の変化と通院時の情報を一か所で確認できることを目的に、ASP.NET Core MVC、Identity、EF Core、SQL Serverで実装しました。

主力プロジェクトとして、画面機能だけでなく、認証・画像保存・自動テスト・Azure配置・機密情報管理・障害時の復旧までを一つの開発範囲として扱っています。

## 解決したい課題

- 体重や体調などの日々の記録が分散し、変化を追いにくい
- 通院予定、診療内容、処方などを時系列で振り返りにくい
- ペットごとの画像と健康情報を安全に管理する必要がある
- 個人開発でも、デプロイ後の不具合や設定漏れを検知できる仕組みが必要

## 実装した機能

- ASP.NET Core Identityによるログイン、認証、認可
- ペット情報、健康ログ、予定、通院履歴の登録・更新・参照
- ペットに紐づく画像のアップロード、取得、削除
- 管理者ユーザーの開発環境限定セットアップ
- 入力値と環境設定の検証、Productionでの不正設定を起動時に検知

## システム構成

<div class="project-flow" role="list" aria-label="PetHealthManagementのシステム構成">
  <div class="project-flow__node" role="listitem">
    <strong>利用者</strong>
    <span>ブラウザからHTTPSでアクセス</span>
  </div>
  <span class="project-flow__arrow" aria-hidden="true">→</span>
  <div class="project-flow__node" role="listitem">
    <strong>Azure App Service</strong>
    <span>ASP.NET Core MVC / Identity / 画像処理</span>
  </div>
  <span class="project-flow__arrow" aria-hidden="true">→</span>
  <div class="project-flow__node" role="listitem">
    <strong>Azureデータ基盤</strong>
    <span>Azure SQL / Blob Storage / Key Vault</span>
  </div>
</div>

- **Azure SQL Database**: ペット、健康ログ、予定、通院履歴、認証情報を永続化
- **Key Vault + Managed Identity**: 接続文字列などの機密情報をアプリへ直接埋め込まずに参照
- **Blob Storage + Key Vault key**: Data Protectionキーを永続化・暗号化し、再デプロイ後も認証状態を安全に扱う
- **App Service永続領域**: 現在の画像保存先。将来は`IImageStorageService`の実装差し替えでBlobへ移行できる設計

## なぜこの技術構成か

- **ASP.NET Core MVC**: 型安全なサーバーサイドで認証・認可を堅牢に実装できる。Identityとの統合で、セッション管理・パスワードハッシュ・CSRF対策を一貫して扱える
- **Azure App Service + SQL Database**: 個人開発でもコスト管理しやすく、Key VaultやManaged Identityで本番水準のセキュリティを実現できる
- **Playwright E2E**: 手動テストの限界を個人開発でも超えるため導入。CIに組み込むことでリグレッションを防止
- **GitHub Actions**: プッシュごとにビルド・テスト・フォーマットを検証し、品質を自動で担保

## 技術判断

単純なCRUDに留めず、fail fastな設定検証・機密情報管理・Data Protectionキーの永続化・Migrationの適用手順まで設計しました。本番Migrationはアプリ起動時に自動実行せず、レビュー後に一度だけ適用する方式です。

また、障害時は安易なDown Migrationではなく、既知の正常バージョンの再デプロイと、必要に応じたDBバックアップからの復元を基本方針にしています。

## 品質保証とデプロイ

- GitHub Actionsでビルド、テスト、フォーマットチェックを実行
- Playwrightでログインなどの主要導線をE2E検証
- Azureへのデプロイ後にログイン・一覧表示・画像取得のsmokeテストを実行
- Azureへの認証にはOIDCを使用し、長期間有効なデプロイ用シークレットを持たない
- Migrationとアプリデプロイを分離し、適用順序とロールバック条件を明文化

## 動作確認・公開状況

Azure App ServiceとAzure SQL Databaseを使う環境で、デプロイと主要機能の動作を確認済みです。現在、アプリ環境は認証情報・保存データ・運用コストを考慮して一般公開していません。

## 今後の改善

- 実画面のスクリーンショットと主要操作の短いデモ動画を追加
- Azureリソースの監視結果をもとに、アラート条件と運用手順を継続改善
- 画像容量や配信要件が増えた段階で、画像保存をAzure Blob Storageへ移行
