import { getProductBadges } from "@/utils/productMetadata";

const badgeClassNames = {
  Featured: "border-card-foreground/30 bg-card-foreground text-card",
  New: "border-secondary bg-secondary text-secondary-foreground",
  "Out of stock": "border-destructive/40 bg-destructive/10 text-destructive",
};

export default function ProductBadges({ tee, className = "" }) {
  const badges = getProductBadges(tee);

  return (
    <div className={`flex min-h-8 flex-wrap items-center gap-1.5 ${className}`}>
      {badges.map((badge) => (
        <span
          key={badge}
          className={`rounded-full border px-2.5 py-1 text-xs font-medium ${badgeClassNames[badge]}`}
        >
          {badge}
        </span>
      ))}
    </div>
  );
}
