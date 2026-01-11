export function saveSession(id: string, data: unknown) {
  localStorage.setItem(`session:${id}`, JSON.stringify(data));
}

export function loadSession(id: string) {
  const raw = localStorage.getItem(`session:${id}`);
  return raw ? JSON.parse(raw) : null;
}
