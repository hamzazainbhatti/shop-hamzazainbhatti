import { useCart } from "@/context/CartContext";
import { Minus, Plus } from "lucide-react";

export default function CartPanel() {
  const { cart, totalCost } = useCart();
  const { updateCartItemQuantity } = useCart();
  const columns = ["", "Product", "Price", "Amount", "Total"];

  function handleQuantityChange(cartItem, newQuantity) {
    if (newQuantity < 1) {
      return; // Prevent quantity from going below 1
    }
    updateCartItemQuantity(cartItem.cartItemId, newQuantity);
  }

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-[96px_1fr_100px_170px_100px] mx-4 bg-card-foreground/10 rounded-lg">
        {columns.map((column) => (
          <div className="text-start p-2" key={`columnHeader${column}`}>
            {column}
          </div>
        ))}
      </div>
      <div className="flex flex-col divide-card-foreground/10 divide-y-2">
        {cart.map((cartItem) => (
          <div
            key={cartItem.cartItemId}
            className="grid grid-cols-[96px_1fr_100px_170px_100px] mx-4 py-4"
          >
            <div className="h-25 w-25 overflow-hidden flex-shrink-0">
              <img
                src={cartItem.image}
                alt={cartItem.name}
                className="size-full object-cover object-left p-1"
              />
            </div>
            <div className="p-2 pr-10 justify-between">
              <div className="text-xl">{cartItem.name}</div>
              <div className="text-card-foreground/80">
                {cartItem.description}
              </div>
              <div className="my-2">
                <span className="mx-1 py-1 px-2 bg-card-foreground/20 rounded-2xl">
                  {cartItem.size}
                </span>
              </div>
            </div>
            <div className="p-2 self-center">${cartItem.price}</div>
            <div className="h-8 w-24 self-center flex mx-2 bg-card-foreground/40 rounded-lg overflow-hidden">
              <button
                className="w-8 h-8 leading-0 text-[40px] flex flex-col justify-center items-center hover:bg-card-foreground/20"
                onClick={() =>
                  handleQuantityChange(
                    cartItem,
                    cartItem.amount + 1,
                  )
                }
              >
                <Plus size={20} />
              </button>
              <div className="w-8 h-8 text-lg flex flex-col justify-center items-center">
                <h1 className="mb-[1px] p-2">{cartItem.amount}</h1>
              </div>
              <button
                className="w-8 h-8 leading-0 text-[40px] flex flex-col justify-center items-center hover:bg-card-foreground/20"
                onClick={() =>
                  handleQuantityChange(
                    cartItem,
                    cartItem.amount - 1,
                  )
                }
              >
                <Minus size={20} />
              </button>
            </div>

            <div className="p-2 self-center">${cartItem.totalPrice}</div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-[96px_1fr_100px_170px_100px] mx-4 bg-card-foreground/10 rounded-lg">
        <div className="p-2"></div>
        <div className="p-2"></div>
        <div className="p-2"></div>
        <div className="p-2">Total Cost:</div>

        <div className="p-2">${totalCost.toFixed(2)}</div>
      </div>
    </div>
  );
}
