{
  /* 

      Give props as: 
      <Store flagsFilters={[ "flag01" , "flag02" , .... ]} tagFilters={[ "tag01" , "tag02" , .... ]} />
      <Store tagFilters={[ "tag01" , "tag02" , .... ]} />
      <Store flagsFilters={[ "flag01" , "flag02" , .... ]} />
      <Store />
      
    - If NO props, it will default to ALL "tees".
    - If ONLY "tags", it will show ONLY SPECIFIC "tees" with selected Tags. (ONLY Tags will be filtered).
    - IF ONLY "flags", it will show ONLY SPECIFIC "tees" with selected Flags. (ONLY Flags will be filtered).
    - If BOTH "tags" and "flags", it will show "tees" that contains specified Tags AND Flags. (Shows "tees" where BOTH given Flag(s) AND Tag(s) are found.)
    - DO NOT GIVE EMPTY STRINGS IN ARRAYS AS flagFilters OR tagFilters. OR 100 YEAR BAD LUCK.

    - You may use the following valid flags and tags for filtering:
      - validFlags: ["inStock", "featured", "new"]
      - validTags: ["men", "women", "dark", "colored", "matte", "light", "earthy", "shiny", "bright", "smooth", "textured"]

    - Incorrect spelling of flags or tags will result in an error message in the console and no items will be displayed.

  */
}

import ProductCard from "@/components/ProductCards/ProductCard";
import {
  tees,
  validColorFamilies,
  validFlags,
  validTags,
} from "@/data/tees"; // TODO: add attribution
import { getColorFamily, isNewProduct } from "@/utils/productMetadata";

export default function Store({
  flagsFilters,
  tagsFilters,
  colorFamilyFilters,
}) {
  //  prettier-ignore
  const isTagsAndFlagsValid = 
    (
      (flagsFilters  === undefined || flagsFilters.every((flagFilter)=>(
        validFlags.includes(flagFilter)
      ))) &&
      (tagsFilters === undefined || tagsFilters.every((tagFilter)=>(
        validTags.includes(tagFilter)
      ))) &&
      (colorFamilyFilters === undefined || colorFamilyFilters.every((colorFamilyFilter)=>(
        validColorFamilies.includes(colorFamilyFilter)
      )))
    )

  //  Remove comment under it and only God could tell you what filteredTees even is.
  //  prettier-ignore
  const filteredTees = 
    isTagsAndFlagsValid ?
      tees.filter(
        (tee) => (
          (flagsFilters  === undefined || (
            (flagsFilters.includes("inStock") ? tee.inStock : true) &&
            (flagsFilters.includes("featured") ? tee.featured : true) &&
            (flagsFilters.includes("new") ? isNewProduct(tee) : true)
          )) 
            &&
          (tagsFilters === undefined || (
            tagsFilters.every( (tagsFilter) => tee.tags.includes(tagsFilter) )
          )) &&
          (colorFamilyFilters === undefined || (
            colorFamilyFilters.every((colorFamilyFilter) =>
              getColorFamily(tee) === colorFamilyFilter
            )
          ))
        )
      )
    : undefined;

  const noItemsFound = filteredTees === undefined || filteredTees.length === 0;
  if (!isTagsAndFlagsValid)
    console.log(
      `ERROR: Some filter were not found or most probably contains a typo.`,
    );

  return (
    <>
      {!noItemsFound ? (
        <div className="grid gap-2 m-2 py-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredTees.map((tee) => (
            <ProductCard key={tee.id} tee={tee} />
          ))}
        </div>
      ) : null}

      {noItemsFound ? (
        <div className="flex flex-col justify-center items-center w-screen  max-w-full p-20 text-xl font-light">
          {filteredTees === undefined ? <h1>FOUND TYPO IN FILTERS</h1> : null}
          {filteredTees?.length === 0 ? <h1>NO ITEMS FOUND</h1> : null}
          <p className="pb-2">Please try adjusting your filters...</p>
          <div className="flex flex-row gap-1">
            {flagsFilters?.map((flagFilter) => (
              <span className="border rounded-2xl px-2 pb-1 border-[#ffa2006e] text-[#ffa200]">
                {flagFilter}
              </span>
            ))}
            {tagsFilters?.map((tagFilter) => (
              <span className="border rounded-2xl px-2 pb-1 border-[#ffa2006e] text-[#ffa200]">
                {tagFilter}
              </span>
            ))}
            {colorFamilyFilters?.map((colorFamilyFilter) => (
              <span className="border rounded-2xl px-2 pb-1 border-[#ffa2006e] text-[#ffa200]">
                {colorFamilyFilter}
              </span>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
}
