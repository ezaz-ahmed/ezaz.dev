/*
  Display formatting for the cached GitHub numbers. Deliberately absolute rather
  than relative ("2 months ago"): the values are baked in at build time, so a
  relative label would drift further from the truth the longer a build lives.
*/

const DAY = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
const MONTH = new Intl.DateTimeFormat('en-GB', { month: 'short', year: 'numeric' });

/** "9 May 2026", or an em-dash when there's no date. */
export function shortDate(iso: string | null | undefined): string {
  if (!iso) return '—';

  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? '—' : DAY.format(date);
}

/** "May 2026" — enough precision for "created" and "last push". */
export function monthYear(iso: string | null | undefined): string {
  if (!iso) return '—';

  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? '—' : MONTH.format(date);
}

/** GitHub reports repo size in KB; show MB once it stops being small. */
export function sizeLabel(kb: number | null | undefined): string {
  if (kb === null || kb === undefined) return '—';
  if (kb < 1024) return `${kb} KB`;

  return `${(kb / 1024).toFixed(1)} MB`;
}

/** Byte counts from the languages API, short enough for a legend. */
export function byteLabel(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
