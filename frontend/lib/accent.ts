export type Accent = "primary" | "tertiary" | "secondary" | "muted";

export const accentText: Record<Accent, string> = {
  primary: "text-primary",
  tertiary: "text-tertiary",
  secondary: "text-secondary",
  muted: "text-on-surface-variant",
};

export const accentBg: Record<Accent, string> = {
  primary: "bg-primary",
  tertiary: "bg-tertiary",
  secondary: "bg-secondary",
  muted: "bg-outline",
};

// Precomputed (non-templated) so Tailwind's static class scanner picks them up.
export const accentGroupHoverText: Record<Accent, string> = {
  primary: "group-hover:text-primary",
  tertiary: "group-hover:text-tertiary",
  secondary: "group-hover:text-secondary",
  muted: "group-hover:text-on-surface-variant",
};
