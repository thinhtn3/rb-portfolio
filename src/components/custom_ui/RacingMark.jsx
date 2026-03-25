/**
 * RacingMark — two forward-leaning speed stripes that replace the "//" markers.
 * Uses CSS currentColor so it inherits the parent's text color when needed,
 * but defaults to the site accent color.
 *
 * Size control: pass a Tailwind height class via className (e.g. "h-4", "h-6").
 * Width is always `w-auto` so it scales proportionally with the viewBox.
 */
export function RacingMark({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 14"
      className={`inline-block shrink-0 w-auto h-3.5 ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* First stripe — full opacity */}
      <polygon
        points="2,0 8,0 11,14 5,14"
        fill="var(--color-accent)"
      />
      {/* Second stripe — faded to create depth / speed-trail effect */}
      <polygon
        points="13,0 19,0 22,14 16,14"
        fill="var(--color-accent)"
        opacity="0.45"
      />
    </svg>
  );
}
