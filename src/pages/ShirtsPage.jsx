import Store from "@/sections/Store";
import StoreController from "@/components/StoreController";
import { useSearchParams } from "react-router";
import {
  getFiltersFromSearchParams,
  setSearchParamsFromFilters,
} from "@/utils/storeFilters";

export default function ShirtsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const filters = getFiltersFromSearchParams(searchParams);

  function handleFiltersChange(nextFilters) {
    setSearchParams(
      setSearchParamsFromFilters(searchParams, nextFilters),
      { replace: true },
    );
  }

  return (
    <main>
      <section className="relative z-0 flex flex-col bg-background">
        <StoreController {...filters} onFiltersChange={handleFiltersChange}>
          <Store />
        </StoreController>
      </section>
    </main>
  );
}
