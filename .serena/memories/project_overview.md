# Project Overview

## プロジェクト概要
- **名前**: chatbot
- **説明**: Discord統合を持つHonoフレームワークを使用したチャットボットプロジェクト
- **タイプ**: Bunモノレポ（ワークスペース対応）
- **プライベートパッケージ**: true（公開不可）

## 技術スタック
- **ランタイム**: Bun (TypeScript対応)
- **Webフレームワーク**: Hono
- **Discord統合**: discord-hono
- **ビルド/デプロイ**: Wrangler (Cloudflare Workers向け)
- **言語**: TypeScript 5.9.2
- **パッケージマネージャー**: Bun (exactバージョン管理)

## 開発ツール
- **コード品質**: Biome (フォーマッター & リンター)
- **コミット規約**: Conventional Commits (commitlint + commitizen)
- **Gitフック**: Lefthook
- **TypeScript設定**: Strict mode有効、ESNext対応、noEmit: true

## プロジェクト構造
```
chatbot/
├── apps/           # アプリケーション（現在空）
├── packages/       # 共有パッケージ（現在空）
├── workspaces/     # ワークスペース（存在する場合）
├── .serena/        # Serena設定
├── .claude/        # Claude設定
├── .vscode/        # VSCode設定
└── 設定ファイル    # package.json, tsconfig.json, biome.jsonc等
```

## モノレポ構造
- Bunワークスペース使用
- パッケージディレクトリ: `packages/*`, `workspaces/*`
- 現在は実際のパッケージやアプリケーションは未実装