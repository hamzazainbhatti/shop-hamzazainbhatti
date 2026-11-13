import { FaGithub } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import Button from "@/components/ui/Button";

export default function Footer() {
  const shopLinks = [
    { name: "New Arrival", href: "/new-arrivals" },
    { name: "Men", href: "/men" },
    { name: "Women", href: "/women" },
    { name: "Shirts", href: "/shirts" },
  ];
  const informationLinks = [
    { name: "About", href: "/about" },
    { name: "Contact Us", href: "/#contact" },
  ];
  const socialLinks = [
    { name: "GitHub", href: "https://github.com/hamzazainbhatti" },
    { name: "Instagram", href: "https://instagram.com/hamzazainbhatti" },
    { name: "X", href: "https://twitter.com/hamzazainbhatti" },
    { name: "LinkedIn", href: "https://linkedin.com/in/hamzazainbhatti" },
  ];

  return (
    <footer className="dark relative z-0 flex flex-col bg-card text-card-foreground justify-center border-t-2 border-card-foreground/5">
      <div className="tracking-[7px] font-display text-[10vw] self-center px-12 py-0">
        COLLARBONE
      </div>
      <div className="grid grid-cols-1 border-t-2 border-card-foreground/5 text-card-foreground/50 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex w-full flex-col items-start border-b-2 border-card-foreground/5 p-6 sm:border-r-2 sm:p-8 lg:border-b-0 lg:p-12">
          <h1 className="font-light text-2xl mb-2 text-card-foreground/60">
            SHOP
          </h1>
          {shopLinks.map((link) => (
            <Button
              key={link.href}
              to={link.href}
              flavour="link"
              className="w-full justify-start text-left mb-1 hover:text-card-foreground/70"
            >
              {link.name}
            </Button>
          ))}
        </div>
        <div className="flex w-full flex-col items-start border-b-2 border-card-foreground/5 p-6 sm:border-r-0 sm:p-8 lg:border-r-2 lg:border-b-0 lg:p-12">
          <h1 className="font-light text-2xl mb-2 text-card-foreground/60">
            INFORMATION
          </h1>
          {informationLinks.map((link) => (
            <Button
              key={link.href}
              to={link.href}
              flavour="link"
              className="w-full justify-start text-left mb-1 hover:text-card-foreground/70"
            >
              {link.name}
            </Button>
          ))}
        </div>
        <div className="flex w-full flex-col items-start border-b-2 border-card-foreground/5 p-6 sm:border-r-2 sm:border-b-0 sm:p-8 lg:border-r-2 lg:p-12">
          <h1 className="font-light text-2xl mb-2 text-card-foreground/60 ">
            SOCIALS
          </h1>
          {socialLinks.map((social) => (
            <Button
              key={social.name}
              href={social.href}
              flavour="link"
              className="w-full justify-start text-left mb-1 hover:text-card-foreground/70"
            >
              {social.name}
            </Button>
          ))}
        </div>
        <div className="flex w-full flex-col items-start p-6 sm:p-8 lg:p-12">
          <form className="flex w-full flex-col gap-4">
            <h1 className="font-light text-2xl text-card-foreground/60">
              STAY IN THE LOOP
            </h1>
            <p className="text-card-foreground/50">
              Get updates on new arrivals and offers.
            </p>
            <label className="w-full">
              <span className="sr-only">Email address</span>
              <input
                className="w-full rounded-lg border-2 border-card-foreground/5 bg-card-foreground/2 px-4 py-2 outline-none placeholder:text-card-foreground/10"
                name="email"
                type="email"
                placeholder="Type your email..."
                required
              />
            </label>
            <Button
              flavour="solid"
              weight="normal"
              type="submit"
              className="w-full rounded-lg border-2 border-card-foreground/5 bg-card-foreground/2 px-4 py-2 text-card-foreground transition-colors duration-300 hover:border-card-foreground/5 hover:bg-foreground hover:text-card"
            >
              Subscribe
            </Button>
          </form>
        </div>
      </div>
      <div className="flex flex-row justify-between border-t-2 border-card-foreground/5 text-center text-card-foreground/50 text-sm">
        <div className="p-6">
          <p className="text-[14px]">
            © 2026 - Website Made with 🤍 by{" "}
            <a
              href="https://github.com/hamzazainbhatti"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 decoration-card-foreground/30 transition-all duration-300 hover:text-card-foreground/70 hover:font-semibold"
            >
              Hamza Zain Bhatti
            </a>
            .
          </p>
        </div>
        <div className="flex flex-row gap-8 p-6 items-center">
          <div>
            <FaGithub size={20} />
          </div>
          <div>
            <FaInstagram size={20} />
          </div>
          <div>
            <FaXTwitter size={20} />
          </div>
          <div>
            <FaLinkedin size={20} />
          </div>
        </div>
      </div>
    </footer>
  );
}
