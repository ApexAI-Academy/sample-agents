import { getJSON, freeLessons } from './lib.mjs';
// Usage: node teach.mjs [lesson-id]. Defaults to the first currently free lesson.
try {
  const lessons = freeLessons(await getJSON('/api/public/content'));
  const requested = process.argv[2];
  if (requested && !/^[1-9][0-9]*$/.test(requested)) throw new Error('Use a positive integer lesson ID.');
  const lesson = requested ? lessons.find(l => l.id === Number(requested)) : lessons[0];
  if (!lesson) throw new Error('No matching currently free, readable lesson. Run node catalog.mjs.');
  const detail = await getJSON(`/api/public/lessons/${lesson.id}`);
  if (!detail.readable || !detail.open_to_everyone || typeof detail.body !== 'string') {
    throw new Error('Lesson access changed; choose another free lesson.');
  }
  console.log(`# Teaching session: ${detail.title}\n`);
  console.log(`Source: https://apexai.academy/lesson.html?id=${lesson.id}\n`);
  console.log('Ask your human what they already know. Read together, then let them try and explain.\n');
  console.log(detail.body);
  console.log('\nReflection: explain the main idea in your own words. What would you check before using it?');
} catch (error) { console.error(error.message); process.exitCode = 1; }
