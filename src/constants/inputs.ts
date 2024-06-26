import { Roles } from "@/services/validators/user.zod";
import { TInput } from "@/types";

export const createUserInput: TInput[] = [
  {
    id: "name_item",
    label: "Nombre",
    labelClass: "label",
    type: "text",
    placeholder: "Ej: Juan Perez",
    name: "name",
    editable: true,
    containerClass: "sm:col-span-3",
  },
  {
    id: "username_item",
    label: "Nombre de Usuario",
    labelClass: "label",
    type: "text",
    placeholder: "Ej: Juanito",
    name: "username",
    editable: true,
    containerClass: "sm:col-span-3",
  },
  {
    id: "email_item",
    label: "Correo",
    labelClass: "label",
    type: "email",
    placeholder: "Ej: 9sRFP@example.com",
    name: "email",
    editable: true,
    containerClass: "sm:col-span-4",
  },
  {
    id: "password_item",
    label: "Contraseña",
    labelClass: "label",
    type: "password",
    placeholder: "Ej: ********",
    name: "password",
    editable: true,
    containerClass: "sm:col-span-3",
  },
  {
    id: "confirm_password_item",
    label: "Confirmar Contraseña",
    labelClass: "label",
    type: "password",
    placeholder: "Ej: ********",
    name: "confirmPassword",
    editable: true,
    containerClass: "sm:col-span-3",
  },
  {
    id: "address_item",
    label: "Dirección",
    labelClass: "label",
    type: "text",
    placeholder: "Ej: Calle 123",
    name: "address",
    editable: true,
    containerClass: "sm:col-span-full",
  },
  {
    id: "municipality_item",
    label: "Municipio",
    labelClass: "label",
    type: "text",
    placeholder: "Ej: San Jose",
    name: "municipality",
    editable: true,
    containerClass: "sm:col-span-2 sm:col-start-1",
  },
  {
    id: "CI_item",
    label: "C.I",
    labelClass: "label",
    type: "text",
    placeholder: "Ej: 123456789",
    name: "CI",
    editable: true,
    containerClass: "sm:col-span-2",
  },
  {
    id: "phone_item",
    label: "Telefono",
    labelClass: "label",
    type: "text",
    placeholder: "Ej: 123456789",
    name: "phone",
    editable: true,
    containerClass: "sm:col-span-2",
  },
];

export const chooseUserRole: TInput[] = [
  {
    id: "ojeador_item",
    type: "radio",
    name: "role",
    value: Roles.USER,
    label: "Ojeador",
    labelClass: "label",
    inputClass: "h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600",
  },
  {
    id: "trabajador_item",
    type: "radio",
    name: "role",
    value: Roles.WORKER,
    label: "Trabajador",
    labelClass: "label",
    inputClass: "h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600",
  },
  {
    id: "admin_item",
    type: "radio",
    name: "role",
    value: Roles.ADMIN,
    label: "Administrador",
    labelClass: "label",
    inputClass: "h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600",
  },
];

export const createBusinessInput: TInput[] = [
  {
    id: "name_item",
    label: "Nombre",
    labelClass: "label",
    description: "Elija un nombre para identificar al negocio",
    required: true,
    type: "text",
    placeholder: "Ej: Mi Negocio",
    name: "name",
    editable: true,
    containerClass: "sm:col-span-3",
  },
  {
    id: "address_item",
    label: "Dirección",
    required: true,
    labelClass: "label",
    type: "text",
    placeholder: "Ej: Calle 123",
    name: "address",
    editable: true,
    containerClass: "sm:col-span-full",
  },
  {
    id: "municipality_item",
    label: "Municipio",
    labelClass: "label",
    required: true,
    type: "text",
    placeholder: "Ej: San Jose",
    name: "municipality",
    editable: true,
    containerClass: "sm:col-span-2 sm:col-start-1",
  },
  {
    id: "phone_item",
    label: "Telefono",
    labelClass: "label",
    type: "text",
    placeholder: "Ej: 123456789",
    name: "phone",
    editable: true,
    containerClass: "sm:col-span-2",
  },
];

export const editBusinessInput: TInput[] = createBusinessInput.filter(
  (input) => input.type !== "password"
);

export const ownerInput: TInput[] = [
  {
    id: "username_item",
    label: "Nombre de Usuario",
    labelClass: "label",
    type: "text",
    placeholder: "Ej: oscar123",
    name: "username",
    editable: true,
    containerClass: "sm:col-span-4",
    inputClass: "input",
  },
  {
    id: "email_item",
    label: "Correo",
    labelClass: "label",
    type: "email",
    placeholder: "Ej: 9sRFP@example.com",
    name: "email",
    editable: true,
    containerClass: "sm:col-span-4",
    inputClass: "input",
  },
  {
    id: "phone_item",
    label: "Telefono",
    labelClass: "label",
    type: "text",
    placeholder: "Ej: 123456789",
    name: "phone",
    editable: true,
    containerClass: "sm:col-span-4",
    inputClass: "input",
  },
];

