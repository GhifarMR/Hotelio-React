/** Filled star count from a 0–5 rating (rounded). */
export function getRatingStars(rating: number): string {
  const count = Math.min(5, Math.max(0, Math.round(rating)));
  return "★".repeat(count);
}

/** Display label, e.g. "4.8 stars" */
export function formatRatingLabel(rating: number): string {
  return `${rating.toFixed(1)} stars`;
}
