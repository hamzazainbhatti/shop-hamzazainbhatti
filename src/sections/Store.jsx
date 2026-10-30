{
  /* 
      
      Give props as: 
      <Store flagsFilters={[ "flag01" , "flag02" , .... ]} tagFilters={[ "tag01" , "tag02" , .... ]} />
      <Store tagFilters={[ "tag01" , "tag02" , .... ]} />
      <Store flagsFilters={[ "flag01" , "flag02" , .... ]} />
      <Store />
      
    - If NO props, it will default to ALL "tees".
    - If ONLY "tags", it will show ONLY SPECIFIC "tees" with selected Tags. (ONLY Flags will NOT be filtered).
    - IF ONLY "flags", it will show ONLY SPECIFIC "tees" with selected Flags. (ONLY Tags will NOT be filtered).
    - If BOTH "tags" and "flags", it will show "tees" that contains specified Tags AND Flags. (Shows "tees" where BOTH given Flag(s) AND Tag(s) are found.)
    - DO NOT GIVE EMPTY ARRAYS AS flagFilters OR tagFilters. OR 100 YEAR BAD LUCK.

  */
}

import Button from "@/components/ui/Button";
import { tees } from "@/data/tees"; // TODO: add attribution
import { PlusCircle } from "lucide-react";

export default function Store({ flagsFilters, tagsFilters }) {
  //  Remove this and only God could tell you what this even is.
  //  prettier-ignore
  const filteredTees = tees.filter(
    (tee) =>
      (flagsFilters  === undefined || (
        (flagsFilters.includes("inStock") ? (tee.inStock ? true : false) : true) && // If there is NO "In Stock" filter applied, ignore filter. If "In Stock" tag is ACTIVE, tee MUST have "inStock" as TRUE
        (flagsFilters.includes("featured") ? (tee.featured ? true : false) : true) // IF there is NO "featured" filter applied, ignore filter. If "Featured" tag is ACTIVE, tee MUST have "feature" as TRUE
      )) &&
      (tagsFilters === undefined || (
        tagsFilters.every( (tagsFilter) => tee.tags.includes(tagsFilter) )
      )),
  );
  if (filteredTees.length === 0)
    console.log(
      `ERROR: Some filter were not found or most probably contains a typo.`,
    );

  return (
    <div className="grid gap-2 m-2 py-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {/* TODO: Render SOMETHING if no items are found.*/}
      {filteredTees.map((tee) => {
        return (
          <div key={tee.id} className="relative group/card bg-card rounded-lg">
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
  );
}
