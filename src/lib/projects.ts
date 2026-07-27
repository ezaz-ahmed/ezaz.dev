/*
  Joins the two halves of a project: the card data in data/work.json (also used
  by the homepage grid) and the case study in data/projects.json, keyed by slug.

  Split on purpose — the homepage only pays for the summaries, and a case study
  can grow long without bloating what every visitor downloads first.
*/
import details from '../data/projects.json';
import work from '../data/work.json';
import type { Project, ProjectDetail, ProjectSummary, Work } from './types';

const { featured, projects } = work as Work;
const byslug = details as Record<string, ProjectDetail>;

/** Grid order: the featured tile first, then the small tiles. */
export const summaries: ProjectSummary[] = [featured, ...projects];

export const projectHref = (slug: string) => `/work/${slug}`;

/**
 * Every project that has a case study, in grid order. A summary without a
 * matching entry in projects.json is skipped and warned about rather than
 * generating a page with empty sections.
 */
export function getProjects(): Project[] {
  return summaries.flatMap((summary) => {
    const detail = byslug[summary.slug];

    if (!detail) {
      console.warn(`[work] no case study for "${summary.slug}" — add it to src/data/projects.json`);
      return [];
    }

    return [{ ...summary, detail }];
  });
}

/** The project before and after `slug` in grid order, for the pager. */
export function getNeighbours(slug: string) {
  const all = getProjects();
  const index = all.findIndex((project) => project.slug === slug);

  return {
    prev: index > 0 ? all[index - 1] : undefined,
    next: index >= 0 && index < all.length - 1 ? all[index + 1] : undefined,
  };
}
