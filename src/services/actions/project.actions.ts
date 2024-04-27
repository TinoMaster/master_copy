"use server";
import { IProject, ProjectModel } from "@/app/models/Project";
import { CreateFirstProject } from "@/types";
import { BusinessModel, IBusiness } from "@/app/models/BusinessSchema";
import mongoose from "mongoose";
import { revalidateTag } from "next/cache";
import { UserModel } from "@/app/models/User";

export async function createProject(data: CreateFirstProject) {
  const dataProject: Partial<IProject> = {
    name: data.projectName,
    owner: data.owner,
    credit: 700,
  };
  try {
    await mongoose.connect(process.env.MONGODB_URI ?? "");
    const res = await ProjectModel.create(dataProject);

    if (!res) throw Error("Error al crear el proyecto");
    const projectId = JSON.parse(JSON.stringify(res._id));
    const dataBusiness: Partial<IBusiness> = {
      name: data.name,
      owner: data.owner,
      project: projectId,
      description: data.description,
      credit: 0,
      status: data.status,
      address: data.address,
      phone: data.phone,
      statisticPermission: data.statisticPermission ?? false,
      municipality: data.municipality,
    };
    await UserModel.findByIdAndUpdate(data.owner, {
      project: projectId,
    });
    const response = await BusinessModel.create(dataBusiness);

    if (!response) throw Error("Error al crear la organización");
    const businessId = JSON.parse(JSON.stringify(response._id));

    await ProjectModel.findByIdAndUpdate(projectId, {
      $push: { business: businessId },
    });

    revalidateTag("businesses");
    revalidateTag("project");
    return {
      success: true,
      message: "Proyecto creado con éxito",
      projectId: projectId,
    };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Ah ocurrido un error" };
  }
}
