import Hero from "@/sections/Hero";
import Button from "@/components/ui/Button";
import ProductCardSM from "@/components/ProductCards/ProductCardSM";
import ProductsGrid from "@/components/ProductsGrid";
import ImageProductCard from "@/components/ProductCards/ImageProductCard";
import ProductCard from "@/components/ProductCards/ProductCard";
import QuoteOnScroll from "@/sections/QuoteOnScroll";
import ContactForm from "@/sections/ContactForm";
import ExploreShirts from "@/sections/ExploreShirts";
import SectionWrapper from "@/sections/SectionWrapper";

import tees from "@/data/tees";

const getTee = (id) => tees.find((tee) => tee.id === id);

export default function HeroPage() {
  return (
    <main>
      <Hero backgroundImage={"/assets/hero-bg-00.jpg"} scrollEffect>
        {(contentVisible, animateBlurText) => (
          <div className="relative w-full h-full text-[#970f0f]">
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
                to="/shirts"
                className={`w-[min(60vw,29rem)] ml-[6px] lg:w-[max(18vw,10rem)] py-[clamp(0.375rem,0.75vw,0.625rem)] text-card/75 text-[clamp(0.8125rem,1.5vw,1.125rem)] hover:bg-secondary hover:text-foreground hover:border-secondary transition-all duration-300 ease-in-out border-current/40 ${
                  contentVisible
                    ? "translate-y-0 opacity-100"
                    : "-translate-y-2 opacity-0"
                }`}
              >
                EXPLORE
              </Button>
            </div>
            <div className="absolute top-[clamp(5rem,12vh,8rem)] right-[max(2vw,1rem)] flex flex-col gap-[clamp(0.5rem,1vw,1rem)] lg:top-auto lg:bottom-[max(2vw,1rem)]">
              <ProductCardSM inputTeeId="black" />
              <ProductCardSM inputTeeId="navy" />
            </div>
          </div>
        )}
      </Hero>
      <section className="relative z-0 flex flex-col bg-background">
        <QuoteOnScroll>
          <>
            <p>
              <i>Dressing well is a kind of</i> <strong>good manners</strong>.{" "}
              <i>I find it’s a show of</i> <strong>respect</strong>{" "}
              <i>
                to try to put on your best face and look as good as you can.
              </i>
            </p>
            <footer className="pt-3 text-[0.4em] !text-right italic">
              ~ Tom Ford
            </footer>
          </>
        </QuoteOnScroll>
        <div className="mt-2 flex flex-col gap-2">
          <section className="mx-2 flex gap-2">
            <ExploreShirts
              bg="/assets/men-bg-00.jpg"
              link="/men"
              buttonLabel="FOR HIM"
              buttonClassName="bottom-6 right-auto left-1/2 top-auto w-auto -translate-x-1/2 translate-y-0 rounded-lg border-secondary bg-secondary text-foreground hover:border-background hover:bg-foreground hover:text-background"
              buttonSize="lg"
              className="m-0 min-h-[140vh] flex-1"
            />
            <ExploreShirts
              bg="/assets/women-bg-00.jpg"
              link="/women"
              buttonLabel="FOR HER"
              buttonClassName="bottom-6 right-auto left-1/2 top-auto w-auto -translate-x-1/2 translate-y-0 rounded-lg border-secondary bg-secondary text-foreground hover:border-background hover:bg-foreground hover:text-background"
              buttonSize="lg"
              className="m-0 min-h-[140vh] flex-1"
            />
          </section>
          <SectionWrapper
            heading="NEW ARRIVALS"
            subheading="Be the first one to discover our latest arrivals."
          >
            <ProductsGrid className="m-0">
              <ImageProductCard
                image="/assets/tees-promotion-bgs/man-black-00.jpg"
                inputTeeId="black"
              />
              <ImageProductCard
                image="/assets/tees-promotion-bgs/man-violet-00.jpg"
                inputTeeId="purple-2944"
              />
              <ProductCard tee={getTee("red")} />
              <ProductCard tee={getTee("black")} />
              <ProductCard tee={getTee("maroon")} />
              <ProductCard tee={getTee("green-2955")} />
            </ProductsGrid>
            <ExploreShirts
              bg="/assets/tees-promotion-bgs/man-dark-gray-00.jpg"
              link="/new-arrivals"
              buttonLabel="Explore New Arrivals"
              className="m-0"
            />
          </SectionWrapper>
          <SectionWrapper
            heading="TRENDING"
            subheading="See what most of us are buying."
          >
            <ProductsGrid className="m-0">
              <ImageProductCard
                image="/assets/tees-promotion-bgs/women-emerald-00.jpg"
                inputTeeId="green-2955"
              />
              <ProductCard tee={getTee("black")} />
              <ProductCard tee={getTee("maroon")} />
              <ImageProductCard
                image="/assets/tees-promotion-bgs/women-dark-gray-00.jpg"
                inputTeeId="dark-gray"
              />
              <ProductCard tee={getTee("white")} />
              <ProductCard tee={getTee("olive")} />
              <ImageProductCard
                image="/assets/tees-promotion-bgs/women-navy-00.jpg"
                inputTeeId="navy"
              />
              <ProductCard tee={getTee("dark-ash")} />
              <ProductCard tee={getTee("magenta")} />
              <ImageProductCard
                image="/assets/tees-promotion-bgs/women-red-00.jpg"
                inputTeeId="red"
              />
              <ProductCard tee={getTee("dark-ash")} />
              <ProductCard tee={getTee("magenta")} />
            </ProductsGrid>
            <ExploreShirts
              bg="/assets/tees-promotion-bgs/man-dark-gray-00.jpg"
              link="/shirts?flag=featured&flag=new"
              buttonLabel="Explore Trending"
              className="m-0"
            />
          </SectionWrapper>
        </div>
        <ContactForm />
      </section>
    </main>
  );
}
