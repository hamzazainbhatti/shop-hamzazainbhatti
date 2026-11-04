import Store from "@/sections/Store";
import Hero from "@/sections/Hero";
import Button from "@/components/ui/Button";

export default function WomenPage() {
  return (
    <>
      <Hero backgroundImage={"/assets/women-bg-00.jpg"}>
        {(contentVisible, animateBlurText) => (
          <div className="absolute inset-x-[clamp(1rem,4vw,3rem)] bottom-[clamp(1.5rem,5vh,3rem)] flex flex-col items-end gap-[clamp(0.625rem,1.5vh,1.25rem)] md:left-auto md:w-[min(42rem,calc(100vw-6rem))]">
            <Button
              flavour="solid"
              to="/shop"
              className={`w-[clamp(8.5rem,18vw,13rem)] py-[clamp(0.375rem,0.75vw,0.625rem)] text-[clamp(0.8125rem,1.5vw,1.125rem)] font-medium bg-primary text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary hover:border-primary-foreground transition-all duration-300 ease-in-out ${
                contentVisible
                  ? "translate-y-0 opacity-100"
                  : "-translate-y-2 opacity-0"
              }`}
            >
              EXPLORE
            </Button>
            <h1
              className={`w-full font-serif text-[clamp(1.625rem,5vw,4.5rem)] leading-[1.08] text-right text-foreground ${animateBlurText(contentVisible)}`}
            >
              Experiance the <br />
              comfort of Minimal <br />
              and Soft Textures.
            </h1>
          </div>
        )}
      </Hero>
      <Store tagsFilters={["women"]} />
    </>
  );
}
