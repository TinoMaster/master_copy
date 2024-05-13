"use client";
import { navLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import {
  checkRolePermission,
  cutPathnameByPieces,
  initialRoute,
} from "@/libs/utils";
import { Profile } from "./Profile";
import { IoSettingsOutline } from "react-icons/io5";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { getProject } from "@/services/actions/project.actions";
import { Role, Roles } from "@/services/validators/user.zod";

const Sidebar = () => {
  const [projectName, setProjectName] = useState("");
  const pathname = usePathname();
  const route = cutPathnameByPieces(pathname, 3, 4);
  const initialPath = initialRoute(pathname);
  const { data: session } = useSession();

  useEffect(() => {
    getProject(session?.user?.project as string).then((res) => {
      if (res) {
        setProjectName(res.name);
      }
    });
  }, [session]);

  return (
    <aside className="sidebar">
      <div className="flex size-full flex-col gap-8">
        <Link href="/" className="sidebar-logo">
          <Logo withProjectName={true} name={projectName} />
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
                    isActive
                      ? "bg-primary text-gray-200"
                      : "hover:bg-primary/10"
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
                    ? "bg-gray-50 text-gray-700"
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
