function submitContact() {}

export default function ContactForm() {
  return (
    <div
      id="contact"
      className="dark flex flex-row p-12 bg-card text-card-foreground"
    >
      <div className="w-1/2"> hello@collorbone.com </div>
      <form className="flex flex-col w-1/2 gap-4 " action={submitContact}>
        <h1 className="text-4xl mb-2 text-card-foreground self-center">
          Let's build something beautiful
        </h1>
        <div className="flex flex-row gap-10">
          <label className="w-1/2">
            <p className="pl-2 ">First Name:</p>
            <input
              className="outline-none border-2 rounded-lg w-full px-4 py-2 bg-card-foreground/2"
              name="fname"
              type="text"
              placeholder="Type your First name..."
            />
          </label>
          <label className="w-1/2">
            <p className="pl-2 ">Last Name:</p>
            <input
              className="outline-none border-2 rounded-lg w-full px-4 py-2 bg-card-foreground/2"
              name="lname"
              type="text"
              placeholder="Type your Last name..."
            />
          </label>
        </div>
        <label className="w-full">
          <p className="pl-2 ">Email:</p>
          <input
            className="outline-none border-2 rounded-lg w-full px-4 py-2 bg-card-foreground/2"
            name="email"
            type="email"
            placeholder="Type your email..."
          />
        </label>
        <label className="w-full">
          <p className="pl-2 ">Message:</p>
          <textarea
            className="outline-none border-2 rounded-lg w-full px-4 py-2 bg-card-foreground/2 resize-none custom-scrollbar"
            name="message"
            rows={4}
            placeholder="Type your Message..."
          />
        </label>
        <button
          className="mt-5 bg-card-foreground/2 text-card-foreground border-2 border-card-foreground py-2 px-4 rounded-lg hover:bg-foreground hover:text-card transition-colors duration-300"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
