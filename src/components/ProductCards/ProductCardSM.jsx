import { tees } from "@/data/tees";
import { twMerge } from "cn";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";

export default function ProductCardSM({
  className,
  inputTeeId,
  contentClassName,
}) {
  const navigate = useNavigate();
  const foundTee = tees.find((tee) => tee.id === inputTeeId) || null;
  return (
    <div
      className={twMerge(
        "group flex h-[clamp(7rem,12vw,10rem)] w-[min(90vw,27.5rem)] shrink-0 cursor-pointer flex-row rounded-2xl bg-white/75 text-card/90 transition-colors duration-500 ease-in-out hover:bg-white sm:w-[min(70vw,27.5rem)]",
        className,
      )}
      onClick={() => navigate(`/shirt/${foundTee.slug}`)}
    >
      {foundTee != null ? (
        <>
          <div className="aspect-square h-full w-[clamp(7rem,12vw,10rem)] shrink-0 overflow-hidden">
            <img
              src={foundTee.image}
              alt={foundTee.name}
              className="size-full object-cover object-left p-1"
            />
          </div>
          <div
            className={twMerge(
              "flex min-w-0 flex-1 flex-col justify-between gap-1 px-[clamp(0.75rem,1.5vw,1rem)] py-[clamp(0.75rem,1.5vw,1rem)]",
              contentClassName,
            )}
          >
            <h1 className="truncate text-[clamp(0.875rem,1.5vw,1.125rem)] font-medium">
              {foundTee.name.toUpperCase()}{" "}
            </h1>
            <h1 className="line-clamp-2 text-[clamp(0.75rem,1.25vw,1rem)]">
              {foundTee.description}
            </h1>
            <h1 className="text-[clamp(0.875rem,1.5vw,1.125rem)]">
              ${foundTee.price.toFixed(2)}
            </h1>
          </div>
          <ArrowRight
            size={32}
            strokeWidth={1.7}
            className={twMerge(
              "my-auto mx-[clamp(0.75rem,1.5vw,1rem)] size-[clamp(1.5rem,3vw,2.5rem)] shrink-0 text-card opacity-80 transition-transform duration-500 ease-in-out group-hover:translate-x-[10px]",
              contentClassName,
            )}
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
