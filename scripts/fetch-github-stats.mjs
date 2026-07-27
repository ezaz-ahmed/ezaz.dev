/*
  Refreshes two build-time caches from the public GitHub API:

    src/data/github-cache.json  — profile-level numbers for the work grid
    src/data/repo-cache.json    — per-repo detail for each /work/<slug> page,
                                  one entry per `repo` field in work.json

  Runs as a prebuild step rather than inside the Astro build on purpose: Node 24
  on Windows aborts with
  `Assertion failed: !(handle->flags & UV_HANDLE_CLOSING), file src\win\async.c`
  when Astro exits after a socket has been used, turning a successful build into
  a non-zero exit. A standalone script exits cleanly, and the build stays a pure
  offline transform of the cached JSON.

  Never fails the build: a rate-limited, unreachable, or private-repo response
  leaves the existing cache entry in place and exits 0.

  Usage: npm run stats  (also runs automatically before npm run build)
*/
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const USER = process.env.GITHUB_USER ?? 'ezaz-ahmed';
const API = process.env.GITHUB_API_BASE ?? 'https://api.github.com';

/*
  Read from .env locally (the npm scripts pass --env-file-if-exists) and from
  the platform's build env in CI. Three jobs:
    - raises the REST ceiling from 60 req/hr per IP to 5000
    - unlocks the contribution total, which REST cannot serve at all
    - makes private repos listed in work.json resolvable
  Without it everything else still works; only `contributions` goes null and
  private repos are skipped.
*/
const TOKEN = process.env.GITHUB_TOKEN;

const GRAPHQL = process.env.GITHUB_GRAPHQL_URL ?? 'https://api.github.com/graphql';
const CACHE_PATH = resolve(process.cwd(), 'src/data/github-cache.json');
const REPO_CACHE_PATH = resolve(process.cwd(), 'src/data/repo-cache.json');
const WORK_PATH = resolve(process.cwd(), 'src/data/work.json');
const TIMEOUT_MS = 8000;
const PAGE_SIZE = 100;
const MAX_PAGES = 5;
const TOP_LANGUAGES = 4;
const TOP_REPO_LANGUAGES = 5;
const RECENT_COMMITS = 5;

async function request(path) {
  return fetch(`${API}${path}`, {
    headers: {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'ezaz.dev-build',
      ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
    },
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
}

async function api(path) {
  const response = await request(path);

  if (!response.ok) {
    throw new Error(`${path} → ${response.status} ${response.statusText}`);
  }

  return response.json();
}

function writeJson(path, data) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, `${JSON.stringify(data, null, 2)}\n`);
}

function readJson(path, fallback) {
  if (!existsSync(path)) return fallback;

  try {
    return JSON.parse(readFileSync(path, 'utf8'));
  } catch {
    return fallback;
  }
}

/**
 * Rounds a list of [name, weight] pairs to whole-percent shares that sum to
 * exactly 100, with the largest slice absorbing the rounding drift. Used for
 * both the profile language bar (weight = repo count) and the per-repo one
 * (weight = bytes).
 */
function toShares(ranked, topN) {
  if (!ranked.length) return [];

  const top = ranked.slice(0, topN);
  const rest = ranked.slice(topN).reduce((sum, [, weight]) => sum + weight, 0);
  if (rest) top.push(['other', rest]);

  const total = top.reduce((sum, [, weight]) => sum + weight, 0);
  const shares = top.map(([name, weight]) => ({
    name,
    count: weight,
    share: Math.round((weight / total) * 100),
  }));

  shares[0].share += 100 - shares.reduce((sum, lang) => sum + lang.share, 0);

  return shares;
}

/*
  ── profile ──────────────────────────────────────────────────────────────────
*/

