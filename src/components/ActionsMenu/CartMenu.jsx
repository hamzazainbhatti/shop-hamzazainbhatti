import Button from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";

export default function CartMenu({
  setCartPanelOpen,
  setIsSidebarOpen,
  closeActionMenu,
}) {
  const { cart } = useCart();
  return (
    <div className="flex flex-row p-4 gap-4 items-center justify-between">
      {cart.length <= 0 ? (
        <h1 className="text-xl">Cart is Empty.</h1>
      ) : (
        <h1 className="text-xl">{`Cart has ${cart.length} Items.`}</h1>
      )}
      <Button
        flavour="solid"
        size="sm"
        className="px-12 "
        onClick={() => {
          setCartPanelOpen(true);
          setIsSidebarOpen(true);
          closeActionMenu();
        }}
      >
        Open Cart
      </Button>
    </div>
  );
}
