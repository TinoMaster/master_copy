import { IconType } from "react-icons/lib";
import { IBusiness } from "../app/models/Business";

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

export interface CreateFirstProject extends Partial<IBusiness> {
  projectName: string;
}
