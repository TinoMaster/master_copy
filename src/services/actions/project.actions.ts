"use server";
import { IProject, ProjectModel } from "@/app/models/Project";
import { CreateFirstProject } from "@/types";
import { IBusiness } from "@/app/models/BusinessSchema";
import mongoose from "mongoose";

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
    const dataBusiness: Partial<IBusiness> = {
      name: data.name,
      owner: data.owner,
      project: JSON.parse(JSON.stringify(res._id)),
      description: data.description,
      credit: 0,
      status: data.status,
      address: data.address,
      phone: data.phone,
      statisticPermission: data.statisticPermission ?? false,
      municipality: data.municipality,
    };
    console.log(dataBusiness);
  } catch (error) {
    console.log(error);
  }
}
