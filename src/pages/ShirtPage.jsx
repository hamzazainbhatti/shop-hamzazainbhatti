import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Navigate } from "react-router";
import tees from "@/data/tees";
import { useCart } from "@/context/CartContext";
import Button from "@/components/ui/Button";
import Dropdown from "@/components/ui/Dropdown";

export default function ShirtPage() {
  const [selections, setSelections] = useState(["", "", ""]);
  const [ready, setReady] = useState(false);
  const teeID = useParams().teeID;
  const tee = tees.find((tee) => tee.id === teeID) || null;
  const { addToCart } = useCart();

  useEffect(() => {
    if (selections[0] !== "" && selections[1] !== "" && selections[2] !== "") {
      console.log(selections);
      setReady(true);
    }
  }, [selections]);

  return tee ? (
    <div className="grid grid-cols-3 p-4 pt-[96px] h-[600px] min-h-screen w-[100vh-32px] gap-4">
      <div className="grid grid-rows-[auto_1fr]">
        <div className="flex flex-col gap-2 p-4">
          <h1 className="text-4xl text-primary/80">{tee.name}</h1>
          <h1 className="text-2xl text-primary/60">{tee.description}</h1>
          <div className="flex flex-row w-full">
            <div className="flex flex-col text-2xl w-1/3 justify-center text-primary/50">
              ${tee.price.toFixed(2)}
            </div>
            <div className="w-2/3">
              <Button
                className="w-full text-card/75 hover:bg-secondary hover:text-foreground/60 hover:border-secondary transition-all duration-300 ease-in-out border-current/40"
                disabled={!ready}
                onClick={() =>
                  addToCart(
                    teeID,
                    1,
                    selections[0],
                    selections[1],
                    selections[2],
                  )
                }
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
        <div className="bg-primary/5 text-primary/60 p-4">
          <h1 className="text-center text-2xl pb-4">
            Select Your Prefered Style.
          </h1>
          <div className="flex flex-col gap-4">
            <Dropdown
              label="Select your fabric finish."
              options={tee.tags.filter(
                (finish) =>
                  (finish === "textured" ? finish : null) ||
                  (finish === "matte" ? finish : null) ||
                  (finish === "smooth" ? finish : null) ||
                  (finish === "shiny" ? finish : null),
              )} // ["Textured", "Matte", "Smooth", "Shiny"]
              onSelect={(selection) =>
                setSelections((previous) =>
                  previous.map((value, index) =>
                    index === 0 ? selection : value,
                  ),
                )
              }
            />
            <Dropdown
              label="Select your Size."
              options={tee.sizes} // ["Small", "Medium", "Large", "Extra Large"]
              onSelect={(selection) =>
                setSelections((size) =>
                  size.map((value, index) => (index === 1 ? selection : value)),
                )
              }
            />
            <Dropdown
              label="Select your T-Shirt Shape"
              options={
                (tee.tags.includes("men") && tee.tags.includes("women")
                  ? ["unisex", "men", "women"]
                  : null) ||
                tee.tags.filter(
                  (gender) =>
                    (gender === "men" ? gender : null) ||
                    (gender === "women" ? gender : null),
                )
              } // ["Men", "Women", "Unisex"]
              onSelect={(selection) =>
                setSelections((previous) =>
                  previous.map((value, index) =>
                    index === 2 ? selection : value,
                  ),
                )
              }
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center bg-primary/20 text-primary/20">
        <div className="w-full aspect-square overflow-hidden flex-shrink-0">
          <img
            src={tee.image}
            alt={tee.name}
            className="size-full object-cover object-left p-1 pl-3"
          />
        </div>
      </div>
      <div className="flex flex-col justify-center bg-primary/20 text-primary/20">
        <div className="w-full aspect-square overflow-hidden flex-shrink-0">
          <img
            src={tee.image}
            alt={tee.name}
            className="size-full object-cover object-right p-1 pr-3"
          />
        </div>
      </div>
    </div>
  ) : (
    <Navigate to={"/not-found"} />
  );
}
