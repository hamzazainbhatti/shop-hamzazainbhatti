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
        "group @container flex w-[max(30%,400px)] h-auto aspect-3/1 shrink-0 cursor-pointer flex-row rounded-2xl bg-white/55 text-card/90 transition-colors duration-500 ease-in-out hover:bg-white",
        className,
      )}
      onClick={() => navigate(`/shirt/${foundTee.slug}`)}
    >
      {foundTee != null ? (
        <>
          <div className="aspect-square h-full w-auto aspect-square shrink-0 overflow-hidden">
            <img
              src={foundTee.image}
              alt={foundTee.name}
              className="size-full object-cover object-left p-1"
            />
          </div>
          <div
            className={twMerge(
              "flex min-w-0 flex-1 flex-col justify-between gap-1 py-[2.5cqw] pr-[calc(4%+2px)]",
              contentClassName,
            )}
          >
            <h1 className="truncate text-[4.2cqw] font-medium">
              {foundTee.name.toUpperCase()}{" "}
            </h1>
            <h1 className="line-clamp-2 text-[3.5cqw] pr-9">
              {foundTee.description}
            </h1>
            <h1 className="text-[4cqw]">${foundTee.price.toFixed(2)}</h1>
          </div>
          <ArrowRight
            strokeWidth={1.7}
            className={twMerge(
              "absolute top-[calc(50%-3cqw)] right-2 size-[6cqw] shrink-0 text-card opacity-80 transition-transform duration-500 ease-in-out group-hover:translate-x-[10px]",
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
