"use server";

import { BusinessModel, IBusiness } from "@/app/models/BusinessSchema";
import { ProjectModel } from "@/app/models/Project";
import { parseServerResponse } from "@/libs/utils";
import mongoose from "mongoose";
import { revalidateTag } from "next/cache";

export async function createBusiness(data: Partial<IBusiness>) {
  try {
    await mongoose.connect(process.env.MONGODB_URI ?? "");
    const response = await BusinessModel.create(data);

    if (!response) throw new Error("No se pudo crear el negocio");

    await ProjectModel.findByIdAndUpdate(data.project, {
      $push: { business: response._id },
    });
    revalidateTag("business");
    revalidateTag("project");
    return { success: true, message: "Negocio creado correctamente" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Error al crear el negocio" };
  }
}

export async function deleteBusiness(businessId: string, projectId: string) {
  try {
    await mongoose.connect(process.env.MONGODB_URI ?? "");
    const project = await ProjectModel.findById(projectId);

    if (!project || project.business.length === 1) {
      return {
        success: false,
        message: "No puedes eliminar todos los negocios de un proyecto",
      };
    }

    await BusinessModel.findByIdAndDelete(businessId);
    await ProjectModel.findByIdAndUpdate(projectId, {
      $pull: { business: businessId },
    });
    revalidateTag("business");
    revalidateTag("project");
    return { success: true, message: "Negocio eliminado correctamente" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Ah ocurrido un error" };
  }
}

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
