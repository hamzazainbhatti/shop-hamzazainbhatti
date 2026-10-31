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
      - validFlags: ["inStock", "featured"]
      - validTags: ["men", "women", "dark", "colored", "matte", "light", "earthy", "shiny", "bright", "smooth", "textured"]

    - Incorrect spelling of flags or tags will result in an error message in the console and no items will be displayed.

  */
}

import Button from "@/components/ui/Button";
import { tees, validFlags, validTags } from "@/data/tees"; // TODO: add attribution
import { PlusCircle } from "lucide-react";

export default function Store({
  flagsFilters = ["featured"],
  tagsFilters = ["dark"],
}) {
  //  prettier-ignore
  const isTagsAndFlagsValid = 
    (
      flagsFilters.every((flagFilter)=>(
        validFlags.includes(flagFilter)
      )) &&
      tagsFilters.every((tagFilter)=>(
        validTags.includes(tagFilter)
      ))
    )

  //  Remove comment under it and only God could tell you what filteredTees even is.
  //  prettier-ignore
  const filteredTees = 
    isTagsAndFlagsValid ?
      tees.filter(
        (tee) => (
          (flagsFilters  === undefined || (
            (flagsFilters.includes("inStock") ? (tee.inStock ? true : false) : true) && 
            (flagsFilters.includes("featured") ? (tee.featured ? true : false) : true) 
          )) 
            &&
          (tagsFilters === undefined || (
            tagsFilters.every( (tagsFilter) => tee.tags.includes(tagsFilter) )
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
          {filteredTees.map((tee) => {
            return (
              <div
                key={tee.id}
                className="relative group/card bg-card rounded-lg"
              >
                <div className="relative aspect-square overflow-hidden rounded-xl">
                  <img
                    className="absolute left-0 top-0 h-full w-[200%] max-w-none group-has-[button:hover]/card:drop-shadow-xl/30 group-has-[button:hover]/card:-top-1.5 hover:-left-full transition-all duration-300"
                    src={tee.image}
                    alt={tee.name}
                  ></img>
                </div>
                <div className="relative flex flex-col px-4 pt-0 pb-16 gap-2 text-card-foreground-supporting">
                  <h3 className="font-semibold">{tee.name}</h3>
                  <p>{tee.description}</p>
                </div>
                <p className="absolute bottom-0 left-0 m-4 text-lg italic font-normal  text-card-foreground-supporting">
                  ${tee.price.toFixed(0)}
                </p>
                <Button
                  flavour="outlinedButton"
                  className="absolute group/button flex flex-row w-40 bottom-0 right-0 m-4 justify-between pr-1 text-card-foreground-supporting/90 border-card-foreground-supporting/80 hover:bg-card-foreground-supporting/90 hover:text-[#f7f6f3] hover:border-card-foreground-supporting/90 transition-colors duration-200 ease-in-out"
                >
                  Add to Cart
                  <PlusCircle className="transition-transform duration-400 group-hover/button:rotate-90" />
                </Button>
              </div>
            );
          })}
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
          </div>
        </div>
      ) : null}
    </>
  );
}
