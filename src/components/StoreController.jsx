import { Children, cloneElement, useState } from "react";
import Button from "@/components/ui/Button";
import { validColorFamilies, validFlags, validTags } from "@/data/tees";

const filterGroups = [
  { key: "flagsFilters", label: "Flags", options: validFlags },
  { key: "tagsFilters", label: "Tags", options: validTags },
  {
    key: "colorFamilyFilters",
    label: "Color family",
    options: validColorFamilies,
  },
];

const validFilters = {
  flagsFilters: validFlags,
  tagsFilters: validTags,
  colorFamilyFilters: validColorFamilies,
};

function getInitialFilters(filters, key) {
  const validOptions = validFilters[key];
  return Array.isArray(filters)
    ? filters.filter((filter) => validOptions.includes(filter))
    : [];
}

function formatFilterName(filter) {
  return filter
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (letter) => letter.toUpperCase());
}

export default function StoreController({
  children,
  flagsFilters,
  tagsFilters,
  colorFamilyFilters,
}) {
  const child = Children.only(children);
  const [currentFilters, setCurrentFilters] = useState({
    flagsFilters: getInitialFilters(flagsFilters, "flagsFilters"),
    tagsFilters: getInitialFilters(tagsFilters, "tagsFilters"),
    colorFamilyFilters: getInitialFilters(
      colorFamilyFilters,
      "colorFamilyFilters",
    ),
  });

  function toggleFilter(filterKey, filter) {
    setCurrentFilters((previous) => ({
      ...previous,
      [filterKey]: previous[filterKey].includes(filter)
        ? previous[filterKey].filter((activeFilter) => activeFilter !== filter)
        : [...previous[filterKey], filter],
    }));
  }

  return (
    <div className="flex flex-col lg:flex-row-reverse lg:items-start mt-21">
      <aside className="m-2 flex shrink-0 flex-col gap-6 rounded-lg border border-card-foreground/10 bg-card-foreground/5 p-4 text-card-foreground lg:sticky lg:top-22 lg:w-72 ">
        <div>
          <h2 className="text-2xl font-semibold">Filter products</h2>
        </div>
        {filterGroups.map(({ key, label, options }) => (
          <fieldset key={key} className="flex flex-col gap-2">
            <legend className="text-sm font-semibold text-card-foreground/70 ml-1 mb-1">
              {label}
            </legend>
            <div className="flex flex-wrap gap-2">
              {options.map((filter) => {
                const isSelected = currentFilters[key].includes(filter);

                return (
                  <Button
                    key={filter}
                    type="button"
                    flavour="outline"
                    size="sm"
                    aria-pressed={isSelected}
                    onClick={() => toggleFilter(key, filter)}
                    className={
                      isSelected
                        ? "border-card-foreground bg-card-foreground text-card"
                        : "border-card-foreground/20 text-card-foreground-supporting"
                    }
                  >
                    {formatFilterName(filter)}
                  </Button>
                );
              })}
            </div>
          </fieldset>
        ))}
      </aside>
      <div className="min-w-0 flex-1 lg:[&>div]:grid-cols-3">
        {cloneElement(child, {
          flagsFilters: currentFilters.flagsFilters,
          tagsFilters: currentFilters.tagsFilters,
          colorFamilyFilters: currentFilters.colorFamilyFilters,
        })}
      </div>
    </div>
  );
}
