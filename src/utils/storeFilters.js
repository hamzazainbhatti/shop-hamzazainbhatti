import {
  validColorFamilies,
  validFlags,
  validTags,
} from "@/data/tees";

export const storeFilterKeys = {
  flagsFilters: "flag",
  tagsFilters: "tag",
  colorFamilyFilters: "colorFamily",
};

export const storeFilterOptions = {
  flagsFilters: validFlags,
  tagsFilters: validTags,
  colorFamilyFilters: validColorFamilies,
};

export function getValidFilters(values, filterKey) {
  const options = storeFilterOptions[filterKey];

  if (!Array.isArray(values) || !options) {
    return [];
  }

  return [...new Set(values)].filter((value) => options.includes(value));
}

export function getFiltersFromSearchParams(searchParams) {
  return Object.fromEntries(
    Object.entries(storeFilterKeys).map(([filterKey, queryKey]) => [
      filterKey,
      getValidFilters(searchParams.getAll(queryKey), filterKey),
    ]),
  );
}

export function setSearchParamsFromFilters(searchParams, filters) {
  const nextSearchParams = new URLSearchParams(searchParams);

  Object.entries(storeFilterKeys).forEach(([filterKey, queryKey]) => {
    nextSearchParams.delete(queryKey);
    getValidFilters(filters[filterKey], filterKey).forEach((value) => {
      nextSearchParams.append(queryKey, value);
    });
  });

  return nextSearchParams;
}
