import { getJSON } from './lib.mjs';
try {
  const feed = await getJSON('/api/public/news/feed.json');
  for (const item of feed.items ?? []) {
    if (!item.external_url) continue;
    console.log(`${item.title}\nOriginal source: ${item.external_url}\nApex: ${item.url ?? feed.home_page_url}\n`);
  }
  if (!feed.items?.length) console.log('No free news items are currently available.');
} catch (error) { console.error(error.message); process.exitCode = 1; }
