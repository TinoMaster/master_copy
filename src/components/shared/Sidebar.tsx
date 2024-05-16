"use client";
import { navLinks } from "@/constants";
import {
  checkRolePermission,
  cutPathnameByPieces,
  initialRoute,
} from "@/libs/utils";
import { Role, Roles } from "@/services/validators/user.zod";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoSettingsOutline } from "react-icons/io5";
import { Logo } from "./Logo";
import { Profile } from "./Profile";

const Sidebar = () => {
  const pathname = usePathname();
  const route = cutPathnameByPieces(pathname, 3, 4);
  const initialPath = initialRoute(pathname);
  const { data: session } = useSession();

  return (
    <aside className="sidebar border-r">
      <div className="flex size-full flex-col gap-8">
        <Logo />

        <nav className="sidebar-nav">
          <ul className="sidebar-nav_elements">
            {navLinks.slice(0, 6).map((link) => {
              const isActive = link.route === route;

              return (
                <li
                  key={link.route}
                  className={`sidebar-nav_element group ${
                    isActive
                      ? "bg-primary text-gray-200"
                      : "hover:bg-primary/10 text-gray-500"
                  }`}
                >
                  <Link
                    className="sidebar-link"
                    href={`${initialPath}${link.route}`}
                  >
                    {link.icon && <link.icon className="text-2xl" />}
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
                    isActive ? "bg-primary text-gray-50" : "hover:bg-primary/10"
                  }`}
                >
                  <Link
                    className="sidebar-link"
                    href={`${initialPath}${link.route}`}
                  >
                    {link.icon && <link.icon className="text-2xl" />}
                    {link.title}
                  </Link>
                </li>
              );
            })}
            {checkRolePermission(session?.user?.role as Role, Roles.ADMIN) ? (
              <li
                className={`sidebar-nav_element group ${
                  route === "/admin"
                    ? "bg-primary text-gray-50"
                    : "hover:bg-primary/10"
                }`}
              >
                <Link className="sidebar-link" href={`${initialPath}/admin`}>
                  <IoSettingsOutline className="text-2xl" />
                  Panel Administrador
                </Link>
              </li>
            ) : null}
          </ul>
        </nav>
        <Profile />
      </div>
    </aside>
  );
};

export default Sidebar;
