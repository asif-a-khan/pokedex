// fisher-yates shuffle — the original project had this bolted onto Array.prototype,
// which is a no-no. this is a pure function that returns a new array instead.
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  let i = shuffled.length;

  while (--i > 0) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}
