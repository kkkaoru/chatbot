# ユニットテストルール

このドキュメントは、プロジェクトにおけるユニットテストの作成基準と規約を定義します。

## テストフレームワーク

- **フレームワーク**: Vitest
- **カバレッジツール**: V8
- **アサーションライブラリ**: Vitest組み込みのexpect

## ファイル命名規則

- テストファイルは、テスト対象のソースファイルと同じディレクトリに配置する
- テストファイルは `.test.ts` 拡張子を使用する
- 例: `config.ts` → `config.test.ts`

## テスト構造

### 1. フラットなテスト構造（強く推奨）

**常に`test`関数を使用したフラット構造を採用してください。`describe`ブロックは可能な限り避けてください。**

```typescript
import { test, expect } from 'vitest'

test('関数が期待値を返すことを確認', () => {
  // テスト実装
})

test('関数がエッジケースを正しく処理することを確認', () => {
  // テスト実装
})
```

### 2. describeを避ける理由

- **シンプルさ**: フラットなテストは読みやすく理解しやすい
- **ネストの削減**: 認知的負荷を軽減
- **一貫性**: `test`のみを使用することでコードベース全体の統一性を保つ
- **より良いテスト名**: 説明的で自己完結的なテスト名を強制

### 3. describeが許容される場合（まれ）

以下の場合に限り、絶対に必要な時のみ`describe`ブロックを使用：
- 複雑なセットアップ/ティアダウンロジックを共有するテストのグループ化
- 大規模なクラスの複数メソッドのテスト

それでも、`describe`を避けるようにテストをリファクタリングできないか検討してください。

**注意**: テストを書く際は常に`test`関数を使用してください。他のテスト宣言関数はBiome設定により制限されています。

## モッキングガイドライン

### グローバルオブジェクト（例: Bun、process）

TypeScriptエラーなしでグローバルオブジェクトをモックするには`Object.defineProperty`を使用：

```typescript
const originalBun = globalThis.Bun

beforeEach(() => {
  Object.defineProperty(globalThis, 'Bun', {
    value: { /* モック実装 */ },
    writable: true,
    configurable: true,
  })
})

afterEach(() => {
  Object.defineProperty(globalThis, 'Bun', {
    value: originalBun,
    writable: true,
    configurable: true,
  })
})
```

**避けるべき**: `@ts-expect-error`や`@ts-ignore`コメントの使用

### 環境変数

```typescript
const originalEnv = { ...process.env }

beforeEach(() => {
  process.env = { ...originalEnv }
})

afterEach(() => {
  process.env = originalEnv
})

test('環境変数が欠落している場合の処理', () => {
  process.env.SOME_VAR = undefined // deleteの代わりにundefinedを使用
})
```

## 型安全性

### 適切な型アサーション

```typescript
// 良い例 - 型付きモックを使用
const mockFn = vi.fn<Parameters<typeof originalFn>, ReturnType<typeof originalFn>>()

// 良い例 - unknownを経由した型アサーション
const mockApp = {
  fetch: vi.fn(),
} as unknown as DiscordHono

// 避けるべき - 直接的なany型
const mockApp = {} as any
```

## カバレッジ要件

- **目標カバレッジ**: すべての指標で80%以上
- **必須指標**:
  - ステートメント（Statements）
  - ブランチ（Branches）
  - 関数（Functions）
  - 行（Lines）

## テスト整理のベストプラクティス

### 1. セットアップとティアダウン

```typescript
// 共有セットアップはモジュールレベルに配置
let mockExit: MockedFunction<typeof process.exit>
const originalExit = process.exit

beforeEach(() => {
  vi.clearAllMocks()
  // モックのセットアップ
})

afterEach(() => {
  // 元の実装を復元
})
```

### 2. テスト命名

- テスト対象の動作や関数を説明する名前を使用
- テスト対象のアクション/関数から始める
- 期待される結果を含める
- `describe`ブロックを避けるため、テスト名自体にコンテキストを含める

```typescript
// 良い例 - 完全なコンテキストを含む自己完結的なテスト名
test('validateEnvironment は DISCORD_TOKEN が欠落している場合 null を返す', () => {})
test('startServer は正しいポート設定で Bun.serve を呼び出す', () => {})
test('app.fetch は GET リクエストを正しく処理する', () => {})
test('必須環境変数が欠落している場合、設定検証が失敗する', () => {})

// 避けるべき - 曖昧またはコンテキストに依存する名前
test('設定のテスト', () => {})
test('動作する', () => {})
test('エラーを処理', () => {}) // 何がエラーを処理するのかコンテキストが不明
```

### 3. アサーション

- 汎用的なものより具体的なアサーションを使用
- 肯定的なケースと否定的なケースの両方をテスト
- 適切な場合はモック呼び出しを検証

```typescript
// 良い例
expect(config.port).toBe(3000)
expect(mockServe).toHaveBeenCalledWith({ port: 3000, fetch: mockApp.fetch })

// 避けるべき
expect(config).toBeTruthy()
```

## テストでのコンソール出力

テスト出力をクリーンに保つため、テスト内でコンソール出力を抑制：

```typescript
const originalConsoleError = console.error

beforeEach(() => {
  console.error = vi.fn()
})

afterEach(() => {
  console.error = originalConsoleError
})
```

## テストファイル用のBiome設定

テストファイルには特別なBiome設定オーバーライドがあります：

- `noSecrets`: 無効（テスト説明が誤検知される可能性があるため）
- `noDelete`: 無効（モックプロパティの削除が必要な場合があるため）
- `noConsole`: error、warn、infoは許可（logは不可）

## コマンドリファレンス

```bash
# すべてのテストを実行
bun test:run

# カバレッジ付きでテストを実行
bun test:coverage

# 特定のテストファイルを実行
bun test:run src/config.test.ts

# ウォッチモードでテストを実行
bun test:watch
```

## テスト作成チェックリスト

- [ ] テストファイルはソースファイルと同じ場所に配置されている
- [ ] エクスポートされたすべての関数がテストされている
- [ ] 成功ケースとエラーケースの両方がカバーされている
- [ ] モックが適切にセットアップおよび復元されている
- [ ] `@ts-expect-error`や`@ts-ignore`コメントが使用されていない
- [ ] テスト名が説明的である
- [ ] カバレッジが最小要件（80%）を満たしている