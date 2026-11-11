const FINISH_TAGS = ["textured", "matte", "smooth", "shiny"];
const NEW_PRODUCT_DAYS = 30;

const colorFamilies = {
  black: "neutral",
  white: "neutral",
  gray: "neutral",
  ash: "neutral",
  navy: "blue",
  mint: "blue",
  olive: "green",
  forest: "green",
  emerald: "green",
  red: "red",
  magenta: "red",
  maroon: "red",
  purple: "purple",
  violet: "purple",
  brown: "brown",
};

function toUtcDay(value) {
  if (value instanceof Date) {
    return Date.UTC(value.getFullYear(), value.getMonth(), value.getDate());
  }

  const [year, month, day] = value.split("-").map(Number);
  return Date.UTC(year, month - 1, day);
}

export function getFinishOptions(tee) {
  return tee.tags.filter((tag) => FINISH_TAGS.includes(tag));
}

export function getShapeOptions(tee) {
  if (tee.tags.includes("men") && tee.tags.includes("women")) {
    return ["unisex", "men", "women"];
  }

  return tee.tags.filter((tag) => ["men", "women"].includes(tag));
}

export function isNewProduct(tee, now = new Date()) {
  const ageInDays = Math.floor(
    (toUtcDay(now) - toUtcDay(tee.addedAt)) / 86400000,
  );

  return ageInDays >= 0 && ageInDays <= NEW_PRODUCT_DAYS;
}

export function getProductBadges(tee, now) {
  return [
    tee.featured ? "Featured" : null,
    tee.inStock ? null : "Out of stock",
    isNewProduct(tee, now) ? "New" : null,
  ].filter(Boolean);
}

export function getColorFamily(tee) {
  return colorFamilies[tee.colors] ?? null;
}
