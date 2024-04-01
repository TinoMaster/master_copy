"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { navLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiMenu3Fill } from "react-icons/ri";
import { Logo } from "./Logo";

const MobileNav = () => {
  const pathname = usePathname();
  return (
    <header className="flex justify-between items-center fixed h-16 w-full border-b-2 border-primary p-5 lg:hidden bg-gradient-to-tr from-darkMode via-lightDarkMode to-darkMode">
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
                  const isActive = link.route === pathname;

                  return (
                    <li
                      key={link.route}
                      className={`sidebar-nav_element group ${
                        isActive ? "bg-primary/30" : "hover:bg-primary/10"
                      } p-18 flex whitespace-nowrap text-dark-700`}
                    >
                      <Link
                        className="sidebar-link cursor-pointer"
                        href={link.route}
                      >
                        {link.icon && <link.icon className="text-3xl"/>}
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
};

export default MobileNav;
