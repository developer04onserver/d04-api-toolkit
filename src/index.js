/**
 * d04-api-toolkit
 * Small, dependency-free API utilities for Node.js and modern runtimes.
 */

export function json(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", ...headers },
  });
}

export function readJson(request, { maxBytes = 1_000_000 } = {}) {
  const length = Number(request.headers.get("content-length") || 0);
  if (length > maxBytes) throw new Error("Request body is too large");
  return request.json();
}

export function withCors(response, origin = "*") {
  const headers = new Headers(response.headers);
  headers.set("access-control-allow-origin", origin);
  headers.set("access-control-allow-methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
  headers.set("access-control-allow-headers", "content-type,authorization");
  return new Response(response.body, { status: response.status, headers });
}

export function createRouter(routes = {}) {
  return async (request, context = {}) => {
    const url = new URL(request.url);
    const key = `${request.method.toUpperCase()} ${url.pathname}`;
    const handler = routes[key] || routes[`* ${url.pathname}`];
    if (!handler) return json({ error: "Not found", path: url.pathname }, 404);
    try {
      return await handler({ request, url, context });
    } catch (error) {
      return json({ error: error instanceof Error ? error.message : "Internal error" }, 500);
    }
  };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  console.log("d04-api-toolkit: import json(), readJson(), withCors(), or createRouter().");
}
