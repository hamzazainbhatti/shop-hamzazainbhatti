import Button from "@/components/ui/Button";
import { useState, useEffect } from "react";

// Shared classes: blurred + transparent -> sharp + opaque
const animateBlurText = (visible) =>
  `transition duration-1000 ease-out delay-500${
    visible ? "opacity-100 blur-0" : "opacity-0 blur-md"
  }`;

export default function Hero() {
  const [visible, setVisible] = useState(false);
  const [textAnimationCompleted, setTextAnimationCompleted] = useState(false);
  useEffect(() => {
    const textTimer = window.setTimeout(() => setVisible(true), 1000);
    const buttonTimer = window.setTimeout(
      () => setTextAnimationCompleted(true),
      1200,
    );
    return () => {
      window.clearTimeout(textTimer);
      window.clearTimeout(buttonTimer);
    };
  }, []);
  return (
    <div className="dark hero-background h-dvh">
      <div className="absolute inset-x-[clamp(1rem,4vw,3rem)] bottom-[clamp(1.5rem,5vh,3rem)] flex flex-col items-end gap-[clamp(0.625rem,1.5vh,1.25rem)] md:left-auto md:w-[min(42rem,calc(100vw_-_6rem))]">
        <Button
          flavour="ctaButton"
          to="/shop"
          className={`w-[clamp(8.5rem,18vw,13rem)] py-[clamp(0.375rem,0.75vw,0.625rem)] text-[clamp(0.8125rem,1.5vw,1.125rem)] font-medium outline-2 transition-all duration-300 ease-in-out ${
            textAnimationCompleted
              ? "translate-y-0 opacity-100"
              : "-translate-y-2 opacity-0"
          }`}
        >
          EXPLORE
        </Button>
        <h1
          className={`w-full font-serif text-[clamp(1.625rem,5vw,4.5rem)] leading-[1.08] text-right text-foreground ${animateBlurText(visible)}`}
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
