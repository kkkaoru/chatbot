# Suggested Commands

## 依存関係管理
```bash
# 依存関係のインストール
bun install

# パッケージの追加
bun add <package-name>

# 開発依存関係の追加
bun add -d <package-name>
```

## コード品質
```bash
# Biomeでコードチェック（フォーマット & リント）
bun biome check

# Biomeで自動修正（フォーマット & リント）
bun biome check --write

# 特定ファイルのチェック
bun biome check <file-path>
```

## Git & コミット
```bash
# Conventional Commitsを使用したコミット
bun run commit
# または短縮形
bun cz

# Gitフックのインストール（初回のみ）
bun run lefthook:install

# 通常のGitコマンド
git status
git diff
git add .
git push
```

## TypeScript
```bash
# TypeScriptの型チェック
bun run tsc --noEmit

# Bunで直接TypeScriptファイルを実行
bun run <file.ts>
```

## システムコマンド (Darwin/macOS)
```bash
# ファイル検索
find . -name "*.ts" -type f
# ファイル内容検索
grep -r "pattern" .
# ディレクトリ一覧
ls -la
# ファイル内容表示
cat <file>
# ファイル監視
fswatch -o . | xargs -n1 -I{} echo "File changed"
```

## デプロイ関連（Cloudflare Workers）
```bash
# Wranglerコマンド（設定が必要）
bunx wrangler login
bunx wrangler deploy
bunx wrangler dev
```

## その他
```bash
# package.jsonのスクリプト確認
bun run
```