/**
 * -------------------------------------- GUIDE TO RENDER YOUR FIRST EVER HERO SECTION --------------------------------------
 *
 *  - To enable scrolling Hero Image, add "scrollEffect" to the attributes of the rendered Hero section:
 *    FROM: <Hero backgroundImage={"/assets/my-beautifull-hero-image.jpg"}> ... </Hero>
 *    TO:   <Hero backgroundImage={"/assets/my-beautifull-hero-image.jpg"} scrollEffect> ... </Hero>
 *                                                                         ^^^^^^^^^^^^
 *
 *  - ANYTHING that comes after Hero Section (IF "scrollEffect" is added) is wrapped in a wrapper(we will call it "everything else wrapper")
 *    with STYLES "relative z-0 bg-[something that is not transparent]".
 *      "relative z-0": This stacks "everything else" (that is in "everything else wrapper") that comes after Hero ABOVE Hero.
 *      "bg-[xxxxxxff]": This is ANY color given with FULL Opacity.
 *
 *  - Whenever you enable "scrollEffect", MUST ALSO add something like "relative z-0 (stacked above Hero)" + Opaque BG to OTHER
 *    sections' wrappers so WHATEVER that didn't get rendered into this "everything else wrapper", after Hero section, stacks
 *    above Hero Section
 *
 *  --------------- [ IMAGE SIZE CALCULATION /  CHANGE IMAGE SIZE ] IF scrollEffect is enabled in Hero Section ---------------
 *
 *  - Hero Image needs to scroll and for Hero Image to scroll, We wil put Hero's width as 100vw.
 *  - Now There may be some leftover Image height that goes under Screen that could be scrolled.
 *  - Image height will NOT be set automaticly. We will set it. And we will set it in a way where
 *    The ORIGIONAL ratio w:h of screen is preserved.
 *
 *
 *  TODO: Fix header always dark mode When Runway Height is equal to screen width, Check what flow-root does
 *
 */

import { useEffect, useRef, useState } from "react";

// Shared classes: blurred + transparent -> sharp + opaque
const animateBlurText = (visible) =>
  `transition duration-1000 ease-out delay-500 ${
    visible ? "opacity-100 blur-0" : "opacity-0 blur-md"
  }`;

/**
 *  Image size calculation braincells lies here. RIP.
 *
 *  We need to find Changed Height. to change the Image Height in such a way that it's Image Width stays equal to Screen Width.
 *
 *    Origional Width / Origional Height = Changed Width / Changed Height           24W:12H = 2w:1H
 *    Origional Width / Origional Height = window.innerWidth / Changed Height.      As we are keeping Image's Width According to screen width to compute Image's height Without changing the ratio of W:H
 *    Origional Height / Origional Width = Changed Height / window.innerWidth       Flipping both sides.
 *    window.innerWidth x (Origional Height / Origional Width) = Changed Height     Multiplying both sides by "window.innerWidth".
 *    Changed Height = window.innerWidth x (Origional Height / Origional Width)
 *
 *  "Changed Height" can be set as Image's Height
 *  "window.innerWidth" can be set as  Image's Width
 *
 *  IF IMAGE HEIGHT < WHAT SCREEN CAN PROVIDE US: Use screen Height instead.
 */
function getImageHeight(image, viewportWidth, viewportHeight) {
  return Math.max(
    (viewportWidth * image.naturalHeight) / image.naturalWidth,
    viewportHeight,
  );
}

