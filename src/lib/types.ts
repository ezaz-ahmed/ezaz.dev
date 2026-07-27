/*
  Shapes for the JSON in src/data/. Components import the JSON and cast it to
  these, so a typo in a data file surfaces at the import site rather than as a
  blank spot in the page.
*/

/**
 * Card-level project data: everything the work grid needs, plus the keys the
 * case-study page joins on. `slug` is the only link source — cards build
 * /work/<slug> themselves rather than carrying a hand-written href.
 */
export type ProjectSummary = {
  /** URL segment for /work/<slug>. Must match a key in data/projects.json. */
  slug: string;
  title: string;
  /** Short qualifier shown beside the title, e.g. "local-first budgeting". */
  kicker: string;
  /** Path under public/. */
  img: string;
  desc: string;
  stack: string[];
  /** "owner/name" on GitHub. Omit for private or repo-less work. */
  repo?: string;
  /** Live deployment. Omit when there is nothing public to open. */
  preview?: string;
};

/** A lead paragraph plus the bullets under it — the problem/solution blocks. */
export type ProjectBlock = {
  lead: string;
  points: string[];
};

/** One labelled row of the stack breakdown, e.g. "data" → Postgres, Prisma. */
export type StackGroup = {
  label: string;
  items: string[];
};

/** Headline number on the case study, e.g. "40k" / "requests a day". */
export type ProjectMetric = {
  value: string;
  label: string;
};

/** A titled paragraph — used for the engineering notes list. */
export type ProjectNote = {
  title: string;
  body: string;
};

/** The long-form half of a project, kept out of the homepage payload. */
export type ProjectDetail = {
  /** One or two sentences under the title on the case-study page. */
  summary: string;
  /** Free text, e.g. "2024 — now". */
  year: string;
  role: string;
  /** Short state word, e.g. "live", "wip", "archived". */
  status: string;
  problem: ProjectBlock;
  solution: ProjectBlock;
  stack: StackGroup[];
  metrics: ProjectMetric[];
  notes: ProjectNote[];
};

/** A summary joined to its case study — what the detail page renders. */
export type Project = ProjectSummary & { detail: ProjectDetail };

export type NavLink = {
  href: string;
  label: string;
};

/** A run of hero copy; `strong` renders it emphasized inline. */
export type IntroPart = {
  text: string;
  strong?: boolean;
};

export type HeroAction = NavLink & {
  variant?: 'primary' | 'secondary';
};

export type Hero = {
  status: string;
  name: string;
  intro: IntroPart[];
  /** Speech bubble revealed when the portrait is hovered. */
  bubble: string;
  avatar: { src: string; alt: string };
  actions: HeroAction[];
};

export type Note = {
  /** Fake commit hash used as the entry's marker. */
  hash: string;
  date: string;
  tag: string;
  title: string;
  href: string;
  desc: string;
};

export type Availability = {
  href: string;
  status: string;
  headline: string;
  command: string;
  cta: string;
};

export type Work = {
  heading: string;
  featured: ProjectSummary;
  projects: ProjectSummary[];
  /** Tech names for the marquee tile. */
  rotation: string[];
  availability: Availability;
};

export type Site = {
  owner: string;
  email: string;
  footerLinks: NavLink[];
};

export type SelectOption = {
  value: string;
  label: string;
};

type BaseField = {
  name: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  hint?: string;
};

export type TextFieldData = BaseField & { autocomplete?: string; maxlength?: number };
export type SelectFieldData = BaseField & { options: SelectOption[] };
export type TextAreaFieldData = BaseField & { rows?: number; maxlength?: number };

export type ContactContent = {
  heading: string;
  intro: string;
  action: string;
  method: string;
  submitLabel: string;
  fields: {
    name: TextFieldData;
    email: TextFieldData;
    company: TextFieldData;
    subject: SelectFieldData;
    message: TextAreaFieldData;
  };
};
