import Button from "@/components/ui/Button";
import { useNavigate } from "react-router";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ tee }) {
  const navigate = useNavigate();
  const { addToCart } = useCart(); // TODO: Handle Add to cart

  return (
    <div className="relative group/card bg-card rounded-lg">
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
        <p>{tee.description}</p>
      </div>
      <p className="absolute bottom-0 left-0 m-4 text-lg italic font-normal  text-card-foreground-supporting">
        ${tee.price.toFixed(0)}
      </p>
      <Button
        flavour="outline"
        icon="plus"
        iconClassName="transition-transform duration-400 group-hover/button:rotate-90"
        weight="normal"
        labelAlign="start"
        className="absolute group/button flex flex-row w-40 bottom-0 right-0 m-4 pr-1.5 pl-2.75 justify-between text-card-foreground-supporting/90 border-card-foreground-supporting/80 hover:bg-card-foreground-supporting/90 hover:text-[#f7f6f3] hover:border-card-foreground-supporting/90 transition-colors duration-200 ease-in-out"
      >
        Add to Cart
      </Button>
    </div>
  );
}
