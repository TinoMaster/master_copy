"use client";
import { navLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <aside className="sidebar">
      <div className="flex size-full flex-col gap-8">
        <Link href="/" className="sidebar-logo">
          <Logo />
        </Link>

        <nav className="sidebar-nav">
          <ul className="sidebar-nav_elements">
            {navLinks.slice(0, 6).map((link) => {
              const isActive = link.route === pathname;

              return (
                <li
                  key={link.route}
                  className={`sidebar-nav_element group ${
                    isActive ? "bg-gray-50 text-gray-700" : "hover:bg-primary/10"
                  }`}
                >
                  <Link className="sidebar-link" href={link.route}>
                    {link.icon && <link.icon className="text-3xl"/>}
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <ul className="sidebar-nav_elements">
            {navLinks.slice(6).map((link) => {
              const isActive = link.route === pathname;

              return (
                <li
                  key={link.route}
                  className={`sidebar-nav_element group ${
                    isActive ? "bg-primary/30" : "hover:bg-primary/10"
                  }`}
                >
                  <Link className="sidebar-link" href={link.route}>
                    {link.icon && <link.icon />}
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
