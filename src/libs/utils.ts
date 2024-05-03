import { Role } from "@/services/validators/user.zod";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const cutPathnameByPieces = (
  pathname: string,
  from: number,
  piece: number
) => {
  const pathnameArr = pathname.split("/");

  return `/` + pathnameArr.slice(from, piece).join("/");
};

export const initialRoute = (pathname: string) => {
  return cutPathnameByPieces(pathname, 1, 3);
};

export const convertPathWithSpaces = (path: string) => {
  return path.replace(/\s/g, "%20");
};

export const convertPathWithSpacesReverse = (path: string) => {
  return path.replace(/%20/g, " ");
};

export function parseServerResponse<T>(response: T) {
  return JSON.parse(JSON.stringify(response)) as T;
}

export function lowerHourRange(schedule: string, schedulesArray: string[]) {
  if (schedule !== "00:00") {
    const hour = schedule.split(":").join("");
    return schedulesArray.filter((item) => {
      const itemHour = item.split(":").join("");
      if (parseInt(hour) > parseInt(itemHour)) {
        return true;
      }
    });
  }
  return schedulesArray;
}
export function higherHourRange(schedule: string, schedulesArray: string[]) {
  const hour = schedule.split(":").join("");

  return schedulesArray.filter((item) => {
    const itemHour = item.split(":").join("");
    if (parseInt(hour) < parseInt(itemHour)) {
      return true;
    }
  });
}

export function convertRoleToSpanish(role: Role) {
  switch (role) {
    case "admin":
      return "Administrador";
    case "user":
      return "Usuario";
    case "worker":
      return "Trabajador";
  }
}
