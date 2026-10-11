export const PROJECT_CATEGORIES = [
  { value: "web", label: "Web Apps" },
  { value: "dashboard", label: "Dashboards" },
  { value: "api", label: "APIs" },
  { value: "mobile", label: "Mobile" },
  { value: "saas", label: "SaaS" },
  { value: "business", label: "Business Systems" },
  { value: "healthcare", label: "Healthcare" },
  { value: "education", label: "Education" },
  { value: "tools", label: "Tools" },
  { value: "ai", label: "AI" },
  { value: "other", label: "Other" },
] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number]["value"];

export const PROJECT_CATEGORY_VALUES: ProjectCategory[] = PROJECT_CATEGORIES.map(
  (c) => c.value,
);

export function isProjectCategory(value: unknown): value is ProjectCategory {
  return (
    typeof value === "string" &&
    (PROJECT_CATEGORY_VALUES as string[]).includes(value)
  );
}

export function categoryLabel(value: ProjectCategory | null | undefined) {
  return PROJECT_CATEGORIES.find((c) => c.value === value)?.label ?? "";
}
