import Button from "@/components/ui/Button";
export default function SearchMenu() {
  return (
    <div className="flex flex-col p-4 gap-4 items-center">
      <h1 className="text-2xl">Search for an Item</h1>
      <div className="flex flex-row w-full items-center border-2 border-card-foreground rounded-xl pr-1 focus-within:bg-card-foreground focus-within:border-card focus-within:text-card">
        <input className="outline-none w-full h-[40px] text-lg pl-4"></input>
        <Button flavour="icon" icon="search"></Button>
      </div>
    </div>
  );
}
