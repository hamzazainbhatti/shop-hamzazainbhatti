import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import Button from "@/components/ui/Button";
import { getFinishOptions, getShapeOptions } from "@/utils/productMetadata";

const addToCartButtonClassName =
  "border-card-foreground/80 bg-card-foreground text-card hover:bg-card hover:text-card-foreground";
const addToCartButtonHoverClassName =
  "border-card-foreground/20 bg-card text-card-foreground";

function OptionTags({ label, options, selection, onSelect }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm uppercase tracking-wide text-card-foreground-supporting">
        {label}
      </span>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            type="button"
            key={option}
            className={`rounded-full border px-3 py-1.5 text-sm capitalize transition-colors ${
              selection === option
                ? "border-card-foreground bg-card-foreground text-card"
                : "border-card-foreground/20 bg-card text-card-foreground-supporting hover:border-card-foreground/50 hover:text-card-foreground"
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

export default function AddToCartDropdown({ tee }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selections, setSelections] = useState(["", "", ""]);
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const ready = selections.every(Boolean);
  const finishOptions = getFinishOptions(tee);
  const shapeOptions = getShapeOptions(tee);

  function selectOption(index, selection) {
    setSelections((previous) =>
      previous.map((value, optionIndex) =>
        optionIndex === index ? selection : value,
      ),
    );
  }

  function handleAddToCart() {
    if (!ready) return;

    if (!tee.inStock) {
      showToast("This item is out of stock", "error");
      return;
    }

    addToCart(tee.id, 1, selections[0], selections[1], selections[2]);
    showToast("Item added to cart", "success");
    setIsOpen(false);
  }

  return (
    <div className="relative w-full">
      {isOpen ? (
        <div className="absolute bottom-[calc(100%+15px)] right-0 z-100 w-[calc(100cqw-16px)] flex flex-col gap-4 rounded-lg border border-card-foreground/20 bg-card p-4 text-card-foreground shadow-xl">
          <OptionTags
            label="Fabric finish"
            options={finishOptions}
            selection={selections[0]}
            onSelect={(selection) => selectOption(0, selection)}
          />
          <OptionTags
            label="Size"
            options={tee.sizes}
            selection={selections[1]}
            onSelect={(selection) => selectOption(1, selection)}
          />
          <OptionTags
            label="T-shirt shape"
            options={shapeOptions}
            selection={selections[2]}
            onSelect={(selection) => selectOption(2, selection)}
          />
          <Button
            flavour="outline"
            icon="plus"
            disabled={!ready}
            onClick={handleAddToCart}
            className={`w-full justify-between ${addToCartButtonClassName} disabled:cursor-not-allowed disabled:opacity-40`}
          >
            Add to Cart
          </Button>
        </div>
      ) : null}
      <Button
        flavour="outline"
        icon="plus"
        iconClassName={`transition-transform duration-400 group-hover/button:rotate-90 ${
          isOpen ? "!rotate-135" : ""
        }`}
        weight="normal"
        labelAlign="start"
        onClick={() => setIsOpen((previous) => !previous)}
        className={`group/button flex w-full flex-row justify-between pr-2 pl-4 transition-colors duration-200 ease-in-out h-10 ${
          isOpen ? addToCartButtonHoverClassName : addToCartButtonClassName + ""
        }`}
        labelClassName="relative grid overflow-hidden text-[max(4cqw,0.9rem)]"
      >
        <span
          className={`col-start-1 row-start-1 transition-transform duration-300 ${
            isOpen ? "translate-y-full" : "translate-y-0"
          }`}
        >
          Add To Cart
        </span>
        <span
          className={`col-start-1 row-start-1 transition-transform duration-300 ${
            isOpen ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          Close
        </span>
      </Button>
    </div>
  );
}
