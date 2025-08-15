# System Utilities for Darwin (macOS)

## ファイルシステム操作
```bash
# ファイル一覧
ls -la                    # 詳細表示（隠しファイル含む）
ls -lah                   # 人間が読みやすいサイズ表示

# ディレクトリ作成
mkdir -p path/to/dir      # 親ディレクトリも作成

# ファイル検索
find . -name "*.ts"       # 拡張子で検索
find . -type d -name "node_modules"  # ディレクトリ検索
mdfind "query"            # Spotlight検索（macOS特有）

# ファイル内容検索
grep -r "pattern" .       # 再帰的検索
grep -n "pattern" file    # 行番号付き
ag "pattern"              # The Silver Searcher（高速）
rg "pattern"              # ripgrep（さらに高速）
```

## ファイル操作
```bash
# ファイル表示
cat file                  # 全体表示
head -n 20 file          # 先頭20行
tail -n 20 file          # 末尾20行
less file                # ページャー表示

# ファイル監視
fswatch -o . | xargs -n1 echo "Changed"  # macOS標準
fswatch -x file.ts       # 詳細な変更情報

# ファイル情報
stat file                # 詳細情報
file file.ts            # ファイルタイプ
wc -l file              # 行数カウント
```

## プロセス管理
```bash
# プロセス表示
ps aux | grep node       # Node.jsプロセス検索
pgrep -f bun            # Bunプロセス検索
lsof -i :3000           # ポート3000を使用中のプロセス

# プロセス終了
kill -9 PID             # 強制終了
killall node            # 名前で終了
```

## ネットワーク
```bash
# ポート確認
netstat -an | grep LISTEN
lsof -i -P | grep LISTEN

# DNS確認
dscacheutil -q host -a name example.com
nslookup example.com
```

## macOS特有のコマンド
```bash
# クリップボード
pbcopy < file           # ファイル内容をコピー
echo "text" | pbcopy    # テキストをコピー
pbpaste                 # ペースト

# ファイル開く
open .                  # Finderで開く
open -a "Visual Studio Code" file.ts  # アプリで開く

# システム情報
sw_vers                 # macOSバージョン
system_profiler SPSoftwareDataType  # 詳細情報
```

## Git関連
```bash
git status
git diff --cached       # ステージング済みの差分
git log --oneline -10   # 最近の10コミット
git branch -a           # 全ブランチ表示
```