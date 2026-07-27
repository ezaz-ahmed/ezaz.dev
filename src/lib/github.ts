/*
  Reads the GitHub caches written by scripts/fetch-github-stats.mjs
  (npm run stats, which also runs before npm run build): profile numbers for the
  work grid, and per-repo detail for the /work/<slug> pages.

  Deliberately offline: the numbers are baked into the HTML at build time, so
  there's no client JS, no layout shift, and no visitor spends their own
  60-req/hr unauthenticated quota. Refresh = rebuild.

  A missing cache renders em-dashes rather than invented numbers.
*/
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const USER = 'ezaz-ahmed';

// Anchored to cwd: Astro bundles this module elsewhere during the build, so a
// module-relative path would point outside the repo.
const CACHE_PATH = resolve(process.cwd(), 'src/data/github-cache.json');
const REPO_CACHE_PATH = resolve(process.cwd(), 'src/data/repo-cache.json');

export type Language = {
  name: string;
  /** Raw weight behind the share: repo count profile-wide, bytes per repo. */
  count: number;
  /** Whole-percent share of the stacked bar; the set sums to 100. */
  share: number;
};

export type GithubStats = {
  user: string;
  url: string;
  /** Non-fork public repos. */
  repos: number | null;
  stars: number | null;
  followers: number | null;
  since: number | null;
  /** Trailing-year contributions incl. private work. null without a token. */
  contributions: number | null;
  /** Top languages by repo count, largest first. Empty when unknown. */
  languages: Language[];
  /** ISO timestamp of the cached data, or null when there is no cache. */
  fetchedAt: string | null;
};

const EMPTY: GithubStats = {
  user: USER,
  url: `https://github.com/${USER}`,
  repos: null,
  stars: null,
  followers: null,
  since: null,
  contributions: null,
  languages: [],
  fetchedAt: null,
};

export function getGithubStats(): GithubStats {
  if (!existsSync(CACHE_PATH)) {
    console.warn(`[github] no cache at ${CACHE_PATH} — run \`npm run stats\``);
    return EMPTY;
  }

  try {
    const cached = JSON.parse(readFileSync(CACHE_PATH, 'utf8')) as Partial<GithubStats>;
    return { ...EMPTY, ...cached, user: USER, url: EMPTY.url };
  } catch (error) {
    console.warn(`[github] unreadable cache (${(error as Error).message})`);
    return EMPTY;
  }
}

/** Subject line of a commit, plus enough to link and date it. */
export type RepoCommit = {
  /** Short sha, 7 chars. */
  sha: string;
  message: string;
  /** ISO timestamp, or null when the API didn't report one. */
  date: string | null;
  author: string | null;
  url: string;
};

export type RepoStats = {
  fullName: string;
  url: string;
  description: string | null;
  homepage: string | null;
  stars: number;
  forks: number;
  watchers: number;
  openIssues: number;
  /** Commits on the default branch. null when the count couldn't be read. */
  commits: number | null;
  contributors: number | null;
  /** SPDX id, e.g. "MIT". null for unlicensed repos. */
  license: string | null;
  topics: string[];
  defaultBranch: string;
  archived: boolean;
  /** Checkout size in KB, as GitHub reports it. */
  size: number;
  createdAt: string;
  pushedAt: string;
  /** By bytes of code, largest first; `share` sums to 100. */
  languages: Language[];
  recentCommits: RepoCommit[];
  fetchedAt: string;
};

// Read once per build — every project page asks for its own repo, and the cache
// is a single small file.
let repoCache: Record<string, RepoStats> | null = null;

function loadRepoCache(): Record<string, RepoStats> {
  if (repoCache) return repoCache;

  if (!existsSync(REPO_CACHE_PATH)) {
    console.warn(`[github] no repo cache at ${REPO_CACHE_PATH} — run \`npm run stats\``);
    repoCache = {};
    return repoCache;
  }

  try {
    repoCache = JSON.parse(readFileSync(REPO_CACHE_PATH, 'utf8')) as Record<string, RepoStats>;
  } catch (error) {
    console.warn(`[github] unreadable repo cache (${(error as Error).message})`);
    repoCache = {};
  }

  return repoCache;
}

/**
 * Cached detail for one "owner/name" repo, or null when it isn't in the cache —
 * private, renamed, or never fetched. Callers render nothing rather than
 * inventing numbers.
 */
export function getRepoStats(fullName: string): RepoStats | null {
  return loadRepoCache()[fullName] ?? null;
}