/*
  Contribution total for the trailing year. GraphQL-only — the REST events feed
  shows public events for 90 days and nothing private, which for this account is
  2 events against a real total in the dozens.

  Queried with the account's own token, so private-repo contributions are
  included. Returns null (rather than throwing) whenever there's no token or the
  call fails: a missing contribution count must not cost us the REST numbers.
*/
async function contributionTotal() {
  if (!TOKEN) return null;

  const query = `query($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar { totalContributions }
      }
    }
  }`;

  try {
    const response = await fetch(GRAPHQL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
        'User-Agent': 'ezaz.dev-build',
      },
      body: JSON.stringify({ query, variables: { login: USER } }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    const body = await response.json();
    if (body.errors?.length) {
      throw new Error(body.errors.map((e) => e.message).join('; '));
    }

    return body.data.user.contributionsCollection.contributionCalendar.totalContributions;
  } catch (error) {
    console.warn(`[github] contributions unavailable (${error.message})`);
    return null;
  }
}

/** /repos caps at 100 per page, and the account is already past that. */
async function allRepos() {
  const repos = [];

  for (let page = 1; page <= MAX_PAGES; page++) {
    const batch = await api(`/users/${USER}/repos?per_page=${PAGE_SIZE}&type=owner&page=${page}`);
    repos.push(...batch);
    if (batch.length < PAGE_SIZE) break;
  }

  return repos;
}

/** Language split by repo count, top N plus an "other" remainder. */
function profileLanguages(repos) {
  const counts = {};
  for (const repo of repos) {
    if (repo.language) counts[repo.language] = (counts[repo.language] ?? 0) + 1;
  }

  const ranked = Object.entries(counts).sort((a, b) => b[1] - a[1]);

  return toShares(ranked, TOP_LANGUAGES);
}

async function refreshProfile() {
  const [user, repos, contributions] = await Promise.all([
    api(`/users/${USER}`),
    allRepos(),
    contributionTotal(),
  ]);

  // Forks aren't your work — exclude them from every derived number.
  const owned = repos.filter((repo) => !repo.fork);

  const data = {
    user: USER,
    repos: owned.length,
    stars: owned.reduce((sum, repo) => sum + repo.stargazers_count, 0),
    followers: user.followers,
    since: new Date(user.created_at).getUTCFullYear(),
    // Trailing 365 days, private work included. null without a token.
    contributions,
    languages: profileLanguages(owned),
    fetchedAt: new Date().toISOString(),
  };

  writeJson(CACHE_PATH, data);

  console.log(
    `[github] ${data.repos} repos · ${data.stars} stars · ${data.followers} followers · ` +
      `${data.contributions ?? '—'} contributions · ` +
      `${data.languages.map((lang) => lang.name).join('/')} → src/data/github-cache.json`
  );
}

/*
  ── per-repo detail ──────────────────────────────────────────────────────────
*/

/** The `repo` fields in work.json — the only repos any page renders. */
function repoTargets() {
  const work = readJson(WORK_PATH, null);
  if (!work) return [];

  const entries = [work.featured, ...(work.projects ?? [])].filter(Boolean);
  const names = entries.map((entry) => entry.repo).filter(Boolean);

  return [...new Set(names)];
}

/**
 * Total count for a paginated endpoint, read off the Link header's last page
 * with per_page=1. The cheap way to get a commit or contributor total — the
 * alternative is walking every page of a repo's history.
 */
async function countPages(path) {
  const response = await request(`${path}${path.includes('?') ? '&' : '?'}per_page=1`);

  // 409 = empty repository; 204 = no content (no contributors yet).
  if (response.status === 409 || response.status === 204) return 0;
  if (!response.ok) return null;

  const last = response.headers.get('link')?.match(/[?&]page=(\d+)>;\s*rel="last"/);
  if (last) return Number(last[1]);

  // No Link header means a single page — count what came back.
  const body = await response.json();
  return Array.isArray(body) ? body.length : null;
}

/** Language split by bytes, which is what /languages reports. */
async function repoLanguages(fullName) {
  const response = await request(`/repos/${fullName}/languages`);
  if (!response.ok) return [];

  const bytes = await response.json();
  const ranked = Object.entries(bytes).sort((a, b) => b[1] - a[1]);

  return toShares(ranked, TOP_REPO_LANGUAGES);
}

/** Latest commits, subject lines only — the body is noise at this size. */
async function recentCommits(fullName) {
  const response = await request(`/repos/${fullName}/commits?per_page=${RECENT_COMMITS}`);
  if (!response.ok) return [];

  const commits = await response.json();
  if (!Array.isArray(commits)) return [];

  return commits.map((commit) => ({
    sha: commit.sha.slice(0, 7),
    message: commit.commit.message.split('\n')[0],
    date: commit.commit.author?.date ?? commit.commit.committer?.date ?? null,
    author: commit.author?.login ?? commit.commit.author?.name ?? null,
    url: commit.html_url,
  }));
}

async function repoSnapshot(fullName) {
  const repo = await api(`/repos/${fullName}`);

  const [languages, commits, commitCount, contributors] = await Promise.all([
    repoLanguages(fullName),
    recentCommits(fullName),
    countPages(`/repos/${fullName}/commits`),
    countPages(`/repos/${fullName}/contributors?anon=1`),
  ]);

  return {
    fullName: repo.full_name,
    url: repo.html_url,
    description: repo.description,
    homepage: repo.homepage || null,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    watchers: repo.subscribers_count,
    openIssues: repo.open_issues_count,
    commits: commitCount,
    contributors,
    license: repo.license?.spdx_id ?? null,
    topics: repo.topics ?? [],
    defaultBranch: repo.default_branch,
    archived: Boolean(repo.archived),
    /** Checkout size in KB, as GitHub reports it. */
    size: repo.size,
    createdAt: repo.created_at,
    pushedAt: repo.pushed_at,
    languages,
    recentCommits: commits,
    fetchedAt: new Date().toISOString(),
  };
}

async function refreshRepos() {
  const targets = repoTargets();
  if (!targets.length) return;

  // Start from what's on disk so one unreachable repo doesn't drop the others.
  const cache = readJson(REPO_CACHE_PATH, {});
  const fresh = [];
  const kept = [];

  for (const fullName of targets) {
    try {
      cache[fullName] = await repoSnapshot(fullName);
      fresh.push(fullName);
    } catch (error) {
      kept.push(fullName);
      console.warn(`[github] ${fullName} skipped (${error.message})`);
    }
  }

  // Drop repos no longer referenced by work.json.
  for (const fullName of Object.keys(cache)) {
    if (!targets.includes(fullName)) delete cache[fullName];
  }

  writeJson(REPO_CACHE_PATH, cache);

  console.log(
    `[github] repos refreshed: ${fresh.join(', ') || 'none'}` +
      `${kept.length ? ` · kept cached: ${kept.join(', ')}` : ''} → src/data/repo-cache.json`
  );
}

try {
  await refreshProfile();
} catch (error) {
  console.warn(`[github] profile refresh skipped (${error.message}) — keeping existing cache`);
}

try {
  await refreshRepos();
} catch (error) {
  console.warn(`[github] repo refresh skipped (${error.message}) — keeping existing cache`);
}
