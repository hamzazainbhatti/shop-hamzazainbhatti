import Button from "@/components/ui/Button";

export default function PageNotFound() {
  return (
    <div className="relative h-screen font-display-stylish bg-primary">
      <h1 className="absolute inset-0 flex items-center justify-center text-[20vw] text-white -translate-y-[10vh]">
        Error 404
      </h1>
      <div className="absolute inset-0 flex flex-row justify-center">
        <img
          className="h-full object-contain -translate-y-[calc(10vh-70px)]"
          src="/assets/page-not-found-bg.png"
        ></img>
      </div>
      <h1 className="absolute inset-0 flex items-center justify-center text-[20vw] text-black mask-[url(/assets/page-not-found-bg.png)] mask-no-repeat mask-contain mask-[50%_calc(50%+70px)] -translate-y-[10vh]">
        Error 404
      </h1>
      <div className="absolute flex flex-col bottom-17 left-[6vw] font-light text-white text-4xl font-sans">
        <h1 className="text-lg"> COLLARBONE </h1>
        <h1 className="text-2xl font-semibold">
          Whoopsies!! It seems like you've been <br />
          led astray at the bottom of the ocean.
        </h1>
        <Button
          flavour="solid"
          size="lg"
          weight="light"
          to={"/"}
          className="mt-[20px] flex w-[200px] justify-start rounded-none border-0 bg-black/40 px-10 py-2 text-lg text-white hover:bg-white/70 hover:text-black/80 transition-colors duration-300"
        >
          GO HOME
        </Button>
      </div>
    </div>
  );
}
