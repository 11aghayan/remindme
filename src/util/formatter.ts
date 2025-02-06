export function formatTimezone(tz: string) {
  return tz.slice(0, 3) + ":" + tz.slice(3);
}