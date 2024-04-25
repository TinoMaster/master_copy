import { IconType } from "react-icons/lib";
import { IBusiness } from "../app/models/BusinessSchema";

export type TLink = {
  title: string;
  route: string;
  icon?: IconType;
};

export type TInput = {
  id?: string;
  name: string;
  type: string;
  label?: string;
  placeholder?: string;
  description?: string;
  editable?: boolean;
  required?: boolean;
  value?: string;
  containerClass?: string;
  labelClass?: string;
  inputClass?: string;
};

export interface CreateFirstProject
  extends Omit<
    IBusiness,
    "_id" | "workers" | "schedules" | "project" | "credit"
  > {
  projectName: string;
}
