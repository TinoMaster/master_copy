import { TLink } from "@/types";
import { AiOutlineShop } from "react-icons/ai";
import { FaHome } from "react-icons/fa";
import { FcSalesPerformance } from "react-icons/fc";
import { GrUserWorker } from "react-icons/gr";
import { LiaCashRegisterSolid } from "react-icons/lia";
import { LuBoxes } from "react-icons/lu";
import { MdOutlineInventory } from "react-icons/md";

export const navLinksOut: TLink[] = [
  {
    title: "Contacto",
    route: "/contact",
  },
  {
    title: "Documentación",
    route: "/docs",
  },
];

export const navLinks: TLink[] = [
  {
    title: "Inicio",
    route: `/`,
    icon: FaHome,
  },
  {
    title: "Ventas",
    route: "/sales",
    icon: FcSalesPerformance,
  },
  {
    title: "Mirón",
    route: "/miron",
    icon: MdOutlineInventory,
  },

  {
    title: "Inventario",
    route: "/inventory",
    icon: LuBoxes,
  },
  {
    title: "Estadísticas",
    route: "/statistics",
    icon: GrUserWorker,
  },
  {
    title: "Tienda",
    route: "/store",
    icon: AiOutlineShop,
  },
  {
    title: "Cuadre",
    route: "/cashier",
    icon: LiaCashRegisterSolid,
  },
];

export const linksAdminPanel: TLink[] = [
  {
    title: "Proyecto",
    route: "/admin",
  },
  {
    title: "Usuarios",
    route: "/admin/users",
  },
];
