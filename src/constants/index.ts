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
    route: `/dashboard/${/\d+/g}`,
    icon: FaHome,
  },
  {
    title: "Ventas",
    route: "/dashboard/sales",
    icon: FcSalesPerformance,
  },
  {
    title: "Mirón",
    route: "/dashboard/miron",
    icon: MdOutlineInventory,
  },

  {
    title: "Inventario",
    route: "/dashboard/inventory",
    icon: LuBoxes,
  },
  {
    title: "Estadísticas",
    route: "/dashboard/statistics",
    icon: GrUserWorker,
  },
  {
    title: "Tienda",
    route: "/dashboard/store",
    icon: AiOutlineShop,
  },
  {
    title: "Cuadre",
    route: "/dashboard/cashier",
    icon: LiaCashRegisterSolid,
  },
];

export const linksAdminPanel: TLink[] = [
  {
    title: "Proyecto",
    route: "/dashboard/admin",
  },
  {
    title: "Usuarios",
    route: "/dashboard/admin/users",
  },
];
