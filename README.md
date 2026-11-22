# d04-api-toolkit

<div align="center">

<img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&size=20&duration=2800&pause=900&color=58D8FF&center=true&vCenter=true&width=620&lines=Small+tools.+Clear+interfaces.;Dependency-free+API+helpers;Built+for+modern+JavaScript+runtimes" alt="Animated project tagline">

`[ API ENGINEERING ]`  /  `[ JAVASCRIPT ]`  /  `[ ZERO DEPENDENCIES ]`

</div>

---

## Overview

A compact collection of reusable HTTP helpers for Node.js and modern Fetch-compatible runtimes. The module provides JSON responses, bounded JSON request parsing, CORS response wrapping, and a small route dispatcher.

## Features

- JSON response helper with configurable status and headers
- Request JSON parsing with a configurable content-length guard
- CORS header helper
- Minimal method-and-path router
- No third-party runtime dependencies

## Project layout

```text
d04-api-toolkit/
|-- src/
|   |-- index.js
|-- README.md
```

## Quick start

Requires a modern JavaScript runtime with the Fetch API.

```js
import { json, createRouter } from "./src/index.js";

const app = createRouter({
  "GET /health": () => json({ status: "ok" }),
});

const response = await app(new Request("https://example.test/health"));
console.log(await response.json());
```

## API

| Export | Purpose |
|---|---|
| `json(data, status, headers)` | Build a JSON Response |
| `readJson(request, options)` | Parse JSON with a size guard |
| `withCors(response, origin)` | Add CORS headers |
| `createRouter(routes)` | Create a method-and-path dispatcher |

## Development

```bash
node --version
node --input-type=module
```

## Security notes

The content-length check is an early guard, not a substitute for streaming body limits. Validate untrusted input at the application boundary, configure allowed origins explicitly, and avoid returning internal exception details in production.

## License

MIT
