# CLAUDE.md

地図上にピンを2つ置いて電車経路を検索するWebアプリ（route-pick）。

## 技術スタック

- **ランタイム / パッケージ管理**: Deno 2.9.1（Dockerfile基準。`deno.json` の `imports` で npm/jsr 依存を管理。`package.json` は使わない）
- **フロントエンド**: React ^18.3.1 + TypeScript
- **ビルド**: Vite ^6.3.5（`@deno/vite-plugin` ^1.0.4 + `@vitejs/plugin-react` ^4.3.4）
- **データ取得**: TanStack Query ^5.62.0
- **地図**: MapLibre GL JS ^5.6.0 + PMTiles ^4.3.0
- **経路API**: `https://api.transit.ls8h.com/api/v1`（外部の乗換検索API）
- **インフラ**: GCP Cloud Run + Artifact Registry（`terraform/` でTerraform管理。Terraform >= 1.7、googleプロバイダ ~> 6.0。GitHub Actions から Workload Identity Federation でキーレスデプロイ）
- **配信**: マルチステージDockerビルド → 非rootの nginx-unprivileged 1.27-alpine（ポート8080）で `dist/` を静的配信

バージョンを更新したら（`deno.json` / Dockerfile / `terraform/versions.tf`）、この表も合わせて更新すること。

## コマンド

- `deno task dev` — 開発サーバー起動
- `deno task build` — 本番ビルド（`dist/` に出力）
- `deno task preview` — ビルド結果のプレビュー

## ディレクトリ構成（レイヤードアーキテクチャ）

```
src/
  domain/          型定義・純粋なドメインロジック（types.ts, geo.ts, format.ts）
  application/     ユースケース・フック（queries.ts, useRoutePick.ts）
  infrastructure/  外部I/O（transitApi.ts, map/ 以下にMapLibre関連）
  presentation/    Reactコンポーネント（MapView, Panel, JourneyCard など）
```

依存の向きは presentation → application → domain、infrastructure は domain の型のみ参照する。逆方向のimport（domain から React やAPIに依存するなど）は禁止。

## コーディング規約

- import には拡張子を必ず付ける（`from "../domain/types.ts"` のように `.ts` / `.tsx` を明記）— Deno の規約
- 依存追加は `deno.json` の `imports` に `npm:` / `jsr:` プレフィックス付きで追記する
- コメント・コミットメッセージは日本語で書く
- 関数の説明は JSDoc 形式の1〜2行コメント（例: `/** ピン座標間の経路を取得する */`）
- 型は `interface` を基本とし、判別可能ユニオンには `kind` フィールドを使う（`Leg` 参照）
- API レスポンスは infrastructure 層で domain の型に変換し、上位層に生レスポンスを漏らさない
- マジックナンバーは定数化する（`MAX_JOURNEYS` など）

## デプロイ

- `main` への push で `.github/workflows/deploy-cloudrun.yml` が Cloud Run に自動デプロイ
- PR では `preview-cloudrun.yml` がプレビュー環境を作成
- GCPリソースの変更は `terraform/` を編集して `terraform apply`（出力値を GitHub Variables に設定する運用）
