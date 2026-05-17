export function getLocalTZ(): { city: string; abbr: string } {
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const city = tz.split("/").pop()?.replace(/_/g, " ") ?? tz;
  const abbr =
    new Intl.DateTimeFormat("en-US", { timeZoneName: "short" })
      .formatToParts(new Date())
      .find((p) => p.type === "timeZoneName")?.value ?? "";
  return { city, abbr };
}

const MONTHS: Record<string, number> = {
  Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
  Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
};

export function parsePostDate(dateStr: string): Date {
  const [mon, year] = dateStr.split(" ");
  return new Date(parseInt(year), MONTHS[mon] ?? 0);
}

export function getRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 1) return "today";
  if (diffDays === 1) return "yesterday";
  if (diffDays < 30) return `${diffDays} days ago`;

  const months = Math.floor(diffDays / 30.44);
  if (months === 1) return "1 month ago";
  if (months < 12) return `${months} months ago`;

  const years = Math.floor(months / 12);
  const rem = months % 12;
  if (years === 1 && rem === 0) return "1 year ago";
  if (rem === 0) return `${years} years ago`;
  return `${years} year${years > 1 ? "s" : ""} ${rem} month${rem > 1 ? "s" : ""} ago`;
}

export function relativeFromString(dateStr: string): string {
  return getRelativeTime(parsePostDate(dateStr));
}
