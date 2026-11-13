import Button from "@/components/ui/Button";

function submitContact() {}

export default function ContactForm() {
  return (
    <div
      id="contact"
      className="dark flex flex-row bg-card text-card-foreground border-x-2 border-card-foreground/5"
    >
      <div
        className="w-1/2!"
        style={{
          backgroundImage: `url(/assets/contact-bg-00.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="text-[3.6vw] flex flex-col justify-between items-center h-full py-10">
          <div className="font-display">COLLARBONE</div>
          <div className="flex flex-col items-center mb-4">
            <p className="text-card-foreground text-4xl font-light">
              Let's start something great
            </p>
            <h1 className="underline underline-offset-4 cursor-pointer text-card-foreground/90 transition-all duration-500 hover:scale-110 hover:text-card-foreground">
              hello@collorbone.example
            </h1>
          </div>
        </div>
      </div>
      <form
        className="flex flex-col w-1/2 gap-4 p-12 border-l-2 border-card-foreground/5"
        action={submitContact}
      >
        <h1 className="text-[3rem] mb-8 text-card-foreground/40 self-center">
          Here for You, Ready to Grow.
        </h1>
        <div className="flex flex-row gap-10">
          <label className="w-1/2">
            <p className="pl-2 text-card-foreground/40">First Name:</p>
            <input
              className="outline-none border-2 border-card-foreground/5 rounded-lg w-full px-4 py-2 bg-card-foreground/2 placeholder:text-card-foreground/10"
              name="fname"
              type="text"
              placeholder="Type your First name..."
            />
          </label>
          <label className="w-1/2">
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
          className="mt-5 bg-card-foreground/2 text-card-foreground border-2 border-card-foreground/5 py-2 px-4 rounded-lg hover:bg-foreground hover:text-card hover:border-card-foreground/5 transition-colors duration-300"
        >
          Submit
        </Button>
      </form>
    </div>
  );
}
