import ImageProductCard from "@/components/ProductCards/ImageProductCard";
import ProductCard from "@/components/ProductCards/ProductCard";
import ProductsGrid from "@/components/ProductsGrid";
import { tees } from "@/data/tees";

const getTee = (id) => tees.find((tee) => tee.id === id);

export default function TestPage() {
  return (
    <main className="bg-black">
      <div className="mt-10">
        <ProductsGrid>
          <ImageProductCard
            image="/assets/tees-promotion-bgs/man-black-00.jpg"
            inputTeeId="black"
          />
          <ProductCard tee={getTee("black")} />
          <ProductCard tee={getTee("olive")} />
          <ImageProductCard
            image="/assets/tees-promotion-bgs/women-emerald-00.jpg"
            inputTeeId="green-2955"
          />
          <ProductCard tee={getTee("navy")} />
          <ProductCard tee={getTee("purple-2944")} />
          <ImageProductCard
            image="/assets/tees-promotion-bgs/women-dark-gray-00.jpg"
            inputTeeId="dark-gray"
          />
          <ProductCard tee={getTee("red")} />
          <ProductCard tee={getTee("dark-gray")} />
        </ProductsGrid>
      </div>
    </main>
  );
}
