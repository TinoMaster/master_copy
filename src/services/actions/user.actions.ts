"use server";

import { IUser, UserModel } from "@/app/models/User";
import { hashPassword } from "@/functions/api/password.hash";
import { parseServerResponse } from "@/libs/utils";
import mongoose from "mongoose";

export async function getUsers() {
  try {
    await mongoose.connect(process.env.MONGODB_URI ?? "");
    const res = await UserModel.find<IUser>();

    return parseServerResponse<IUser[]>(res);
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getUser(id: string) {
  try {
    await mongoose.connect(process.env.MONGODB_URI ?? "");
    const res = await UserModel.findById<IUser>(id);

    if (!res) {
      return null;
    }

    return parseServerResponse<IUser>(res);
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function registerUser(data: Omit<IUser, "_id">) {
  try {
    const passwordHashed = await hashPassword(data.password);

    await mongoose.connect(process.env.MONGODB_URI ?? "");
    const res = await UserModel.create({ ...data, password: passwordHashed });

    if (!res) {
      return { success: false, message: "Error al registrar usuario" };
    }

    return { success: true, message: "Registro satisfactorio" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Ha ocurrido un error inesperado" };
  }
}
