import ProductCard from "@/components/ProductCards/ProductCard";
import { tees } from "@/data/tees";

const getTee = (id) => tees.find((tee) => tee.id === id);

export default function TestPage() {
  return (
    <main className=" mt-20 min-h-[200vh] bg-white">
      <ProductCard
        className="absolute right-100 bottom-20 bg-gray-200"
        tee={getTee("olive")}
      />
    </main>
  );
}
