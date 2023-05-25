let idCounter = 0;

export function generateId() {
  return String(idCounter++);
}
