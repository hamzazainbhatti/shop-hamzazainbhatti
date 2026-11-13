import { useNavigate } from "react-router";
import AddToCartDropdown from "@/components/ProductCards/AddToCartDropdown";
import ProductBadges from "@/components/ProductBadges";
import { twMerge } from "cn";

export default function ProductCard({ tee, className }) {
  const navigate = useNavigate();

  return (
    <div
      className={twMerge(
        "@container/card group/card grid grid-col[auto_1fr] p-2 h-100% bg-card-foreground/6 rounded-lg hover:bg-card-foreground/4 transition-colors duration-200",
        className,
      )}
    >
      <div>
        <div className="h-7">
          <ProductBadges tee={tee} />
        </div>
        <div className="relative aspect-square overflow-hidden rounded-xl">
          <img
            className="absolute left-0 top-0 h-full w-[200%] max-w-none group-has-[button:hover]/card:drop-shadow-xl/30 group-has-[button:hover]/card:-top-1.5 hover:-left-full transition-all duration-300 cursor-pointer"
            onClick={() => navigate(`/shirt/${tee.id}`)}
            src={tee.image}
            alt={tee.name}
          ></img>
        </div>
      </div>
      <div className="flex flex-col justify-between p-2 [--card-w:100cqw]">
        <div className="text-card-foreground-supporting mb-4">
          <h3 className="font-semibold">{tee.name}</h3>
          <p className="line-clamp-2">{tee.description}</p>
        </div>
        <div className="flex items-center justify-between flex-col md:flex-col gap-2 lg:gap-6 lg:flex-row ">
          <p className="text-2xl md:text-base font-normal text-card-foreground/80">
            ${tee.price.toFixed(2)}
          </p>
          <AddToCartDropdown tee={tee} />
        </div>
      </div>
    </div>
  );
}