export const editUserInput: TInput[] = createUserInput.filter(
  (input) => input.type !== "password"
);

export const moneyBreakdown: TInput[] = [
  {
    id: "1000_item",
    label: "$ 1000",
    labelClass: "label",
    type: "text",
    placeholder: "Ej: 1000",
    name: "1000",
    editable: true,
    containerClass: "sm:col-span-1",
    inputClass: "input",
  },
  {
    id: "500_item",
    label: "$ 500",
    labelClass: "label",
    type: "text",
    placeholder: "Ej: 500",
    name: "500",
    editable: true,
    containerClass: "sm:col-span-1",
    inputClass: "input",
  },
  {
    id: "200_item",
    label: "$ 200",
    labelClass: "label",
    type: "text",
    placeholder: "Ej: 200",
    name: "200",
    editable: true,
    containerClass: "sm:col-span-1",
    inputClass: "input",
  },
  {
    id: "100_item",
    label: "$ 100",
    labelClass: "label",
    type: "text",
    placeholder: "Ej: 100",
    name: "100",
    editable: true,
    containerClass: "sm:col-span-1",
    inputClass: "input",
  },
  {
    id: "50_item",
    label: "$ 50",
    labelClass: "label",
    type: "text",
    placeholder: "Ej: 50",
    name: "50",
    editable: true,
    containerClass: "sm:col-span-1",
    inputClass: "input",
  },
  {
    id: "20_item",
    label: "$ 20",
    labelClass: "label",
    type: "text",
    placeholder: "Ej: 20",
    name: "20",
    editable: true,
    containerClass: "sm:col-span-1",
    inputClass: "input",
  },
  {
    id: "10_item",
    label: "$ 10",
    labelClass: "label",
    type: "text",
    placeholder: "Ej: 10",
    name: "10",
    editable: true,
    containerClass: "sm:col-span-1",
    inputClass: "input",
  },
  {
    id: "5_item",
    label: "$ 5",
    labelClass: "label",
    type: "text",
    placeholder: "Ej: 5",
    name: "5",
    editable: true,
    containerClass: "sm:col-span-1",
    inputClass: "input",
  },
  {
    id: "3_item",
    label: "$ 3",
    labelClass: "label",
    type: "text",
    placeholder: "Ej: 3",
    name: "3",
    editable: true,
    containerClass: "sm:col-span-1",
    inputClass: "input",
  },
  {
    id: "1_item",
    label: "$ 1",
    labelClass: "label",
    type: "text",
    placeholder: "Ej: 1",
    name: "1",
    editable: true,
    containerClass: "sm:col-span-1",
    inputClass: "input",
  },
];

export const dailyBalance: TInput[] = [
  {
    id: "total_item",
    label: "Total de la venta",
    labelClass: "label",
    type: "text",
    placeholder: "Ej: 1000",
    name: "total",
    editable: true,
    containerClass: "sm:col-span-1",
    inputClass: "input",
  },
  {
    id: "balance_item",
    label: "Efectivo en caja",
    labelClass: "label",
    type: "text",
    placeholder: "Ej: 1000",
    name: "balance",
    editable: true,
    containerClass: "sm:col-span-1",
    inputClass: "input",
  },
  {
    id: "formerFund_item",
    label: "Fondo anterior",
    labelClass: "label",
    type: "text",
    placeholder: "Ej: 1000",
    name: "fund",
    editable: false,
    containerClass: "sm:col-span-1",
    inputClass: "input",
  },
  {
    id: "actualFund_item",
    label: "Fondo actual",
    labelClass: "label",
    type: "text",
    placeholder: "Ej: 1000",
    name: "actualFund",
    editable: true,
    containerClass: "sm:col-span-1",
    inputClass: "input",
  },
  {
    id: "debt_item",
    label: "Deuda",
    labelClass: "label",
    type: "text",
    placeholder: "Ej: 1000",
    name: "debt",
    editable: true,
    containerClass: "sm:col-span-1",
    inputClass: "input",
  },
];

export const chooseSalaryType: TInput[] = [
  {
    id: "percentage_item",
    label: "Porcentaje",
    description: "Porcentaje sobre el total de la venta",
    unit: "%",
    type: "text",
    placeholder: "Ej: 100",
    name: "percentage",
    editable: true,
  },
  {
    id: "fixed_item",
    label: "Fijo",
    unit: "$",
    type: "text",
    placeholder: "Ej: 100",
    name: "fixed",
    editable: true,
  },
];
