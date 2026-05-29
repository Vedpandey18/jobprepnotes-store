export const BLOG_CATEGORIES = {
  jobs: {
    label: "Jobs",
    shortLabel: "Job openings",
    color: "bg-blue-100 text-blue-800 border-blue-200",
  },
  "interview-tips": {
    label: "Interview Tips",
    shortLabel: "Prep guides",
    color: "bg-violet-100 text-violet-800 border-violet-200",
  },
  qa: {
    label: "Q&A",
    shortLabel: "Questions & answers",
    color: "bg-emerald-100 text-emerald-800 border-emerald-200",
  },
} as const;

export type BlogCategory = keyof typeof BLOG_CATEGORIES;

export const BLOG_CATEGORY_LIST: BlogCategory[] = ["jobs", "interview-tips", "qa"];

export function isBlogCategory(value: string | undefined): value is BlogCategory {
  return value != null && value in BLOG_CATEGORIES;
}

export function getCategoryLabel(category: string): string {
  if (isBlogCategory(category)) return BLOG_CATEGORIES[category].label;
  return "Interview Tips";
}

export const BLOG_CONTENT_TEMPLATES: Record<BlogCategory, string> = {
  jobs: `Company: TCS / Infosys / etc.
Role: Java Developer
Location: Bangalore / Remote
Experience: 0–2 years
Salary: ₹4–6 LPA (optional)

## Job description
Write what the role is about.

## Skills required
- Skill 1
- Skill 2

## How to apply
Apply link: https://...
Or email: careers@company.com`,

  "interview-tips": `Short intro — who this tip is for.

## Key tips
- Tip 1
- Tip 2
- Tip 3

## Common mistakes
- Mistake 1

## Related notes
Check our Java / Data Engineer notes on the Products page.`,

  qa: `## Question
Write the interview question here.

## Answer
Write a clear, structured answer.

## Follow-up questions
- Related question 1
- Related question 2

## Pro tip
One line of extra advice.`,
};
