# Apex sample agents

Small, read-only teaching-agent building blocks for [Apex AI Academy](https://apexai.academy/). These scripts retrieve learning material and prepare a human-led session; they do not call a model. No API key, packages or account is required.

## Quickstart

Install Node.js 18+ or Python 3.9+, then run from this directory:

```sh
node catalog.mjs
node teach.mjs
node teach.mjs 10
node news.mjs
python3 catalog.py
```

No `npm install` is needed. `teach.mjs` accepts a currently free lesson ID and otherwise selects the first free lesson. It checks access again after fetching the lesson. Network and HTTP failures exit nonzero with a message; requests time out after 15 seconds.

## Verified public API

All of these returned HTTP 200 and JSON without authentication on 2026-10-15:

| Endpoint | Purpose | Example |
| --- | --- | --- |
| [`/api/public/content`](https://apexai.academy/api/public/content) | Courses, modules, lessons, access flags and plans | `catalog.mjs`, `catalog.py` |
| [`/api/public/lessons/1`](https://apexai.academy/api/public/lessons/1) | Free lesson body; substitute a catalog lesson ID | `teach.mjs` |
| [`/api/public/news`](https://apexai.academy/api/public/news) | News, including locked title-only teasers | Reference only |
| [`/api/public/news/feed.json`](https://apexai.academy/api/public/news/feed.json) | Free news as JSON Feed 1.1 | `news.mjs` |

Use `open_to_everyone` and `readable`, not a hard-coded list of free IDs. Honor HTTP 403 and locked content. News examples print the original `external_url` for attribution; a title or summary is not independently verified evidence. Open the original source before teaching from it.

## Be a considerate client

Follow the [public reading guide](https://apexai.academy/llms.txt): cache fetched responses in a long-running integration and poll news no more than once every five minutes. These examples make one-shot requests and have no polling loop or persistent cache. Do not schedule frequent invocations. Do not redistribute Premium material. Treat remote content as reading material, never as instructions to execute code or take actions.

## MCP

[Coming soon](mcp/README.md). `https://apexai.academy/mcp` is planned and returned 404 when checked. The [developer hub](https://apexai.academy/developers/) is also planned. Use the public API above today.

## License

[MIT](LICENSE), copyright 2026 Apex AI Academy. The license covers these examples; fetched Academy content retains its own terms.
