import { createContext, useContext, useState, useEffect } from "react";
import tees from "@/data/tees";
import { getItem, setItem } from "@/utils/localStorage";

const CartContext = createContext(null);
//  prettier-ignore
/**
 * Sample cart items:
 *
 * { teeID: "black", amount: 1, finish: "matte", size: "M", gender: "men" },
 * { teeID: "dark-gray", amount: 1, finish: "textured", size: "XL", gender: "unisex" },
 * { teeID: "maroon", amount: 4, finish: "smooth", size: "L", gender: "women" },
 * { teeID: "dark-ash", amount: 1, finish: "smooth", size: "S", gender: "women" },
 * { teeID: "white", amount: 1, finish: "matte", size: "M", gender: "men" },
 * { teeID: "olive", amount: 1, finish: "matte", size: "L", gender: "men" },
 * { teeID: "mint", amount: 1, finish: "shiny", size: "L", gender: "men" },
 */

export function CartProvider({ children }) {
  
  const [cart, setCart] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [cartLocalStorage, setCartLocalStorage] = useState(getItem("cart")||[]);

  function addToCart(teeID, amount, finish, size, gender) {
    setCartLocalStorage((previousItems) => {
      const existingItemIndex = previousItems.findIndex(
        (item) =>
          item.teeID === teeID &&
          item.size === size &&
          item.finish === finish &&
          item.gender === gender,
      );

      if (existingItemIndex !== -1) {
        return previousItems.map((item, index) =>
          index === existingItemIndex
            ? { ...item, amount: item.amount + amount }
            : item,
        );
      }

      return [...previousItems, { teeID, amount, finish, size, gender }];
    });
  }

  useEffect(() => {
    setCart([]); //  Clear Cart everytime the cartLocalStorage prop changes to avoid duplicates.
    setTotalCost(0); // Total Cost starts with 0
    cartLocalStorage.forEach((cartItem) => {
      tees.forEach((tee) => {
        if (cartItem.teeID === tee.id) {
          setCart((prevCart) => [
            ...prevCart,
            {
              id: tee.id,
              slug: tee.slug,
              name: tee.name,
              image: tee.image,
              description: tee.description,
              size: cartItem.size,
              finish: cartItem.finish,
              gender: cartItem.gender,
              price: tee.price,
              amount: cartItem.amount,
              totalPrice: tee.price * cartItem.amount,
            },
          ]);
          setTotalCost((prevTotal) => prevTotal + tee.price * cartItem.amount);
        }
      });
    });
    setItem("cart", cartLocalStorage)
  }, [cartLocalStorage]);

  return (
    <CartContext.Provider value={{ cart, addToCart, totalCost }}>
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
