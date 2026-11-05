import tees from "@/data/tees";
import { twMerge } from "cn";
import { ArrowRight } from "lucide-react";

export default function ProductCardSM({ className, inputTeeId }) {
  const foundTee = tees.find((tee) => tee.id === inputTeeId) || null;
  return (
    <div
      className={twMerge(
        "bg-white/75 text-card/90 rounded-2xl w-110 h-40 flex flex-row shrink-0 group hover:bg-white transition-color/85 duration-500 ease-in-out cursor-pointer",
        className,
      )}
    >
      {foundTee != null ? (
        <>
          <div className="h-40 w-40 overflow-hidden flex-shrink-0">
            <img
              src={foundTee.image}
              alt={foundTee.name}
              className="size-full object-cover object-left p-1"
            />
          </div>
          <div className="flex flex-col gap-2 justify-between flex-grow-1 py-4">
            <h1 className="text-lg font-medium">
              {foundTee.name.toUpperCase()}{" "}
            </h1>
            <h1 className="text-md">{foundTee.description} </h1>
            <h1 className="text-lg">${foundTee.price.toFixed(2)} </h1>
          </div>
          <ArrowRight
            size={40}
            strokeWidth={1.7}
            className="text-card opacity-80 flex-shrink-0 mx-4 my-auto transition-transform duration-500 ease-in-out group-hover:translate-x-[10px]"
          />
        </>
      ) : (
        <div className="flex items-center justify-center size-full">
          <h1 className="text-xl">ITEM UNABLE TO LOAD CHECK TEE ID</h1>
        </div>
      )}
    </div>
  );
}
