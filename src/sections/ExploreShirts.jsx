import Button from "@/components/ui/Button";
import { twMerge } from "cn";

export default function ExploreShirts({ bg, link, className }) {
  return (
    <section
      className={twMerge(
        "relative m-[0_8px_8px_8px] h-[400px] bg-cover bg-center p-6 rounded-lg",
        className,
      )}
      style={{ backgroundImage: `url('${bg}')` }}
    >
      <Button
        to={link}
        className="absolute bottom-6 right-6 border-current/40 text-card/75 transition-all duration-300 ease-in-out hover:border-secondary hover:bg-secondary hover:text-foreground w-[min(50rem,calc(100vw-75px))]"
      >
        See More
      </Button>
    </section>
  );
}
