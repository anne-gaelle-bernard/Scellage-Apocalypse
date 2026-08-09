// Leitner-box spaced repetition: each correct review pushes the item into a
// higher box (longer interval before it's due again); any miss drops it back
// to box 1. Storage-agnostic — works for verse keys and Q&R ids alike.

const DAY = 24 * 60 * 60 * 1000;
const BOX_INTERVALS_DAYS = [1, 3, 7, 14, 30];

export function loadSrs(storageKey) {
  try { return JSON.parse(localStorage.getItem(storageKey) || '{}'); }
  catch { return {}; }
}

export function saveSrs(storageKey, data) {
  localStorage.setItem(storageKey, JSON.stringify(data));
}

export function getEntry(data, id) {
  return data[id] || { box: 1, nextReview: 0 };
}

export function isDue(data, id, now = Date.now()) {
  return getEntry(data, id).nextReview <= now;
}

export function review(data, id, known, now = Date.now()) {
  const entry = getEntry(data, id);
  const box = known ? Math.min(entry.box + 1, BOX_INTERVALS_DAYS.length) : 1;
  const nextReview = now + BOX_INTERVALS_DAYS[box - 1] * DAY;
  return { ...data, [id]: { box, nextReview, lastReview: now } };
}

export { BOX_INTERVALS_DAYS };
