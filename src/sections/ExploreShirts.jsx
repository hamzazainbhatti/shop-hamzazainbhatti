import Button from "@/components/ui/Button";
import { twMerge } from "cn";

export default function ExploreShirts({
  bg,
  link,
  className,
  buttonClassName,
  buttonLabel = "See More",
  buttonSize,
}) {
  return (
    <section
      className={twMerge(
        "relative @container m-[0_8px_8px_8px] h-[400px] bg-cover bg-center p-6 rounded-lg",
        className,
      )}
      style={{ backgroundImage: `url('${bg}')` }}
    >
      <Button
        to={link}
        size={buttonSize}
        className={twMerge(
          "absolute bottom-6 right-6 w-[min(500px,100cqw)] border-current/40 text-card/75 transition-all duration-300 ease-in-out hover:border-secondary hover:bg-secondary hover:text-foreground",
          buttonClassName,
        )}
      >
        {buttonLabel}
      </Button>
    </section>
  );
}
