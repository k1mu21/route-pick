import { assertEquals } from "@std/assert";
import { handler } from "./main.ts";

Deno.test("serves index.html", async () => {
  const res = handler(new Request("http://localhost/"));
  assertEquals(res.headers.get("content-type"), "text/html; charset=utf-8");
  const body = await res.text();
  assertEquals(body.includes("Route Pick"), true);
});
