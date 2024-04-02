"use server";

import { IUser, UserModel } from "@/app/models/User";
import { hashPassword } from "@/functions/api/password.hash";
import mongoose from "mongoose";

export async function registerUser(data: IUser) {
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
