# js12apiroutes - Next.js API Routes 学習プロジェクト 仕様書

## プロジェクト概要
- **プロジェクト名**: js12apiroutes
- **配置場所**: C:\TOOL\JS\js12apiroutes
- **技術スタック**: Next.js 14+ (App Router), TypeScript
- **目的**: Next.js の API Routes を学習し、サーバー側処理を体験する

## 要件定義

### API Routes 実装要件

| エンドポイント | メソッド | レスポンス | 説明 |
|--------------|---------|-----------|------|
| `/api/hello` | GET | `"Hello API"` (プレーンテキスト) | シンプルな挨拶API |
| `/api/time` | GET | `{ "time": "ISO8601形式の現在時刻" }` (JSON) | 現在時刻を返すAPI |
| `/api/todos` | GET | `[{ "id": number, "title": string, "completed": boolean }, ...]` (JSON) | Todoリストを返すAPI |
| `/api/todos` | POST | `{ "id": number, "title": string, "completed": boolean }` (JSON) | 新しいTodoを追加するAPI |

### フロントエンド要件
- メインページ (`/`) で以下を表示:
  1. `/api/hello` のレスポンス
  2. `/api/time` のレスポンス
  3. `/api/todos` のレスポンス (Todoリスト)
- Todoリストに対して新規追加フォームを設置し、POST `/api/todos` で追加できるようにする
- 全てのデータ取得は `fetch()` を使用

### クリア条件
- (a) GET と POST の両方を実装 ✓
- (b) フロント側で `fetch("/api/todos")` を使って表示 ✓

## 技術仕様

### プロジェクト構造 (App Router)
```
js12apiroutes/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── hello/
│   │   │   │   └── route.ts
│   │   │   ├── time/
│   │   │   │   └── route.ts
│   │   │   └── todos/
│   │   │       └── route.ts
│   │   ├── page.tsx          # メインページ
│   │   ├── layout.tsx
│   │   └── globals.css
│   └── lib/
│       └── todos.ts          # Todoデータ管理 (インメモリ)
├── package.json
├── tsconfig.json
├── next.config.js
└── README.md
```

### データモデル
```typescript
// Todo型定義
interface Todo {
  id: number;
  title: string;
  completed: boolean;
}
```

### インメモリデータストア
- 簡易実装のため、サーバーメモリ上の配列で Todo を管理
- サーバー再起動でリセットされることを許容

## 実装フェーズ

### フェーズ 1: プロジェクト初期化
- Next.js + TypeScript プロジェクト作成
- App Router を使用

### フェーズ 2: API Routes 実装
1. `/api/hello` - GET
2. `/api/time` - GET
3. `/api/todos` - GET / POST

### フェーズ 3: フロントエンド実装
- メインページ作成
- fetch によるデータ取得・表示
- Todo 追加フォーム実装

## 開発コマンド
```bash
# 開発サーバー起動
npm run dev

# ビルド
npm run build

# 本番起動
npm start
```

## 注意事項
- 既存の `js12apiroutes` ディレクトリがある場合は削除してから作成
- `npx create-next-app@latest . --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm` で初期化予定
- 実装は仕様確定後に開始