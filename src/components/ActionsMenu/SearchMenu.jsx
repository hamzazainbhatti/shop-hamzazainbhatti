import { useEffect, useRef } from "react";
import Button from "@/components/ui/Button";
export default function SearchMenu() {
  const searchInput = useRef(null);
  useEffect(() => {
    // Focus the input field when the component mounts
    const inputField = searchInput.current;
    if (inputField) {
      inputField.focus();
    }
  }, []);

  return (
    <div className="flex flex-col p-4 gap-4 items-center">
      <h1 className="text-2xl">Search for an Item</h1>
      <div className="flex flex-row w-full items-center border-2 border-card-foreground rounded-xl pr-1 focus-within:bg-card-foreground/75 focus-within:border-card focus-within:text-card">
        <input
          className="outline-none w-full h-[40px] text-lg pl-4 placeholder:text-card-foreground/25 focus-within:placeholder:text-card/25"
          placeholder="Search..."
          ref={searchInput}
        ></input>
        <Button flavour="icon" icon="search"></Button>
      </div>
    </div>
  );
}
