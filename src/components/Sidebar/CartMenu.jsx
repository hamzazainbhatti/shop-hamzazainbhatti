import tees from "@/data/tees";
import { useState, useEffect } from "react";

export default function CartMenu({ cartIDsAndAmounts }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setCart([]); //  Clear Cart everytime the cartIDsAndAmounts prop changes to avoid duplicates.
    cartIDsAndAmounts.forEach((cartItem) => {
      tees.forEach((tee) => {
        if (cartItem.teeID === tee.id) {
          setCart((prevCart) => [
            ...prevCart,
            { ...tee, amount: cartItem.amount },
          ]);
        }
      });
    });
  }, [cartIDsAndAmounts]);

  return (
    <div className="flex flex-col gap-2 bg-[red]">
      {cart.map((cartItem) => (
        <div
          key={cartItem.id}
          className="flex flex-row justify-between bg-[blue] text-black p-2 mx-2"
        >
          <div className="h-40 w-40 overflow-hidden flex-shrink-0">
            <img
              src={cartItem.image}
              alt={cartItem.name}
              className="size-full object-cover object-left p-1"
            />
          </div>
          <span className="font-bold">{cartItem.name}</span>
          <span className="font-bold">${cartItem.price.toFixed(2)}</span>
          <span className="font-bold">{cartItem.amount}</span>
        </div>
      ))}
    </div>
  );
}
