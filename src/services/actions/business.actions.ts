"use server";

import { BusinessModel, IBusiness } from "@/app/models/BusinessSchema";
import { parseServerResponse } from "@/libs/utils";
import mongoose from "mongoose";

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
  console.log(data);
  try {
    await mongoose.connect(process.env.MONGODB_URI ?? "");
    await BusinessModel.findByIdAndUpdate(businessId, data);

    return { success: true, message: "Negocio actualizado con éxito" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Ah ocurrido un error" };
  }
}
