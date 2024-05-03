"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { navLinks } from "@/constants";
import { cutPathnameByPieces, initialRoute } from "@/libs/utils";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoSettingsOutline } from "react-icons/io5";
import { RiMenu3Fill } from "react-icons/ri";
import { Logo } from "./Logo";
import { Profile } from "./Profile";
import { useState } from "react";

const MobileNav = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const route = cutPathnameByPieces(pathname, 3, 4);
  const initialPath = initialRoute(pathname);
  const { data: session } = useSession();
  return (
    <header className="flex justify-between items-center fixed h-16 w-full p-5 lg:hidden bg-gradient-to-tr from-darkMode via-lightDarkMode to-darkMode z-40">
      <Link href="/" className="flex items-center gap-2 md:py-2">
        <Logo />
      </Link>

      <nav className="flex gap-2">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger>
            <RiMenu3Fill className="text-3xl" />
          </SheetTrigger>
          <SheetContent
            onClick={() => setOpen(false)}
            className="sheet-content sm:w-64 bg-gradient-to-tr from-darkMode via-lightDarkMode to-darkMode"
          >
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
                        href={`${initialPath}${link.route}`}
                      >
                        {link.icon && <link.icon className="text-3xl" />}
                        {link.title}
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
                    <Link
                      className="sidebar-link cursor-pointer"
                      href={`${initialPath}/admin`}
                    >
                      <IoSettingsOutline className="text-3xl" />
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
