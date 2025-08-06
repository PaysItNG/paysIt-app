"use client";

import { APP_ROUTES } from "@/lib/routes";
import Link from "next/link";
import { useState } from "react";
import { BiMenu } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";
import Image from "next/image";
import clsx from "clsx";
import { useGetScreenPosition } from "@/hooks/use-screen-position";

const navLinks = ["Product", "Solutions", "Resources", "Pricing"];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { y: verticalScroll } = useGetScreenPosition();

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 right-0 z-50",
        verticalScroll > 20 && "bg-primary/60 backdrop-blur-sm"
      )}
    >
      <div className="w-full max-w-screen lg:max-w-screen-xl mx-auto">
        <div className="px-6 md:px-10 mx-auto py-4 lg:py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src={"/assets/images/paysIt_logo.jpeg"}
              alt="paysIt logo"
              width={40}
              height={40}
              className="rounded-xl"
            />
          </div>
          <nav className="hidden lg:flex gap-x-10"></nav>
          <div className="flex items-center gap-4">
            <Link
              href={APP_ROUTES.LOGIN}
              className="border-2 border-gray-300 cursor-pointer rounded-xl text-[0.975rem] py-2 px-4"
            >
              <span className="font-medium text-white">Sign In</span>
            </Link>
            <Link
              href={APP_ROUTES.SIGNUP}
              className="py-2 px-5 rounded-lg bg-gradient-to-r from-green-500 to-cyan-500 hover:from-btnColor hover:to-cyan-600 flex items-center"
            >
              Signup <BsArrowRight className="ml-2 w-4 h-4" />
            </Link>
            {/* <button
              className="lg:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <BiMenu className="w-6 h-6" />
            </button> */}
          </div>
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
