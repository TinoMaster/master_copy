export type TLink = {
  title: string;
  route: string;
  icon?: string;
};

export type TInput = {
  id?: string;
  name: string;
  type: string;
  label?: string;
  placeholder?: string;
  editable?: boolean;
  value?: string;
  containerClass?: string;
  labelClass?: string;
  inputClass?: string;
};
