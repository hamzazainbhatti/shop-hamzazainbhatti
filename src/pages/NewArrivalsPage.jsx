import Store from "@/sections/Store";
import Hero from "@/sections/Hero";
import Button from "@/components/ui/Button";
import ProductCardSM from "@/components/ProductCards/ProductCardSM";

export default function NewArrivalsPage() {
  return (
    <main>
      <Hero backgroundImage={"/assets/new-arrival-bg-00.jpg"} scrollEffect>
        {(contentVisible, animateBlurText) => (
          <div className="relative w-full h-full">
            <div className="absolute inset-x-0 bottom-[40px] flex flex-col items-center lg:items-start gap-[10px] lg:gap-[max(calc(2vw-10px),6px)] lg:left-[max(2vw,1rem)] lg:bottom-[max(2vw,1rem)]">
              <h1
                className={`w-full font-hero-text text-[min(8vw,64px)] lg:text-[clamp(3rem,5vw,4.5rem)] leading-[1.08] text-foreground ${animateBlurText(contentVisible)} text-center lg:text-left`}
              >
                Experience the <br />
                <span className="font-cursive italic"> Comfort </span> &nbsp;of
                <span className="font-extralight italic"> Minimal</span> <br />
                and <span className="font-semibold tracking-[3px]">Soft </span>
                Textures.
              </h1>
              <Button
                to="/shop"
                className={`w-[min(60vw,29rem)] ml-[6px] lg:w-[max(18vw,10rem)] py-[clamp(0.375rem,0.75vw,0.625rem)] text-card/75 text-[clamp(0.8125rem,1.5vw,1.125rem)] hover:bg-secondary hover:text-foreground hover:border-secondary transition-all duration-300 ease-in-out border-current/40 ${
                  contentVisible
                    ? "translate-y-0 opacity-100"
                    : "-translate-y-2 opacity-0"
                }`}
              >
                EXPLORE
              </Button>
            </div>
            <ProductCardSM
              inputTeeId={"white"}
              className="absolute bottom-[60vh] lg:bottom-[max(2vw,1rem)] right-[max(2vw,1rem)] "
            />
          </div>
        )}
      </Hero>
      <section className="relative z-0 flex flex-col bg-background">
        <Store tagsFilters={["women"]} />
        {/* TODO: Add Tee prop for time added to render newly added items, useit instead of "women"*/}
      </section>
    </main>
  );
}
