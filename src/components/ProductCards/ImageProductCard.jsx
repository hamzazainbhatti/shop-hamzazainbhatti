import { twMerge } from "cn";
import ProductCardSM from "@/components/ProductCards/ProductCardSM";

export default function ImageProductCard({
  image,
  inputTeeId,
  className,
  productCardClassName,
  children,
}) {
  return (
    <div
      className={twMerge(
        "relative col-span-2 row-span-2 h-full min-h-[min(100vw,25rem)] overflow-hidden rounded-lg bg-cover bg-center",
        className,
      )}
      style={{ backgroundImage: `url(${image})` }}
    >
      {children}
      <ProductCardSM
        inputTeeId={inputTeeId}
        className={twMerge(
          "absolute bottom-4 right-4 w-[50%]",
          productCardClassName,
        )}
        contentClassName="text-card-foreground"
      />
    </div>
  );
}
