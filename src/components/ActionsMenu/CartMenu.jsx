import Button from "@/components/ui/Button";

export default function CartMenu() {
  return (
    <div className="flex flex-row p-4 gap-4 items-center justify-between">
      <h1 className="text-xl">Cart is Empty.</h1>
      <Button flavour="solid" size="sm" className="px-12 ">
        Open Cart
      </Button>
    </div>
  );
}
