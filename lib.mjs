// Public read-only API; no authentication or dependencies.
export const BASE = 'https://apexai.academy';
export async function getJSON(path) {
  const response = await fetch(`${BASE}${path}`, {
    headers: { Accept: 'application/json' }, signal: AbortSignal.timeout(15000)
  });
  if (!response.ok) throw new Error(`Apex HTTP ${response.status} for ${path}`);
  return response.json();
}
export function freeLessons(catalog) {
  return catalog.courses.flatMap(course => course.modules.flatMap(module =>
    module.lessons.filter(lesson => lesson.open_to_everyone && lesson.readable)
      .map(lesson => ({ ...lesson, course: course.title, module: module.title }))));
}
