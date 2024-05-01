import { Switch } from "@/components/ui/switch";
import React from "react";
import { UseFormGetValues, UseFormSetValue } from "react-hook-form";

export const ShareOption = ({
  index,
  getValues,
  setValue,
}: {
  index: number;
  getValues: UseFormGetValues<{
    statisticPermission: boolean;
  }>;
  setValue: UseFormSetValue<{
    statisticPermission: boolean;
  }>;
}) => {
  return (
    <div className="space-y-10">
      <div>
        <h3 className="mini-title">Compartir tu proyecto</h3>
        {index === 0 && (
          <p className="mini-subtitle">
            Esta opción te permitirá compartir tu proyecto con los usuarios que
            visiten la pagina de proyectos.
          </p>
        )}
      </div>
      <div className="flex justify-between items-center px-2">
        <p className="">Compartir</p>
        <Switch
          id="statisticPermission"
          defaultChecked={getValues("statisticPermission")}
          onCheckedChange={(val) => {
            setValue("statisticPermission", val);
          }}
          className="data-[state=checked]:bg-green-600/80 "
        />
      </div>
    </div>
  );
};
