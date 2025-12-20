export function SectionDivider() {
  return (
    <div className="w-full py-4 relative">
      {/* Main thick stripe - fades on right */}
      <div
        className="h-3 transform -skew-x-12 mx-4"
        style={{
          transformOrigin: "left center",
          background: "linear-gradient(to right, var(--color-accent) 0%, var(--color-accent) 70%, transparent 100%)",
        }}
      />
      {/* Thin outline stripe - fades on right */}
      <div
        className="h-0.5 transform -skew-x-12 mx-4 mt-1 mr-8"
        style={{
          transformOrigin: "left center",
          background: "linear-gradient(to right, var(--color-accent) 0%, var(--color-accent) 60%, transparent 100%)",
        }}
      />
    </div>
  );
}