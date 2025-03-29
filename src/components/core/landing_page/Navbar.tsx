"use client";

import { APP_ROUTES } from "@/lib/routes";
import Link from "next/link";
import { useState } from "react";
import { BiMenu } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navLinks = ["Product", "Solutions", "Resources", "Pricing"];
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b">
      <div className=" sm:max-w-[95vw]  mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-btnColor to-cyan-500 rounded-lg"></div>
          <span className="font-bold text-xl dark:text-black">PaysIt</span>
        </div>
        <nav className="hidden lg:flex gap-x-10"></nav>
        <div className="flex items-center gap-4">
          <Link
            href={APP_ROUTES.LOGIN}
            className="border-2 border-gray-300 cursor-pointer rounded-xl text-[0.975rem] py-2 px-4"
          >
            <span className="font-medium">Sign In</span>
          </Link>
          <Link
            href={APP_ROUTES.SIGNUP}
            className="py-2 px-5 rounded-lg bg-gradient-to-r from-green-500 to-cyan-500 hover:from-btnColor hover:to-cyan-600 flex"
          >
            Signup <BsArrowRight className="ml-2 w-4 h-4" />
          </Link>
          <button className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            <BiMenu className="w-6 h-6" />
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="lg:hidden bg-white border-t">
          <nav className="container mx-auto px-6 py-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="text-gray-600 hover:text-gray-900 text-sm font-medium"
              >
                {link}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
