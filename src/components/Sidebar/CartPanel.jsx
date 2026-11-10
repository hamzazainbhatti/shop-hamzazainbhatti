import { useCart } from "@/context/CartContext";
import { Minus, Plus, Trash2 } from "lucide-react";

export default function CartPanel() {
  const { cart, totalCost } = useCart();
  const { updateCartItemQuantity, deleteCartItem } = useCart();
  const columns = ["", "Product", "Price", "Amount", "Total"];

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-[96px_1fr_100px_170px_100px_50px] mx-4 bg-card-foreground/10 rounded-lg">
        {columns.map((column) => (
          <div className="text-start p-2" key={`columnHeader${column}`}>
            {column}
          </div>
        ))}
      </div>
      <div className="flex flex-col divide-card-foreground/10 divide-y-2 min-h-[calc(100vh-190px)]">
        {cart.length === 0 ? (
          <div className="w-full h-full flex flex-col justify-center">
            <h1 className="text-center text-2xl text-primary/40">
              Cart is Empty.
            </h1>
          </div>
        ) : null}
        {cart.map((cartItem) => (
          <div
            key={cartItem.cartItemId}
            className="grid grid-cols-[96px_1fr_100px_170px_100px_50px] mx-4 py-4"
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
            <div className="group mx-2 flex h-9 w-28 self-center items-center justify-center gap-[0.25em] overflow-hidden rounded-full border-[0.16em] border-current/40 bg-foreground px-2 py-1 text-sm font-medium text-card/75 transition-all duration-300 ease-in-out hover:border-secondary hover:bg-secondary hover:text-foreground/60">
              <button
                className="flex w-1/3 flex-col items-center justify-center leading-0 text-[28px]"
                onClick={() =>
                  updateCartItemQuantity(
                    cartItem.cartItemId,
                    cartItem.amount - 1,
                  )
                }
              >
                <Minus size={16} />
              </button>
              <div className="flex w-1/3 flex-col items-center justify-center text-base">
                <h1 className="m-0 p-0 leading-5">{cartItem.amount}</h1>
              </div>
              <button
                className="flex w-1/3 flex-col items-center justify-center leading-0 text-[28px]"
                onClick={() =>
                  updateCartItemQuantity(
                    cartItem.cartItemId,
                    cartItem.amount + 1,
                  )
                }
              >
                <Plus size={16} />
              </button>
            </div>

            <div className="p-2 self-center">${cartItem.totalPrice}</div>
            <div className="p-2 self-center">
              <button
                className="text hover:text-red-700"
                onClick={() => deleteCartItem(cartItem.cartItemId)}
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-[96px_1fr_100px_170px_100px_50px] mx-4 bg-card-foreground/10 rounded-lg">
        <div className="p-2"></div>
        <div className="p-2"></div>
        <div className="p-2"></div>
        <div className="p-2">Total Cost:</div>

        <div className="p-2">${totalCost.toFixed(2)}</div>
      </div>
    </div>
  );
}
