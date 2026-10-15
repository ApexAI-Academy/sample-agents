import { getJSON, freeLessons } from './lib.mjs';
try {
  const lessons = freeLessons(await getJSON('/api/public/content'));
  for (const lesson of lessons) {
    console.log(`${lesson.course} / ${lesson.module}: ${lesson.title}`);
    console.log(`  https://apexai.academy/lesson.html?id=${lesson.id}`);
  }
  if (!lessons.length) console.log('No free lessons are currently available.');
} catch (error) { console.error(error.message); process.exitCode = 1; }
