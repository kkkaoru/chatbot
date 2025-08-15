# CLAUDE.ja.md

このファイルは、Claude Code (claude.ai/code) がこのリポジトリのコードを扱う際のガイダンスを提供します。

## ファイル操作ルール
- **重要**: このプロジェクトでファイルを読み書きする際は、デフォルトのファイルシステムツールではなく、常にserena MCPツールを使用してください
- ファイルの読み取りには`mcp__serena__read_file`を使用
- 新しいファイルの作成には`mcp__serena__create_text_file`を使用
- ファイルの編集には`mcp__serena__replace_regex`または`mcp__serena__replace_symbol_body`を使用
- これにより、プロジェクトの言語サーバーとメモリシステムとの適切な統合が保証されます

## プロジェクト概要

Discord連携を持つHonoフレームワークを使用したチャットボットプロジェクトで、Bunモノレポとワークスペースサポートが設定されています。

## コマンド

### 開発
```bash
# 依存関係のインストール
bun install

# Biomeフォーマッターとリンターの実行
bun biome check

# Biomeの修正を適用（フォーマットとリンティング）
bun biome check --write

# Conventional Commitsでコミット
bun run commit
# またはエイリアスを使用
bun cz

# Gitフックのインストール（まだインストールしていない場合）
bun run lefthook:install
```

### テスト
```bash
# すべてのテストを実行
bun test:run

# カバレッジ付きでテストを実行
bun test:coverage

# ウォッチモードでテストを実行
bun test:watch
```

## アーキテクチャ

### モノレポ構造
- `packages/*`と`workspaces/*`ディレクトリにパッケージを配置するBunワークスペースを使用
- 現在、アクティブなパッケージやアプリはまだありません

### 主要技術
- **ランタイム**: Bun（TypeScript対応）
- **フレームワーク**: Hono（Webフレームワーク）、discord-honoによるDiscord連携
- **テスト**: V8カバレッジ付きVitest
- **コード品質**: フォーマットとリンティングのためのBiome
- **コミット規約**: commitlintとcommitizenによるConventional Commitsの強制
- **Gitフック**: テストとリンティングのためのpre-commitとpre-pushフック付きLefthook

### 設定詳細
- **TypeScript**: Strictモード有効、ESNextターゲット、bundlerモジュール解決
- **Biome**: JavaScript/TypeScriptのタブインデント、ダブルクォート
- **依存関係**: bunfig.tomlによりpackage.jsonで正確なバージョンをロック（^や~なし）

## 重要な注意事項
- これは公開すべきではないプライベートパッケージです
- プロジェクトはBunのネイティブTypeScriptサポートを使用（tsconfigでnoEmit: true）
- Wranglerがインストールされており、Cloudflare Workersデプロイメントの可能性を示唆

## 開発ガイドライン

### ユニットテスト
詳細なテストガイドラインについては、ユニットテストルールを参照してください: @.rules/unit-test.ja.md

ガイドラインに含まれる内容:
- テスト構造と命名規則
- モッキング戦略（特にBunのようなグローバルオブジェクト）
- 型安全性の要件
- カバレッジ目標（最低80%）
- テストファイルのBiome設定