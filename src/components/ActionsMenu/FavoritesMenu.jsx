import Button from "@/components/ui/Button";

export default function FavoritesMenu() {
  return (
    <div className="flex flex-row p-4 gap-4 items-center justify-between">
      <h1 className="text-xl">No items favorited yet.</h1>
      <Button
        flavour="solid"
        size="sm"
        icon="heart"
        iconClassName=" hover:text-[#ff4444] hover:fill-current"
        iconPosition="start"
        className="px-12 "
      >
        Open Favorites
      </Button>
    </div>
  );
}
