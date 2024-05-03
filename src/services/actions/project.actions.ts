"use server";
import { BusinessModel, IBusiness } from "@/app/models/BusinessSchema";
import { IProject, ProjectModel } from "@/app/models/Project";
import { UserModel } from "@/app/models/User";
import { parseServerResponse } from "@/libs/utils";
import { CreateFirstProject } from "@/types";
import mongoose from "mongoose";
import { revalidateTag } from "next/cache";

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

export async function getProject(projectId: string) {
  try {
    await mongoose.connect(process.env.MONGODB_URI ?? "");
    const project = await ProjectModel.findById(projectId);

    if (!project) {
      return false;
    }

    return parseServerResponse<IProject>(project);
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function updateProject(
  projectId: string,
  data: Partial<IProject>
) {
  try {
    await mongoose.connect(process.env.MONGODB_URI ?? "");
    await ProjectModel.findByIdAndUpdate(projectId, data);
    revalidateTag("project");
    return { success: true, message: "Usuario actualizado correctamente" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Ah ocurrido un error" };
  }
}
