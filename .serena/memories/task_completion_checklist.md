# Task Completion Checklist

## タスク完了時に実行すべきコマンド

### 1. コード品質チェック（必須）
```bash
# Biomeでフォーマットとリントをチェック
bun biome check

# 問題がある場合は自動修正
bun biome check --write
```

### 2. TypeScript型チェック（推奨）
```bash
# 型エラーがないか確認
bun run tsc --noEmit
```

### 3. 依存関係の確認（パッケージ追加時）
```bash
# package.jsonの依存関係を確認
bun install
```

### 4. コミット前の確認
```bash
# 変更内容の確認
git status
git diff

# ステージング
git add .

# Conventional Commitsでコミット
bun run commit
```

## チェックリスト
- [ ] Biomeのフォーマット/リントをパス
- [ ] TypeScriptの型エラーなし
- [ ] 不要なconsole.logやデバッグコードを削除
- [ ] 新しい依存関係はexactバージョンで追加
- [ ] Conventional Commits形式でコミットメッセージ作成
- [ ] セキュリティ上の問題がないか確認（秘密鍵、APIキーなど）

## 注意事項
- タブインデントを使用
- ダブルクォートを使用
- 未使用の変数やパラメータは許容（設定で無効化）
- プライベートパッケージなので公開しない