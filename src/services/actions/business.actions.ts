"use server";

import { BusinessModel, IBusiness } from "@/app/models/BusinessSchema";
import { parseServerResponse } from "@/libs/utils";
import mongoose from "mongoose";
import { revalidateTag } from "next/cache";

export async function getBusinessByOwner(ownerId: string) {
  try {
    await mongoose.connect(process.env.MONGODB_URI ?? "");
    const business = await BusinessModel.find({ owner: ownerId });
    return parseServerResponse<IBusiness[]>(business);
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function updateBusiness(
  businessId: string,
  data: Partial<IBusiness>
) {
  try {
    await mongoose.connect(process.env.MONGODB_URI ?? "");
    await BusinessModel.findByIdAndUpdate(businessId, data);

    revalidateTag("business");
    revalidateTag("project");
    return { success: true, message: "Negocio actualizado con éxito" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Ah ocurrido un error" };
  }
}
