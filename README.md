# ✓ TaskFlow

> シンプルで使いやすい、モダンなタスク管理アプリ

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

## 🌐 デモ

**👉 [https://taskflow-omega-silk.vercel.app](https://taskflow-omega-silk.vercel.app)**

ブラウザで上記URLを開けば、すぐに使えます。アカウント登録不要です。

## ✨ 主な機能

- ✅ **タスクのCRUD** - 追加・編集・削除をシンプルなUIで
- 🚦 **ステータス管理** - 「未着手 / 進行中 / 完了」の3段階
- 🔥 **優先度設定** - 「高 / 中 / 低」で重要度を可視化
- 📅 **期限管理** - 期限切れ・本日期限を視覚的に警告
- 🔍 **リアルタイム検索** - タイトル・詳細から即座に絞り込み
- 🎯 **複数条件フィルタ** - ステータス × 優先度の組み合わせ検索
- 🌗 **ダークモード** - システム設定追従＆手動切替に対応
- 💾 **自動保存** - localStorageで永続化（ブラウザを閉じても消えない）
- 📊 **統計表示** - 全体/未着手/進行中/完了の件数を常時表示
- 📱 **レスポンシブ対応** - スマホ・タブレット・PCすべてで快適に

## 🛠 技術スタック

| カテゴリ | 採用技術 |
|---|---|
| フレームワーク | Next.js 16 (App Router) |
| 言語 | TypeScript 5 |
| スタイリング | Tailwind CSS 4 |
| 状態管理 | React Hooks (useState / useEffect / useMemo) |
| データ永続化 | Web Storage API (localStorage) |
| ホスティング | Vercel |
| Lint | ESLint |

## 📦 セットアップ手順

ローカル環境で動かしたい場合の手順です。

### 必要環境

- Node.js 20 以上
- npm 10 以上

### インストール & 起動

​```bash
# リポジトリをクローン
git clone https://github.com/kasahara-ewo/taskflow.git
cd taskflow

# 依存関係をインストール
npm install

# 開発サーバー起動
npm run dev
​```

ブラウザで [http://localhost:3000](http://localhost:3000) を開けば動作します。

### 本番ビルド

​```bash
npm run build
npm run start
​```

## 📁 プロジェクト構造

​```
taskflow/
├── app/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── TaskForm.tsx
│   │   ├── TaskFilter.tsx
│   │   └── TaskList.tsx
│   ├── lib/
│   │   ├── storage.ts
│   │   └── utils.ts
│   ├── types/
│   │   └── task.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── public/
├── package.json
├── tsconfig.json
└── next.config.ts
​```

## 💡 設計上の工夫

### 1. 関心の分離（Separation of Concerns）

- **types/** に型定義を集約 → 型の一貫性を保証
- **lib/** に純粋関数を切り出し → テスタビリティを確保
- **components/** はUIに専念 → ロジックは page.tsx に集約

### 2. パフォーマンス最適化

- `useMemo` を活用してフィルタリング・ソート処理をメモ化
- 不要な再レンダリングを防止

### 3. SSR / CSR の整合性

- `localStorage` 利用時は `typeof window` チェックでSSR対応
- ハイドレーション不一致を防ぐため、テーマ切替は `mounted` ステートで制御

### 4. アクセシビリティ

- すべてのインタラクティブ要素に `aria-label` を設定
- キーボード操作（Ctrl + Enter で送信）に対応

### 5. UX への配慮

- フォームは段階的展開（最初はタイトルのみ、フォーカスで詳細欄が出現）
- 削除前に確認ダイアログ
- 期限切れタスクは視覚的に警告（赤枠＋ラベル）
- 完了済みタスクは自動的に下部へソート

## 🚀 今後の改善予定

- [ ] タスクのカテゴリー / タグ機能
- [ ] ドラッグ&ドロップでの並び替え
- [ ] サブタスク機能
- [ ] バックエンド連携（Supabase 等を想定）
- [ ] 複数デバイス間での同期
- [ ] PWA 対応（オフライン利用）
- [ ] データのインポート / エクスポート（JSON / CSV）
- [ ] Vitest によるユニットテスト追加

## 📄 ライセンス

このプロジェクトは [MIT License](LICENSE) のもとで公開されています。

## 👤 作者

**Kasahara**

- GitHub: [@kasahara-ewo](https://github.com/kasahara-ewo)

---

このプロジェクトは個人開発のポートフォリオとして制作したものです。
ご意見・ご指摘・お仕事のご相談などお気軽にどうぞ。