import { twMerge } from "cn";

export default function ProductsGrid({ children, className }) {
  return (
    <div
      className={twMerge(
        "m-2 grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4",
        className,
      )}
    >
      {children}
    </div>
  );
}
