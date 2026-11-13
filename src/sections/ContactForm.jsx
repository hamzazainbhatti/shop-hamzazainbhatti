import Button from "@/components/ui/Button";

function submitContact() {}

export default function ContactForm() {
  return (
    <div
      id="contact"
      className="dark grid grid-rows-2 grid-cols-1 bg-card text-card-foreground border-x-2 border-card-foreground/5 md:grid-cols-2 md:grid-rows-1"
    >
      <div
        className=""
        style={{
          backgroundImage: `url(/assets/contact-bg-00.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex flex-col justify-between items-center h-full py-10 md:text-[3.6vw]">
          <div className="font-display text-[9.6vw] md:text-[4.4vw]">
            COLLARBONE
          </div>
          <div className="flex flex-col items-center mb-4">
            <p className="text-card-foreground text-[5vw] md:text-[2.5vw] font-light">
              Let's start something great
            </p>
            <h1 className="text-[7vw] md:text-[3.5vw] underline underline-offset-4 cursor-pointer text-card-foreground/90 transition-all duration-500 hover:scale-110 hover:text-card-foreground">
              hello@collorbone.example
            </h1>
          </div>
        </div>
      </div>
      <form
        className="flex flex-col gap-4 p-6 md:p-9 border-l-2 border-card-foreground/5"
        action={submitContact}
      >
        <div className="w-100%">
          <h1 className="w-100% text-[8vw] md:text-[5vw] text-card-foreground/40 text-center">
            Here for You, <br /> Ready to Grow.
          </h1>
        </div>
        <div className="flex flex-col md:flex-row gap-4 md:gap-9">
          <label className="md:w-1/2">
            <p className="pl-2 text-card-foreground/40">First Name:</p>
            <input
              className="outline-none border-2 border-card-foreground/5 rounded-lg w-full px-4 py-2 bg-card-foreground/2 placeholder:text-card-foreground/10"
              name="fname"
              type="text"
              placeholder="Type your First name..."
            />
          </label>
          <label className="md:w-1/2">
            <p className="pl-2 text-card-foreground/40">Last Name:</p>
            <input
              className="outline-none border-2 border-card-foreground/5 rounded-lg w-full px-4 py-2 bg-card-foreground/2 placeholder:text-card-foreground/10"
              name="lname"
              type="text"
              placeholder="Type your Last name..."
            />
          </label>
        </div>
        {/*TODO: MAKE INPUT COMPONENT One for input one for textarea*/}
        <label className="w-full">
          <p className="pl-2 text-card-foreground/40">Email:</p>
          <input
            className="outline-none border-2 border-card-foreground/5 rounded-lg w-full px-4 py-2 bg-card-foreground/2 placeholder:text-card-foreground/10"
            name="email"
            type="email"
            placeholder="Type your email..."
          />
        </label>
        <label className="w-full">
          <p className="pl-2 text-card-foreground/40">Message:</p>
          <textarea
            className="outline-none border-2 border-card-foreground/5 rounded-lg w-full px-4 py-2 bg-card-foreground/2 placeholder:text-card-foreground/10 resize-none custom-scrollbar"
            name="message"
            rows={4}
            placeholder="Type your Message..."
          />
        </label>
        <Button
          flavour="solid"
          weight="normal"
          type="submit"
          className="bg-card-foreground/2 text-card-foreground border-2 border-card-foreground/5 py-2 px-4 rounded-lg hover:bg-foreground hover:text-card hover:border-card-foreground/5 transition-colors duration-300"
        >
          Submit
        </Button>
      </form>
    </div>
  );
}
