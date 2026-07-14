---
name: add-feature
description: route-pickに新機能を追加するときの標準手順。レイヤードアーキテクチャに沿って domain → infrastructure → application → presentation の順に実装する。
---

# 機能追加の手順

CLAUDE.md の規約（import拡張子明記、依存の向き、日本語コメント）を守りつつ、以下の順で実装する。

1. **domain** — `src/domain/types.ts` に型を追加する。判別可能ユニオンには `kind` フィールドを使う。純粋なロジック（計算・整形）は `src/domain/` の関数として実装し、React やAPIに依存させない
2. **infrastructure** — 外部I/Oが必要なら `src/infrastructure/` に実装する。APIレスポンスはこの層で domain の型に変換し、生レスポンスを上位層に漏らさない。地図関連は `src/infrastructure/map/` に置く
3. **application** — `src/application/` にフックを追加する。データ取得は TanStack Query（`queries.ts` の `useJourneys` を参考に、`queryKey` と `staleTime` を設定）
4. **presentation** — `src/presentation/` にコンポーネントを追加し、`App.tsx` から組み込む
5. **動作確認** — `deno task build` が通ることを確認し、`deno task dev` で実際の挙動を確認する
