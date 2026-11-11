import Store from "@/sections/Store";
import StoreController from "@/components/StoreController";

export default function ShirtsPage() {
  return (
    <main>
      <section className="relative z-0 flex flex-col bg-background">
        <StoreController>
          <Store />
        </StoreController>
      </section>
    </main>
  );
}
