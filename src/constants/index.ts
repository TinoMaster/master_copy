import { ISchedule } from "@/components/pages/admin/business/business-options/form-business/Schedule";
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
    title: "Negocios",
    route: "/admin/business",
  },
  {
    title: "Usuarios",
    route: "/admin/users",
  },
];

export const linksCashierPanel: TLink[] = [
  {
    title: "Miron",
    route: "/cashier",
  },
  {
    title: "Insumos",
    route: "/cashier/supplies",
  },
];

export const dayHours = [
  "01:00",
  "01:15",
  "01:30",
  "01:45",
  "02:00",
  "02:15",
  "02:30",
  "02:45",
  "03:00",
  "03:15",
  "03:30",
  "03:45",
  "04:00",
  "04:15",
  "04:30",
  "04:45",
  "05:00",
  "05:15",
  "05:30",
  "05:45",
  "06:00",
  "06:15",
  "06:30",
  "06:45",
  "07:00",
  "07:15",
  "07:30",
  "07:45",
  "08:00",
  "08:15",
  "08:30",
  "08:45",
  "09:00",
  "09:15",
  "09:30",
  "09:45",
  "10:00",
  "10:15",
  "10:30",
  "10:45",
  "11:00",
  "11:15",
  "11:30",
  "11:45",
  "12:00",
  "12:15",
  "12:30",
  "12:45",
  "13:00",
  "13:15",
  "13:30",
  "13:45",
  "14:00",
  "14:15",
  "14:30",
  "14:45",
  "15:00",
  "15:15",
  "15:30",
  "15:45",
  "16:00",
  "16:15",
  "16:30",
  "16:45",
  "17:00",
  "17:15",
  "17:30",
  "17:45",
  "18:00",
  "18:15",
  "18:30",
  "18:45",
  "19:00",
  "19:15",
  "19:30",
  "19:45",
  "20:00",
  "20:15",
  "20:30",
  "20:45",
  "21:00",
  "21:15",
  "21:30",
  "21:45",
  "22:00",
  "22:15",
  "22:30",
  "22:45",
  "23:00",
  "23:15",
  "23:30",
  "23:45",
  "24:00",
];

export const initialSchedules: ISchedule[] = [
  {
    day: "Lunes",
    openingTime: "00:00",
    closingTime: "00:00",
  },
  {
    day: "Martes",
    openingTime: "00:00",
    closingTime: "00:00",
  },
  {
    day: "Miércoles",
    openingTime: "00:00",
    closingTime: "00:00",
  },
  {
    day: "Jueves",
    openingTime: "00:00",
    closingTime: "00:00",
  },
  {
    day: "Viernes",
    openingTime: "00:00",
    closingTime: "00:00",
  },
  {
    day: "Sábado",
    openingTime: "00:00",
    closingTime: "00:00",
  },
  {
    day: "Domingo",
    openingTime: "00:00",
    closingTime: "00:00",
  },
];

export const daysOfTheWeek = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
];
