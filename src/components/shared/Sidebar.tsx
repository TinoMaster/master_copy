"use client";
import { navLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { cutPathnameByPieces } from "@/libs/utils";
import { Profile } from "./Profile";
import { IoSettingsOutline } from "react-icons/io5";
import { useSession } from "next-auth/react";

const Sidebar = () => {
  const pathname = usePathname();
  const route = cutPathnameByPieces(pathname, 1, 2);
  const { data: session } = useSession();
  return (
    <aside className="sidebar">
      <div className="flex size-full flex-col gap-8">
        <Link href="/" className="sidebar-logo">
          <Logo />
        </Link>

        <nav className="sidebar-nav">
          <ul className="sidebar-nav_elements">
            {navLinks.slice(0, 6).map((link) => {
              const isActive = link.route === route;

              return (
                <li
                  key={link.route}
                  className={`sidebar-nav_element group ${
                    isActive
                      ? "bg-gray-50 text-gray-700"
                      : "hover:bg-primary/10"
                  }`}
                >
                  <Link className="sidebar-link" href={link.route}>
                    {link.icon && <link.icon className="text-3xl" />}
                    {link.title}
                  </Link>
                </li>
              );
            })}
          </ul>

          <ul className="sidebar-nav_elements">
            {navLinks.slice(6).map((link) => {
              const isActive = link.route === route;

              return (
                <li
                  key={link.route}
                  className={`sidebar-nav_element group ${
                    isActive
                      ? "bg-gray-50 text-gray-700"
                      : "hover:bg-primary/10"
                  }`}
                >
                  <Link className="sidebar-link" href={link.route}>
                    {link.icon && <link.icon />}
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
                }`}
              >
                <Link className="sidebar-link" href="/admin">
                  <IoSettingsOutline />
                  Panel Administrador
                </Link>
              </li>
            ) : null}
            <li className="flex items-center cursor-pointer gap-2 p-4 bg-gradient-to-tr from-darkMode via-lightDarkMode to-darkMode w-full rounded-full mt-3">
              <Profile />
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
