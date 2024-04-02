"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { navLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiMenu3Fill } from "react-icons/ri";
import { Logo } from "./Logo";
import { IoSettingsOutline } from "react-icons/io5";
import { Profile } from "./Profile";
import { useSession } from "next-auth/react";
import { cutPathnameByPieces } from "@/libs/utils";

const MobileNav = () => {
  const pathname = usePathname();
  const route = cutPathnameByPieces(pathname, 1, 2);
  const { data: session } = useSession();
  return (
    <header className="flex justify-between items-center fixed h-16 w-full p-5 lg:hidden bg-gradient-to-tr from-darkMode via-lightDarkMode to-darkMode z-40">
      <Link href="/" className="flex items-center gap-2 md:py-2">
        <Logo />
      </Link>

      <nav className="flex gap-2">
        <Sheet>
          <SheetTrigger>
            <RiMenu3Fill className="text-3xl" />
          </SheetTrigger>
          <SheetContent className="sheet-content sm:w-64 bg-gradient-to-tr from-darkMode via-lightDarkMode to-darkMode">
            <>
              <Logo />
              <ul className="header-nav_elements">
                {navLinks.map((link) => {
                  const isActive = link.route === route;

                  return (
                    <li
                      key={link.route}
                      className={`sidebar-nav_element group ${
                        isActive
                          ? "bg-gray-50 text-gray-700"
                          : "hover:bg-primary/10"
                      } p-18 flex whitespace-nowrap text-dark-700`}
                    >
                      <Link
                        className="sidebar-link cursor-pointer"
                        href={link.route}
                      >
                        {link.icon && <link.icon className="text-3xl" />}
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
                {session?.user.role === "admin" ? (
                  <li
                    className={`sidebar-nav_element group ${
                      route === "/admin"
                        ? "bg-gray-50 text-gray-700"
                        : "hover:bg-primary/10"
                    } p-18 flex whitespace-nowrap text-dark-700`}
                  >
                    <Link className="sidebar-link cursor-pointer" href="/admin">
                      <IoSettingsOutline className="text-3xl"/>
                      Panel Administrador
                    </Link>
                  </li>
                ) : null}
                <li className="flex items-center cursor-pointer gap-2 p-4 bg-gradient-to-tr from-darkMode via-lightDarkMode to-darkMode w-full rounded-full mt-3">
                  <Profile />
                </li>
              </ul>
            </>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
};

export default MobileNav;
