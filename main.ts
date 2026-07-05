const html = await Deno.readTextFile(new URL("./index.html", import.meta.url));

export function handler(_req: Request): Response {
  return new Response(html, {
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

if (import.meta.main) {
  Deno.serve({ port: 8000 }, handler);
}
