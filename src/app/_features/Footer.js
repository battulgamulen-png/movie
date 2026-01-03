import { Moviez } from "../_icon/Moviez";
import { Email } from "../_icon/Email";
import { Phone } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="w-full bg-indigo-700 py-10 mt-12 flex justify-center items-center">
      <div className="w-[90%] max-w-[1440px] flex flex-col md:flex-row justify-between gap-10 text-white">
        {/* Logo + Info */}
        <div className="flex flex-col gap-2">
          <Moviez className="text-white" />
          <span className="font-semibold tracking-wide">Movie Z</span>
          <p className="text-sm opacity-80">
            © 2024 Movie Z. All Rights Reserved.
          </p>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col gap-4">
          <p className="font-semibold text-lg">Contact Information</p>

          <div className="flex items-center gap-3">
            <Email className="text-white" />
            <div>
              <p className="text-sm opacity-80">Email:</p>
              <p className="text-sm">support@movieZ.com</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Phone className="text-white" />
            <div>
              <p className="text-sm opacity-80">Phone:</p>
              <p className="text-sm">+1 (555) 123-4567</p>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex flex-col gap-3">
          <p className="font-semibold text-lg">Follow Us</p>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://www.facebook.com"
              className="text-sm hover:text-gray-300 transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
            <a
              href="https://www.instagram.com"
              className="text-sm hover:text-gray-300 transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
            <a
              href="https://www.twitter.com"
              className="text-sm hover:text-gray-300 transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
            <a
              href="https://www.youtube.com"
              className="text-sm hover:text-gray-300 transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              YouTube
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
