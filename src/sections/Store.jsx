import Button from "@/components/ui/Button";
import { tees, attribution } from "@/data/tees";
import { PlusCircle } from "lucide-react";

export default function Store() {
  return (
    <div className="grid gap-2 m-2 py-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {tees.map((item) => (
        <div key={item.id} className="relative group bg-card rounded-lg">
          <div className="relative aspect-[9/9] overflow-hidden rounded-xl">
            <img
              className="absolute left-0 top-0 h-[100%] w-[200%] max-w-none group-hover:drop-shadow-xl/30 group-hover:top-[-6px] hover:left-[-100%] transition-all duration-300"
              src={item.image}
              alt={item.name}
            ></img>
          </div>
          <div className="relative flex flex-col px-4 pt-0 pb-16 gap-2 text-card-foreground-supporting">
            <h3 className="font-semibold">{item.name}</h3>
            <p>{item.description}</p>
          </div>
          <p className="absolute bottom-0 left-0 m-4 text-lg italic font-normal  text-card-foreground-supporting">
            ${item.price.toFixed(0)}
          </p>
          <Button
            flavour="outlinedButton"
            className="absolute group/button flex flex-row w-40 bottom-0 right-0 m-4 justify-between pr-1 text-card-foreground-supporting/90 border-card-foreground-supporting/80 hover:bg-card-foreground-supporting/90 hover:text-[#f7f6f3] hover:border-card-foreground-supporting/90 transition-colors duration-200 ease-in-out"
          >
            Add to Cart
            <PlusCircle className="transition-transform duration-400 group-hover/button:rotate-90" />
          </Button>
        </div>
      ))}
    </div>
  );
}
