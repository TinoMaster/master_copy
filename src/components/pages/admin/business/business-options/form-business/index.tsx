"use client";
import { IBusiness } from "@/app/models/BusinessSchema";
import { Button } from "@/components/ui/button";
import { initialSchedules } from "@/constants";
import {
  businessUpdateSchema,
  TBusinessUpdateZod,
} from "@/services/validators/business.zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { ProfileBusiness } from "./Profile";
import { Schedule } from "./Schedule";
import { ShareOption } from "./ShareOption";
import { useRef } from "react";
import toast from "react-hot-toast";
import {
  deleteBusiness,
  updateBusiness,
} from "@/services/actions/business.actions";

type Inputs = {
  name: string;
  description: string;
  address: string;
  municipality: string;
  phone: string;
  schedules: { day: string; openingTime: string; closingTime: string }[];
  statisticPermission?: boolean;
};

export function FormBusiness({
  business,
  index,
}: {
  readonly business: IBusiness;
  readonly index: number;
}) {
  const { name } = business;
  const {
    handleSubmit,
    setValue,
    getValues,
    register,
    formState: { errors, isDirty },
    clearErrors,
  } = useForm<TBusinessUpdateZod>({
    resolver: zodResolver(businessUpdateSchema),
    defaultValues: {
      schedules: business.schedules ?? initialSchedules,
      statisticPermission: business.statisticPermission ?? false,
      name: name,
      address: business.address,
      municipality: business.municipality,
      phone: business.phone,
      description: business.description,
    },
  });

  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit: SubmitHandler<Inputs> = async (data: TBusinessUpdateZod) => {
    toast.loading("Actualizando negocio...");
    const response = await updateBusiness(business._id, data);
    toast.dismiss();
    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };

  const onDelete = async () => {
    toast.loading("Eliminando negocio...");
    const response = await deleteBusiness(business._id, business.project);
    toast.dismiss();
    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h3 className="mini-title">{name}</h3>
      <div className="space-y-10 outline outline-1 outline-gray-700/10 p-5  rounded-md">
        <ShareOption index={index} getValues={getValues} setValue={setValue} />
        <ProfileBusiness register={register} />
        <Schedule
          index={index}
          schedules={getValues("schedules") ?? initialSchedules}
          setValue={setValue}
          clearErrors={clearErrors}
        />
        <div className="flex justify-end relative gap-2">
          {/* Errors */}
          <p className="text-red-500 absolute left-0">
            {Object.entries(errors).length > 0 &&
              Object.entries(errors)[0][1].message}
          </p>
          <Button
            disabled={Object.keys(errors).length > 0 || !isDirty}
            type="submit"
            className="bg-primary"
          >
            Guardar
          </Button>
          <Button type="button" className="bg-red-500" onClick={onDelete}>
            Eliminar negocio
          </Button>
        </div>
      </div>
    </form>
  );
}
