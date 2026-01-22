export function gettingDate(iso: string) {
  const date = new Date(iso);

  return date.toLocaleDateString();
}

export function gettingHour(iso: string) {
  const date = new Date(iso);

  return date.toLocaleTimeString();
}