export default function Hero({
  children,
  backgroundImage,
  scrollEffect = false,
}) {
  const [backgroundReady, setBackgroundReady] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const [runwayHeight, setRunwayHeight] = useState(0);
  const runwayWrapperRef = useRef(null);
  const heroWrapperRef = useRef(null);
  const imageRef = useRef(null);

  const handleBackgroundLoad = async (event) => {
    const image = event.currentTarget;
    try {
      await image.decode();

      if (scrollEffect) {
        setRunwayHeight(
          getImageHeight(image, window.innerWidth, window.innerHeight),
        );
      }

      setBackgroundReady(true);
    } catch (error) {
      console.error("Failed to decode the hero background image.", error);
    }
  };

  const handleBackgroundTransitionEnd = (event) => {
    if (event.propertyName === "scale") {
      setContentVisible(true);
    }
  };

  useEffect(() => {
    if (!scrollEffect || !backgroundReady) return;

    const runwayWrapper = runwayWrapperRef.current;
    const heroWrapper = heroWrapperRef.current;
    const image = imageRef.current;
    if (!runwayWrapper || !heroWrapper || !image) return;

    let frameId = null;
    const updateScrollEffect = () => {
      frameId = null;

      // CALCULATE the image height based on the viewport dimensions WHILE preserving its aspect ratio.
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;
      const imageHeight = getImageHeight(image, viewportWidth, viewportHeight);

      // Measure scroll progress and clamp the image pan to its available height.
      const runwayTop =
        runwayWrapper.getBoundingClientRect().top + window.scrollY;
      const panDistance = imageHeight - viewportHeight;
      const scrollProgress = Math.max(0, window.scrollY - runwayTop);
      const imageOffset = Math.min(scrollProgress, panDistance);

      // Begin blurring only after the image has finished panning.
      const blurProgress = Math.min(
        1,
        Math.max(0, (scrollProgress - panDistance) / viewportHeight),
      );

      // Keep the Runway Wrapper's Height and Image's Height in sync.
      setRunwayHeight((currentRunwayHeight) =>
        currentRunwayHeight === imageHeight ? currentRunwayHeight : imageHeight,
      );

      // APPLY the image height based on the viewport dimensions WHILE preserving its aspect ratio.
      image.style.width = `${viewportWidth}px`;
      image.style.height = `${imageHeight}px`;
      image.style.transform = `translateY(-${imageOffset}px)`;

      // Apply blur to the whole fixed Hero wrapper.
      heroWrapper.style.filter = `blur(${24 * blurProgress}px)`;
    };

    const scheduleUpdate = () => {
      if (frameId === null) {
        frameId = window.requestAnimationFrame(updateScrollEffect);
      }
    };

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    scheduleUpdate();

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (frameId !== null) window.cancelAnimationFrame(frameId);
    };
  }, [backgroundReady]);

  /**
   * ---------- MAIN HERO (contains the Background Image , Children )  ----------
   *  Children then contains Animated Text, Call to Action Button, Small Product Cards.
   *              that are rendered on top of the Background Image.
   *
   */
  const heroWrapperElement = (
    <div
      ref={scrollEffect ? heroWrapperRef : undefined}
      className={
        scrollEffect
          ? "dark fixed inset-0 z-0 h-dvh overflow-hidden"
          : "dark relative h-dvh overflow-hidden"
      }
    >
      <img
        ref={scrollEffect ? imageRef : undefined}
        src={backgroundImage}
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
        onTransitionEnd={handleBackgroundTransitionEnd}
        className={`absolute ${
          scrollEffect
            ? "left-0 top-0 max-w-none object-cover"
            : "inset-0 size-full object-cover"
        } transition-[object-position,filter,scale] duration-1000 ease-in-out delay-500 ${
          backgroundReady
            ? "visible object-center blur-0 scale-100"
            : "invisible object-[center_bottom] blur-[10px] scale-[1.2]"
        }`}
        style={
          scrollEffect
            ? {
                width: "100vw",
                height: runwayHeight ? `${runwayHeight}px` : "100dvh",
              }
            : undefined
        }
      />
      {children(contentVisible, animateBlurText)}
    </div>
  );

  /**
   * ---------- RUNWAY WRAPPER ----------
   *  Wraps the Hero Section ONLY IF "scrollEffect" is enabled on rendered Hero Section:
   *    <Hero backgroundImage={"/assets/my-beautifull-hero-image.jpg"} scrollEffect > ... </Hero>
   *                                                                   ^^^^^^^^^^^^
   */
  if (scrollEffect) {
    return (
      <div
        ref={runwayWrapperRef}
        className="dark relative z-0"
        data-navbar-scroll-trigger
        data-navbar-trigger-ready={runwayHeight > 0 ? "true" : "false"}
        style={{ height: runwayHeight ? `${runwayHeight}px` : "100dvh" }}
      >
        {heroWrapperElement}
      </div>
    );
  }

  return heroWrapperElement;
}
// TODO: SCROLLER + <Company Name> • est. MMXXVI • Islamabad
