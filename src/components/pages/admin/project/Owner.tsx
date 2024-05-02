import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ownerInput } from "@/constants/inputs";

export const Owner = () => {
  return (
    <form action="">
      <fieldset className="">
        <legend className="mini-title">Propietario</legend>
        <div>
          <p className="mini-subtitle">Configura tu perfil.</p>
        </div>
        <div className="px-2 py-8 space-y-4">
          {ownerInput.map((input) => (
            <div
              key={input.id}
              className="flex flex-col sm:flex-row justify-between sm:items-center"
            >
              <label htmlFor={input.id} className={input.labelClass}>
                {input.label}
              </label>
              <Input
                type="text"
                placeholder={input.placeholder}
                id={input.id}
                className="sm:w-1/2 bg-transparent"
              />
            </div>
          ))}
        </div>
      </fieldset>
      <div className="flex justify-end">
        <Button className="bg-primary/50">Guardar</Button>
      </div>
    </form>
  );
};
