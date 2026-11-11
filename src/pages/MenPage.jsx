import Hero from "@/sections/Hero";
import Button from "@/components/ui/Button";
import ProductCardSM from "@/components/ProductCards/ProductCardSM";
import ProductsGrid from "@/components/ProductsGrid";
import ImageProductCard from "@/components/ProductCards/ImageProductCard";
import ProductCard from "@/components/ProductCards/ProductCard";
import ExploreShirts from "@/sections/ExploreShirts";

import tees from "@/data/tees";

const getTee = (id) => tees.find((tee) => tee.id === id);

export default function MenPage() {
  return (
    <main>
      <Hero backgroundImage={"/assets/men-bg-00.jpg"} scrollEffect>
        {(contentVisible, animateBlurText) => (
          <div className="relative w-full h-full">
            <div className="absolute inset-x-0 bottom-[40px] flex flex-col items-center lg:items-start gap-[10px] lg:gap-[max(calc(2vw-10px),6px)] lg:left-[max(2vw,1rem)] lg:bottom-[max(2vw,1rem)]">
              <h1
                className={`w-full font-hero-text text-[min(8vw,64px)] lg:text-[clamp(3rem,5vw,4.5rem)] leading-[1.08] text-foreground ${animateBlurText(contentVisible)} text-center lg:text-left`}
              >
                Built for the <br />
                <span className="font-cursive italic"> Comfort </span> &nbsp;of
                <span className="font-extralight italic"> Everyday</span> <br />
                and{" "}
                <span className="font-semibold tracking-[3px]">Modern </span>
                Essentials.
              </h1>
              <Button
                to="/shirts?tag=men"
                className={`w-[min(60vw,29rem)] ml-[6px] lg:w-[max(18vw,10rem)] py-[clamp(0.375rem,0.75vw,0.625rem)] text-card/75 text-[clamp(0.8125rem,1.5vw,1.125rem)] hover:bg-secondary hover:text-foreground hover:border-secondary transition-all duration-300 ease-in-out border-current/40 ${
                  contentVisible
                    ? "translate-y-0 opacity-100"
                    : "-translate-y-2 opacity-0"
                }`}
              >
                SHOP MEN'S
              </Button>
            </div>
            <ProductCardSM
              inputTeeId={"black"}
              className="absolute bottom-[60vh] lg:bottom-[max(2vw,1rem)] right-[max(2vw,1rem)] "
            />
          </div>
        )}
      </Hero>
      <section className="relative z-0 flex flex-col bg-background">
        <ProductsGrid>
          <ImageProductCard
            image="/assets/tees-promotion-bgs/man-black-00.jpg"
            inputTeeId="black"
          />
          <ProductCard tee={getTee("dark-gray")} />
          <ProductCard tee={getTee("olive")} />
          <ImageProductCard
            image="/assets/tees-promotion-bgs/man-dark-gray-00.jpg"
            inputTeeId="dark-gray"
          />
          <ProductCard tee={getTee("black")} />
          <ProductCard tee={getTee("white")} />
          <ImageProductCard
            image="/assets/tees-promotion-bgs/man-olive-00.jpg"
            inputTeeId="olive"
          />
          <ProductCard tee={getTee("dark-ash")} />
          <ProductCard tee={getTee("maroon")} />
          <ImageProductCard
            image="/assets/tees-promotion-bgs/man-purple-01.jpg"
            inputTeeId="purple-2943"
          />
          <ProductCard tee={getTee("navy")} />
          <ProductCard tee={getTee("mint")} />
        </ProductsGrid>
        <ExploreShirts
          bg="/assets/tees-promotion-bgs/man-olive-01.jpg"
          link="/shirts?tag=men"
          className=" bg-bottom"
        />
      </section>
    </main>
  );
}
