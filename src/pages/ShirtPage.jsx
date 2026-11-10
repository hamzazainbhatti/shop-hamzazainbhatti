import { useState } from "react";
import { useParams } from "react-router";
import { Navigate } from "react-router";
import tees from "@/data/tees";
import { useCart } from "@/context/CartContext";
import Button from "@/components/ui/Button";
import { Minus, Plus } from "lucide-react";

function OptionTags({ label, options, selection, onSelect }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm uppercase tracking-wide text-primary/50">
        {label}
      </span>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            type="button"
            key={option}
            className={`rounded-full border px-3 py-1.5 text-sm capitalize transition-colors ${
              selection === option
                ? "border-primary bg-primary text-primary-foreground"
                : "border-primary/20 bg-primary/5 text-primary/50 hover:border-primary/50 hover:text-primary"
            }`}
            aria-pressed={selection === option}
            onClick={() => onSelect(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function ShirtPage() {
  const [selections, setSelections] = useState(["", "", ""]);
  const teeID = useParams().teeID;
  const tee = tees.find((tee) => tee.id === teeID) || null;
  const { addToCart } = useCart();
  const ready = selections.every(Boolean);
  const [quantity, setQuantity] = useState(1);

  return tee ? (
    <div className="grid grid-cols-3 p-4 pt-[96px] h-[600px] min-h-screen w-[100vh-32px] gap-4">
      <div className="flex flex-col justify-center bg-primary/20 text-primary/20 rounded-lg">
        <div className="w-full aspect-square overflow-hidden flex-shrink-0">
          <img
            src={tee.image}
            alt={tee.name}
            className="size-full object-cover object-left p-1 pl-3"
          />
        </div>
      </div>
      <div className="flex flex-col justify-center bg-primary/20 text-primary/20 rounded-lg">
        <div className="w-full aspect-square overflow-hidden flex-shrink-0">
          <img
            src={tee.image}
            alt={tee.name}
            className="size-full object-cover object-right p-1 pr-3"
          />
        </div>
      </div>
      <div className="grid grid-rows-[1fr_auto_auto]">
        <div className="flex flex-col gap-2 p-4 justify-between">
          <div>
            <h1 className="text-4xl text-primary/80">{tee.name}</h1>
            <h1 className="text-2xl text-primary/60">{tee.description}</h1>
          </div>
          <div className="flex flex-col text-2xl justify-right text-right text-primary/50">
            ${tee.price.toFixed(2)}
          </div>
        </div>
        <div className="bg-primary/5 text-primary/60 p-4 rounded-lg">
          <div className="flex flex-col gap-4">
            <OptionTags
              label="Fabric finish"
              options={tee.tags.filter((tag) =>
                ["textured", "matte", "smooth", "shiny"].includes(tag),
              )}
              selection={selections[0]}
              onSelect={(selection) =>
                setSelections((previous) => [
                  selection,
                  previous[1],
                  previous[2],
                ])
              }
            />
            <OptionTags
              label="Size"
              options={tee.sizes}
              selection={selections[1]}
              onSelect={(selection) =>
                setSelections((previous) => [
                  previous[0],
                  selection,
                  previous[2],
                ])
              }
            />
            <OptionTags
              label="T-shirt shape"
              options={
                tee.tags.includes("men") && tee.tags.includes("women")
                  ? ["unisex", "men", "women"]
                  : tee.tags.filter((tag) => ["men", "women"].includes(tag))
              }
              selection={selections[2]}
              onSelect={(selection) =>
                setSelections((previous) => [
                  previous[0],
                  previous[1],
                  selection,
                ])
              }
            />
          </div>
        </div>
        <div className="py-4">
          <div className="flex w-full flex-row items-stretch justify-between gap-4">
            <div className="w-2/3">
              <Button
                className="w-full text-card/75 hover:bg-secondary hover:text-foreground/60 hover:border-secondary transition-all duration-300 ease-in-out border-current/40"
                disabled={!ready}
                onClick={() =>
                  addToCart(
                    teeID,
                    quantity,
                    selections[0],
                    selections[1],
                    selections[2],
                  )
                }
              >
                Add to Cart
              </Button>
            </div>
            <div className="group flex min-h-9 w-1/3 items-center justify-center gap-[0.5em] overflow-hidden rounded-full border-[0.16em] border-current/40 bg-foreground px-4 py-2 text-base font-medium text-card/75 transition-all duration-300 ease-in-out hover:border-secondary hover:bg-secondary hover:text-foreground/60">
              <button
                className="flex w-1/3 flex-col items-center justify-center leading-0 text-[40px]"
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              >
                <Minus size={20} />
              </button>
              <div className="flex w-1/3 flex-col items-center justify-center text-lg">
                <h1 className="m-0 p-0 leading-6">{quantity}</h1>
              </div>
              <button
                className="flex w-1/3 flex-col items-center justify-center leading-0 text-[40px]"
                onClick={() => setQuantity((prev) => prev + 1)}
              >
                <Plus size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Navigate to={"/not-found"} />
  );
}
