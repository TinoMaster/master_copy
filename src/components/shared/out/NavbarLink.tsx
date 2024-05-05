"use client";
import useNav from "@/context/navContext";
import { cutPathnameByPieces } from "@/libs/utils";
import { TLink } from "@/types";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavbarLinkProps {
  link: TLink;
}

export const NavbarLink = ({ link }: NavbarLinkProps) => {
  const { title, route } = link;
  const pathname = usePathname();
  const { setMenuIsOpen } = useNav();
  const pathsUrl = cutPathnameByPieces(pathname, 1, 2);
  const pathHref = cutPathnameByPieces(route, 1, 2);

  return (
    <li
      onClick={() => setMenuIsOpen(false)}
      className=" relative  inline-block"
    >
      {pathsUrl === pathHref ? (
        <motion.div
          layoutId="active"
          className="absolute w-full h-full border-b-2"
        ></motion.div>
      ) : null}
      <Link href={`${route}`} className="text-gray-700 font-semibold">
        {title}
      </Link>
    </li>
  );
};
