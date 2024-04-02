import { FaHome } from "react-icons/fa";
import { FcSalesPerformance, FcStatistics } from "react-icons/fc";
import { MdOutlineInventory } from "react-icons/md";
import { GrUserWorker } from "react-icons/gr";
import { AiOutlineShop } from "react-icons/ai";
import { LiaCashRegisterSolid } from "react-icons/lia";
import { BsCreditCard2Front } from "react-icons/bs";

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
    label: "Tienda",
    route: "/store",
    icon: GrUserWorker,
  },
  {
    label: "Inventario",
    route: "/inventory",
    icon: FcStatistics,
  },
  {
    label: "Personal",
    route: "/personal",
    icon: AiOutlineShop,
  },
  {
    label: "Cuadre",
    route: "/cashier",
    icon: LiaCashRegisterSolid,
  },
  {
    label: "Panel Administrador",
    route: "/admin",
    icon: BsCreditCard2Front,
  },
];
