import Hero from "@/sections/Hero";
import QuoteOnScroll from "@/sections/QuoteOnScroll";
import Store from "@/sections/Store";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <QuoteOnScroll>
        <>
          <p>
            <i>Dressing well is a kind of</i> <strong>good manners</strong>.{" "}
            <i>I find it’s a show of</i> <strong>respect</strong>{" "}
            <i>to try to put on your best face and look as good as you can.</i>
          </p>
          <footer className="pt-3 text-[0.4em] italic">~ Tom Ford</footer>
        </>
      </QuoteOnScroll>
      <Store />
    </main>
  );
}
