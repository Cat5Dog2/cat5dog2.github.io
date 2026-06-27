---
layout: ../../layouts/ProjectLayout.astro
title: "SEO Intelligence Platform"
description: "キーワード調査と順位監視を一つにまとめるSEO分析基盤。設計ドキュメントとバックログを整備し、Clean Architectureの骨格まで作りました。"
tags: [".NET", "Blazor", "Hangfire", "PostgreSQL", "Redis", "OpenTelemetry", "Clean Architecture"]
repo: "https://github.com/Cat5Dog2/seo-intelligence-platform"
stage: "実装済み"
highlights:
  - "要件、API、DB、画面、非同期ジョブ、外部API、運用を文書化"
  - ".NET 10 / Clean Architectureの最小ソリューション骨格を作成"
  - "実装順と受入基準をIssue単位のバックログとして整備"
evidence:
  - label: "リポジトリ"
    url: "https://github.com/Cat5Dog2/seo-intelligence-platform"
  - label: "CI workflow"
    url: "https://github.com/Cat5Dog2/seo-intelligence-platform/blob/main/.github/workflows/ci.yaml"
  - label: "README・設計方針"
    url: "https://github.com/Cat5Dog2/seo-intelligence-platform/blob/main/README.md"
---

## 概要

ラッコキーワードAPIを中核に、SEO・コンテンツ・競合分析・順位監視をまとめるプラットフォームです。今は設計ドキュメントとバックログを整備し、.NET 10 / Clean Architectureの最小骨格を作った段階です。

## ポイント

- SEOドメイン知識をシステム設計へ落とし込んでいる
- Clean Architectureを意識したDomain / Application / Infrastructure分離
- Hangfire、PostgreSQL、Redisによる非同期ジョブ・キャッシュ・レート制御を設計
- 外部API連携、監査ログ、リトライ、通知など運用面まで設計
- CI、Migration、スモークテスト、コンテナスキャンの完了条件を定義

## なぜこの技術構成か

- **Clean Architecture (.NET)**: ドメインロジックをインフラから分離し、API変更やDB差し替えに強い構造を実現
- **Hangfire**: SEOデータ収集のような定期・非同期ジョブを、ダッシュボード付きで管理できる
- **PostgreSQL + Redis**: 永続データとキャッシュ・レート制御を役割分担し、外部API制約に対応
- **OpenTelemetry**: 分散トレーシングとメトリクス収集で、本番運用時のオブザーバビリティを確保

## 技術判断

SEOの実務で培った知識を、業務用語・状態設計・API制約・非同期処理・監査要件としてシステム設計に落とし込みました。現在は設計と骨格の段階で、実装の進捗はREADMEとバックログで管理しています。

## 今後の計画

- キーワード調査画面のモック
- ジョブ設計図
- Clean Architecture構成図
- SEO業務フローとシステム機能の対応表
