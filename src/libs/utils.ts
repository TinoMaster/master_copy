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

export const convertPathWithSpaces = (path: string) => {
  return path.replace(/\s/g, "%20");
};

export const convertPathWithSpacesReverse = (path: string) => {
  return path.replace(/%20/g, " ");
};