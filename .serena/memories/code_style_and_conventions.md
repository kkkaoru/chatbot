# Code Style and Conventions

## TypeScript設定
### コンパイラオプション
- **ターゲット**: ESNext
- **モジュール**: Preserve (Bun用)
- **Strict Mode**: 有効
- **モジュール解決**: bundler
- **TSインポート拡張子**: 許可
- **noEmit**: true (Bunがネイティブで実行)

### 厳格なチェック
- `strict`: true
- `noFallthroughCasesInSwitch`: true
- `noUncheckedIndexedAccess`: true
- `noImplicitOverride`: true

### 無効化されているルール（必要に応じて有効化可）
- `noUnusedLocals`: false
- `noUnusedParameters`: false
- `noPropertyAccessFromIndexSignature`: false

## Biome設定
### フォーマット
- **インデント**: タブ
- **引用符**: ダブルクォート（JavaScript/TypeScript）
- **セミコロン**: 必須（デフォルト）

### リンター
- 推奨ルールセットを使用
- インポートの自動整理有効

### コマンド
- チェック: `bun biome check`
- 自動修正: `bun biome check --write`

## コミット規約
### Conventional Commits
- フォーマット: `type(scope): description`
- タイプ例:
  - `feat`: 新機能
  - `fix`: バグ修正
  - `docs`: ドキュメント
  - `style`: コードスタイル
  - `refactor`: リファクタリング
  - `test`: テスト
  - `chore`: 雑務

### コミット方法
- `bun run commit` または `bun cz` を使用
- commitlintで規約を自動チェック

## 依存関係管理
- **バージョン固定**: exact = true (bunfig.toml)
- ^や~を使わない完全バージョン指定

## ファイル命名規則
- TypeScriptファイル: `.ts` 拡張子
- 設定ファイル: `.json`、`.jsonc`、`.toml`、`.yml`

## プロジェクト規約
- プライベートパッケージ（公開禁止）
- モノレポ構造でのパッケージ管理
- Bun固有の機能を活用