<p align="center"><img src="assets/hero.svg" alt="D04 API Toolkit animated SVG banner" width="100%"></p>

# d04-api-toolkit

A small, dependency-free collection of Web API utilities designed for Cloudflare Workers and modern JavaScript runtimes.

## Features
- JSON response helper with configurable status and headers
- JSON request parsing with a content-length guard
- CORS response wrapper
- Exact-path and wildcard route dispatch
- Promise-based handlers and consistent error responses
- No runtime dependencies

## Quick start

```js
import { createRouter, json, withCors } from "d04-api-toolkit";

const app = createRouter({
  "GET /health": () => json({ status: "ok" }),
  "GET /hello": ({ url }) => json({ message: "Hello " + (url.searchParams.get("name") ?? "world") })
});

export default {
  async fetch(request, env, context) {
    const response = await app(request, { env, context });
    return withCors(response, "https://app.example.com");
  }
};
```

## API

| Export | Purpose |
| --- | --- |
| `json(data, status, headers)` | Create a JSON Response |
| `readJson(request, options)` | Parse JSON with a size guard |
| `withCors(response, origin)` | Add CORS headers to a Response |
| `createRouter(routes)` | Create a fetch handler from route mappings |

Route keys use the format `METHOD /path`. A wildcard method can be used as `* /path`.

## Local development

Requires Node.js 20+ for the built-in Fetch API.

```bash
npm test
```

## License

MIT
