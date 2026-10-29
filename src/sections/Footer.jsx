import { FaGithub } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="dark flex flex-col bg-card text-card-foreground justify-center border-t-2 border-card-foreground/5">
      <div className="tracking-[7px] font-display text-[10vw] self-center px-12 py-0">
        COLLARBONE
      </div>
      <div className="flex flex-row border-t-2 border-card-foreground/5">
        <div className="flex flex-col w-1/4 border-r-2 p-12 items-center border-card-foreground/5">
          <h1 className="font-semibold">Shop</h1>
        </div>
        <div className="flex flex-col w-1/4 border-r-2 p-12 items-center border-card-foreground/5">
          <h1 className="font-semibold">Information</h1>
        </div>
        <div className="flex flex-col w-1/4 border-r-2 p-12 items-center border-card-foreground/5">
          <h1 className="font-semibold">Socials</h1>
        </div>
        <div className="flex flex-col w-1/4 p-12 items-center">hi</div>
      </div>
      <div className="flex flex-row justify-between border-t-2 border-card-foreground/5 text-center text-card-foreground/50 text-sm">
        <div className="p-6">
          <p className="text-[14px]">
            © 2026 - Website Made with 🤍 by Hamza Zain Bhatti.
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
