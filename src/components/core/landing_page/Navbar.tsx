"use client";


import { Button } from "@heroui/react";
import { useState } from "react";
import { BiMenu } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const navLinks = ['Product', 'Solutions', 'Resources', 'Pricing'];
    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b">
        <div className=" sm:max-w-[95vw]  mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-btnColor to-cyan-500 rounded-lg"></div>
            <span className="font-bold text-xl">PaysIt</span>
          </div>
          <nav className="hidden lg:flex gap-x-10">
            {/* {navLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="text-gray-600 hover:text-gray-900 text-sm font-medium"
              >
                {link}
              </a>
            ))} */}
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="ghost">Sign In</Button>
            <Button className="bg-gradient-to-r from-green-500 to-cyan-500 hover:from-btnColor hover:to-cyan-600 flex">
              Request Demo <BsArrowRight className="ml-2 w-4 h-4" />
            </Button>
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