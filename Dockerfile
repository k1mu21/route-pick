# ビルドステージ: Deno + Vite で静的ファイルを生成
FROM denoland/deno:2.9.1 AS build
WORKDIR /app
COPY deno.json deno.lock ./
RUN deno install
COPY vite.config.ts index.html ./
COPY src ./src
RUN deno task build

# 配信ステージ: 非rootで動くnginxで dist を配信（ポート8080で待ち受け）
FROM nginxinc/nginx-unprivileged:1.27-alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 8080
