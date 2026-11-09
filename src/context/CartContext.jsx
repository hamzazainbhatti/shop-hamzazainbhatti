import { createContext, useContext, useState, useEffect } from "react";
import tees from "@/data/tees";

const CartContext = createContext(null);

const cartIDsAndAmounts = [
  { teeID: "black", amount: 1 },
  { teeID: "dark-gray", amount: 1 },
  { teeID: "maroon", amount: 4 },
  { teeID: "dark-ash", amount: 1 },
  { teeID: "white", amount: 1 },
  { teeID: "olive", amount: 1 },
  { teeID: "mint", amount: 1 },
];

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    setCart([]); //  Clear Cart everytime the cartIDsAndAmounts prop changes to avoid duplicates.
    cartIDsAndAmounts.forEach((cartItem) => {
      tees.forEach((tee) => {
        if (cartItem.teeID === tee.id) {
          setCart((prevCart) => [
            ...prevCart,
            {
              ...tee,
              amount: cartItem.amount,
              totalPrice: tee.price * cartItem.amount,
            },
          ]);
          setTotalCost((prevTotal) => prevTotal + tee.price * cartItem.amount);
        }
      });
    });
  }, [cartIDsAndAmounts]);

  return (
    <CartContext.Provider value={{ cart, setCart, totalCost }}>
      {children}
    </CartContext.Provider>
  );
}

// Custom hook: components use this instead of useContext directly
export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside <CartProvider>");
  return context;
}
