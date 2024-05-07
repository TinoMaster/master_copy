"use client";
import { Button } from "@/components/ui/button";
import { TLink } from "@/types";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { TbMenuDeep } from "react-icons/tb";
import { NavbarLink } from "./NavbarLink";
import { UserOptions } from "./UserOptions";

export const NavBarMobile = ({ links }: { links: TLink[] }) => {
  const { status } = useSession();
  const [isActive, setIsActive] = useState(false);

  const variant = {
    open: {
      x: 0,
      opacity: [0, 1],
    },
    closed: {
      x: "100vw",
      opacity: 0,
    },
  };

  return (
    <>
      <motion.div
        onClick={() => setIsActive(false)}
        variants={variant}
        initial={isActive ? "open" : "closed"}
        animate={isActive ? "open" : "closed"}
        className={`w-full h-screen lg:hidden fixed flex flex-col top-0 right-0 bg-gray-50 shadow-md py-5 overflow-hidden`}
      >
        <div className="flex w-full flex-col z-10 mt-10 grow">
          <ul className="flex w-[150vw] -translate-x-[25vw] flex-col text-xl justify-center items-center h-full gap-8 rounded-t-full">
            {links?.map((link) => (
              <NavbarLink key={link.title} link={link} />
            ))}
            {status === "authenticated" && <UserOptions />}
            {status === "loading" && (
              <div className="w-10 h-10 bg-white/5 rounded-full animate-pulse"></div>
            )}
            {status === "unauthenticated" && (
              <Link href="/login">
                <Button className="flex bg-gradient-to-r from-primary via-pri-600 to-primary">
                  Iniciar Session
                </Button>
              </Link>
            )}
          </ul>
        </div>
      </motion.div>
      {/* Button section */}
      <section className={`rounded-l-3xl text-slate-500 z-40`}>
        <div className="lg:pr-5 lg:pl-10 lg:hidden px-3 flex justify-between items-center hover:-translate-x-1 transition-transform">
          <button
            onClick={() => setIsActive(!isActive)}
            aria-label={isActive ? "Chiudere menu" : "Aprire menu"}
            className="lg:hidden select-none"
          >
            {isActive ? (
              <IoClose className="text-4xl hover:text-primary hover:cursor-pointer transition-colors" />
            ) : (
              <TbMenuDeep className="text-4xl hover:text-primary hover:cursor-pointer transition-colors" />
            )}
          </button>
        </div>
      </section>
    </>
  );
};
