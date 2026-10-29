import Button from "@/components/ui/Button";
import { useState } from "react";
import "./Hero.css";

// Shared classes: blurred + transparent -> sharp + opaque
const animateBlurText = (visible) =>
  `transition duration-1000 ease-out delay-500 ${
    visible ? "opacity-100 blur-0" : "opacity-0 blur-md"
  }`;

export default function Hero() {
  const [backgroundReady, setBackgroundReady] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);

  const handleBackgroundLoad = async (event) => {
    try {
      await event.currentTarget.decode();
      setBackgroundReady(true);
    } catch (error) {
      console.error("Failed to decode the hero background image.", error);
    }
  };

  const handleBackgroundAnimationEnd = (event) => {
    if (event.animationName === "hero-background-pan") {
      setContentVisible(true);
    }
  };

  return (
    <div className="dark hero-background h-dvh">
      <img
        src="/assets/hero-bg-02.jpg"
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        onLoad={handleBackgroundLoad}
        onError={(event) =>
          console.error(
            "Failed to load the hero background image.",
            event.currentTarget.src,
          )
        }
        onAnimationEnd={handleBackgroundAnimationEnd}
        className={`hero-background__image ${
          backgroundReady ? "hero-background__image--ready" : ""
        }`}
      />
      <div className="absolute inset-x-[clamp(1rem,4vw,3rem)] bottom-[clamp(1.5rem,5vh,3rem)] flex flex-col items-end gap-[clamp(0.625rem,1.5vh,1.25rem)] md:left-auto md:w-[min(42rem,calc(100vw-6rem))]">
        <Button
          flavour="ctaButton"
          to="/shop"
          className={`w-[clamp(8.5rem,18vw,13rem)] py-[clamp(0.375rem,0.75vw,0.625rem)] text-[clamp(0.8125rem,1.5vw,1.125rem)] font-medium outline-2 transition-all duration-300 ease-in-out ${
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
    </div>
  );
}
// TODO: SCROLLER + <Company Name> • est. MMXXVI • Islamabad
