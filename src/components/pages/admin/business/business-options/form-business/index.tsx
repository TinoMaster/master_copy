"use client";
import { IBusiness } from "@/app/models/BusinessSchema";
import { Switch } from "@/components/ui/switch";
import { dayHours } from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { ShareOption } from "./ShareOption";
import { Schedule } from "./Schedule";

type Inputs = {
  statisticPermission: boolean;
};

const FormSchema = z.object({
  statisticPermission: z.boolean(),
});

export function FormBusiness({
  business,
  index,
}: {
  readonly business: IBusiness;
  readonly index: number;
}) {
  const { name } = business;
  const { handleSubmit, setValue, getValues } = useForm<
    z.infer<typeof FormSchema>
  >({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      statisticPermission: business.statisticPermission ?? false,
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (
    data: z.infer<typeof FormSchema>
  ) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h3 className="mini-title">{name}</h3>
      <div className="space-y-10 outline outline-1 outline-gray-700 p-5  rounded-md">
        <ShareOption index={index} getValues={getValues} setValue={setValue} />
        <Schedule index={index} />
      </div>
    </form>
  );
}
