import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const SelectBusiness = () => {
  return (
    <div className="w-full sm:w-min p-5 space-y-4 rounded-md">
      <h4 className="head-title-banner">Elegir Negocio</h4>
      <div className="w-[180px]">
        <Select>
          <SelectTrigger className="">
            <SelectValue placeholder="Seleccione trabajador" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Negocios</SelectLabel>
              <SelectItem value="apple">DGIGA</SelectItem>
              <SelectItem value="banana">MI NEGOCIO</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
