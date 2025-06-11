import React from "react";
import { Link, useLocation } from "react-router-dom";

// Persistent logo at top-left, nav at top-right only on home
export default function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="fixed top-3 md:top-4 left-0.5 md:left-8 z-50 w-full flex items-center justify-between px-0 pt-0 bg-transparent pointer-events-none">
      <div className="pointer-events-auto">
        <Link to="/" aria-label="Home">
          <img
            src="/logo.png"
            alt="Logo"
            className="h-20 w-20 md:h-20 md:w-20 object-contain"
            style={{ minWidth: 56 }}
          />
        </Link>
      </div>
      {isHome && (
        <nav
          className="
            flex flex-row space-x-4 md:space-x-8
            mt-2 pointer-events-auto
            ml-0 md:ml-0
            mr-8 md:mr-8
            justify-end
          "
        >
          <Link
            to="/"
            className=
              "capitalize font-sans text-base font-light transition-all duration-200 hover:text-gray-300 hover:underline underline-offset-4 text-white"
            
          >
            Home
          </Link>
          <Link
            to="/projects"
            className={
              "capitalize font-sans text-base font-light transition-all duration-200 hover:text-gray-300 hover:underline underline-offset-4 text-white" +
              (location.pathname === "/projects" ? " underline" : "")
            }
          >
            Projects
          </Link>
          <Link
            to="/about"
            className={
              "capitalize font-sans text-base font-light transition-all duration-200 hover:text-gray-300 hover:underline underline-offset-4 text-white" +
              (location.pathname === "/about" ? " underline" : "")
            }
          >
            About
          </Link>
          <Link
            to="/skills"
            className={
              "capitalize font-sans text-base font-light transition-all duration-200 hover:text-gray-300 hover:underline underline-offset-4 text-white" +
              (location.pathname === "/skills" ? " underline" : "")
            }
          >
            Skills
          </Link>
          <Link
            to="/contact"
            className={
              "capitalize font-sans text-base font-light transition-all duration-200 hover:text-gray-300 hover:underline underline-offset-4 text-white" +
              (location.pathname === "/contact" ? " underline" : "")
            }
          >
            Contact
          </Link>
        </nav>
      )}
    </div>
  );
}
