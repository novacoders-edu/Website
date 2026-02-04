import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";
import { DataContext } from "../context/DataProvider";

const quickLinks = [
  { label: "Home", url: "/" },
  { label: "Services", url: "/services" },
  { label: "Free Consultation", url: "/consultation" },
  { label: "FAQs", url: "/faqs" },
  { label: "Portfolio", url: "/portfolio" },
  { label: "About Us", url: "/about" },
  { label: "Privacy Policy", url: "/privacy" },
  { label: "Terms & Conditions", url: "/terms" },
];

const services = [
  "Website Development",
  "Web App Development",
  "PWA Development",
  "Android Development",
  "IOS Development",
  "Digital Marketing",
  "Graphic Designing",
  "Video Editing",
  "Promotional Videos",
];

const contactInfo = [
  {
    icon: <FaMapMarkerAlt className="text-yellow-400" />,
    text: "Aligarh, Uttar Pradesh, India",
  },
  {
    icon: <FaEnvelope className="text-yellow-400" />,
    text: "novacoders007@gmail.com",
    link: "mailto:novacoders007@gmail.com",
  },
  {
    icon: <FaPhoneAlt className="text-yellow-400" />,
    text: "+91 6397973513",
    link: "tel:+916397973513",
  },
];

const Footer = () => {
  const { social } = useContext(DataContext);

  return (


  <div className="relative">
    <footer
      className="bg-slate-900 text-slate-200 relative"
      style={{
        borderTop: "5px solid #67e8f9",
        borderRadius: "30px 30px 0 0",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-cyan-300">
          {/* Brand */}
          <div className="space-y-3 sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center flex-wrap gap-2">
              <img
                className="h-16 sm:h-20"
                src="/logo.png"
                alt="Nova Coders logo"
              />
              <span className="text-xl sm:text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-300">
                Nova Coders
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              A student-driven tech community empowering learners to explore
              cutting-edge technologies through collaboration and projects.
            </p>

            <div className="flex items-center gap-2 flex-wrap">
              {social.map(({ icon: Icon, url }, idx) => (
                <a
                  key={idx}
                  href={url}
                  aria-label={`Follow us on social ${idx + 1}`}
                  className="bg-transparent border border-cyan-400 rounded-lg p-2 text-white hover:bg-cyan-400 hover:text-black transition text-xl sm:text-2xl"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              {quickLinks.map((link) => (
                <li key={link.url}>
                  <Link
                    to={link.url}
                    className="hover:text-emerald-400 transition inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Services</h3>
            <ul className="grid grid-cols-1 gap-2 text-sm text-slate-300">
              {services.map((s) => (
                <li
                  key={s}
                  className="before:content-['•'] before:mr-2 before:text-emerald-400"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact / Newsletter */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-slate-300">
              {contactInfo.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="text-amber-400 bg-transparent border border-cyan-400 rounded-lg text-xl sm:text-2xl p-2 flex-shrink-0">
                    {item.icon}
                  </div>
                  {item.link ? (
                    <Link
                      to={item.link}
                      className="hover:text-emerald-400 break-words flex-1"
                    >
                      {item.text}
                    </Link>
                  ) : (
                    <span className="text-slate-300 flex-1">{item.text}</span>
                  )}
                </li>
              ))}
            </ul>

            <div className="pt-2">
              <h4 className="text-sm font-medium text-slate-300 mb-3">
                Subscribe to our newsletter
              </h4>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex flex-col sm:flex-row gap-2"
                aria-label="Subscribe"
              >
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="flex-1 rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 w-full"
                  aria-label="Email address"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-500 text-slate-900 rounded-md text-sm font-medium hover:bg-emerald-600 transition whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-8 sm:mt-10 pt-6 border-t border-slate-800 text-center text-xs sm:text-sm text-slate-400">
          <div className="mb-2">
            &copy; {new Date().getFullYear()} Nova Coders. All rights reserved.
          </div>
          <div className="flex items-center justify-center gap-1 flex-wrap">
            <Link to="/privacy" className="hover:text-emerald-400 transition px-2">
              Privacy
            </Link>
            <span>|</span>
            <Link to="/terms" className="hover:text-emerald-400 transition px-2">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  </div>
  );
};

export default Footer;
