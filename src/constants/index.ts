import { TLink } from "@/types";
import { AiOutlineShop } from "react-icons/ai";
import { FaHome } from "react-icons/fa";
import { FcSalesPerformance } from "react-icons/fc";
import { GrUserWorker } from "react-icons/gr";
import { LiaCashRegisterSolid } from "react-icons/lia";
import { LuBoxes } from "react-icons/lu";
import { MdOutlineInventory } from "react-icons/md";

export const navLinks = [
  {
    label: "Inicio",
    route: "/",
    icon: FaHome,
  },
  {
    label: "Ventas",
    route: "/sales",
    icon: FcSalesPerformance,
  },
  {
    label: "Mirón",
    route: "/miron",
    icon: MdOutlineInventory,
  },

  {
    label: "Inventario",
    route: "/inventory",
    icon: LuBoxes,
  },
  {
    label: "Estadísticas",
    route: "/statistics",
    icon: GrUserWorker,
  },
  {
    label: "Tienda",
    route: "/store",
    icon: AiOutlineShop,
  },
  {
    label: "Cuadre",
    route: "/cashier",
    icon: LiaCashRegisterSolid,
  },
];

export const linksAdminPanel: TLink[] = [
  {
    title: "Register",
    route: "/admin/register",
  },
  {
    title: "Ingredients",
    route: "/admin",
  },
  {
    title: "Menu",
    route: "/admin/prueba2",
  },
  {
    title: "Users",
    route: "/admin/prueba3",
  },
];
