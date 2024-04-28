"use client";
import {
  convertPathWithSpacesReverse,
  cutPathnameByPieces,
  initialRoute,
} from "@/libs/utils";
import { TLink } from "@/types";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface MenuInfiniteProps {
  links: TLink[];
  cutPath: [number, number];
  position?: "center" | "right";
}

export const MenuInfinite = ({
  links,
  cutPath,
  position,
}: MenuInfiniteProps) => {
  const pathName = usePathname();
  const path = cutPathnameByPieces(pathName, cutPath[0], cutPath[1]);
  const initialPath = initialRoute(pathName);
  const [width, setWidth] = useState(0);
  const element = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (element.current) {
      setWidth(element.current.scrollWidth - element.current.offsetWidth);
    }
  }, []);

  return (
    <motion.header
      ref={element}
      whileTap={{ cursor: "grabbing" }}
      className="flex w-full bg-gradient-to-b from-white/5 to-white/10 rounded-md overflow-hidden relative py-4 mb-4 lg:mb-10 px-2"
    >
      <motion.nav
        drag="x"
        dragConstraints={{ right: 0, left: -width }}
        className={`flex w-max min-w-full gap-4 lg:gap-7 cursor-grab mx-auto ${
          position === "center" ? "md:justify-center" : "md:justify-end"
        } `}
      >
        {links.map(({ route, title }) => (
          <Link
            key={title}
            href={`${initialPath}${route}`}
            className={` ${
              convertPathWithSpacesReverse(path) === route
                ? "text-gray-700"
                : "hover:text-white"
            } uppercase text-sm flex justify-center items-center gap-1 bg-white/5 p-2 rounded-lg relative`}
          >
            {convertPathWithSpacesReverse(path) === route && (
              <motion.div
                layoutId="active2"
                className="absolute bg-pri-200 w-full px-2 h-full rounded-md"
              ></motion.div>
            )}
            <span className="leading-none z-10 w-max flex justify-center items-center">
              {title}
            </span>
          </Link>
        ))}
      </motion.nav>
    </motion.header>
  );
};
