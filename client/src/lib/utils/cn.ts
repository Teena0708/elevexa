type ClassValue = string | number | null | undefined | false;

/**
 * Minimal className combiner — avoids pulling in clsx/tailwind-merge
 * as new dependencies for a single utility function.
 */
export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(" ");
}
