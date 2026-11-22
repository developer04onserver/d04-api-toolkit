import test from "node:test";
import assert from "node:assert/strict";
import { createRouter, json, withCors, readJson } from "../src/index.js";

test("dispatches fetch requests to route handlers", async () => {
  const app = createRouter({ "GET /health": () => json({ status: "ok" }) });
  const response = await app(new Request("https://worker.test/health"));
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { status: "ok" });
});
test("adds CORS headers", () => {
  const response = withCors(json({ ok: true }), "https://app.test");
  assert.equal(response.headers.get("access-control-allow-origin"), "https://app.test");
});
test("parses JSON request bodies", async () => {
  const request = new Request("https://worker.test/data", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ value: 4 }) });
  assert.deepEqual(await readJson(request), { value: 4 });
});
