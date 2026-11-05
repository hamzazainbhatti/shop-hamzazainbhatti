import Store from "@/sections/Store";
import Hero from "@/sections/Hero";
import Button from "@/components/ui/Button";
import ProductCardSM from "@/components/ProductCards/ProductCardSM";

export default function WomenPage() {
  return (
    <>
      <Hero backgroundImage={"/assets/women-bg-00.jpg"}>
        {(contentVisible, animateBlurText) => (
          <div className="relative w-full h-full">
            <div className="absolute inset-x-0 bottom-[40px] flex flex-col items-center lg:items-start gap-[10px] lg:gap-[max(calc(2vw-30px),6px)] lg:left-[max(2vw,1rem)] lg:bottom-[max(2vw,1rem)]">
              <h1
                className={`w-full font-serif text-[min(8vw,64px)] lg:text-[clamp(3rem,5vw,4.5rem)] leading-[1.08] text-foreground ${animateBlurText(contentVisible)} text-center lg:text-left`}
              >
                Experience the <br />
                comfort of Minimal <br />
                and Soft Textures.
              </h1>
              <Button
                to="/shop"
                className={`w-[min(60vw,29rem)] lg:w-[max(18vw,10rem)] py-[clamp(0.375rem,0.75vw,0.625rem)] text-[clamp(0.8125rem,1.5vw,1.125rem)] hover:bg-secondary hover:text-foreground transition-all duration-300 ease-in-out border-current/40 ${
                  contentVisible
                    ? "translate-y-0 opacity-100"
                    : "-translate-y-2 opacity-0"
                }`}
              >
                EXPLORE
              </Button>
            </div>
            <ProductCardSM
              inputTeeId={"dark-gray"}
              className="absolute bottom-[60vh] lg:bottom-[max(2vw,1rem)] right-[max(2vw,1rem)]"
            />
          </div>
        )}
      </Hero>
      <Store tagsFilters={["women"]} />
    </>
  );
}
