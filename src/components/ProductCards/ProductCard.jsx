import { useNavigate } from "react-router";
import AddToCartDropdown from "@/components/ProductCards/AddToCartDropdown";
import ProductBadges from "@/components/ProductBadges";
import { twMerge } from "cn";

export default function ProductCard({ tee, className }) {
  const navigate = useNavigate();

  return (
    <div
      className={twMerge(
        "relative group/card bg-card-foreground/6 rounded-lg hover:bg-card-foreground/4 transition-colors duration-200",
        className,
      )}
    >
      <ProductBadges tee={tee} className="px-4 pt-3" />
      <div className="relative aspect-square overflow-hidden rounded-xl">
        <img
          className="absolute left-0 top-0 h-full w-[200%] max-w-none group-has-[button:hover]/card:drop-shadow-xl/30 group-has-[button:hover]/card:-top-1.5 hover:-left-full transition-all duration-300 cursor-pointer"
          onClick={() => navigate(`/shirt/${tee.id}`)}
          src={tee.image}
          alt={tee.name}
        ></img>
      </div>
      <div className="relative flex flex-col px-4 pt-0 pb-16 gap-2 text-card-foreground-supporting">
        <h3 className="font-semibold">{tee.name}</h3>
        <p className="line-clamp-2">{tee.description}</p>
      </div>
      <p className="absolute bottom-0 left-0 m-4 text-lg italic font-normal  text-card-foreground-supporting">
        ${tee.price.toFixed(0)}
      </p>
      <AddToCartDropdown tee={tee} />
    </div>
  );
}
