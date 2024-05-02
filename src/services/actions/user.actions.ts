"use server";

import { IUser, UserModel } from "@/app/models/User";
import { hashPassword } from "@/functions/api/password.hash";
import { parseServerResponse } from "@/libs/utils";
import mongoose from "mongoose";
import { revalidateTag } from "next/cache";
import { TAdminZod } from "../validators/user.zod";

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

export async function userHasProject(email: string) {
  try {
    const res = await UserModel.findOne({ email: email });

    if (!res) {
      return { success: false, message: "Error al obtener el usuario" };
    }

    if (res?.project) {
      return {
        success: true,
        message: "El usuario tiene proyecto",
        data: JSON.parse(JSON.stringify(res.project)),
      };
    }

    return { success: false, message: "El usuario no tiene proyecto" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Error inesperado" };
  }
}

export async function registerAdmin(data: TAdminZod) {
  const passwordHashed = await hashPassword(data.password);
  try {
    await mongoose.connect(process.env.MONGODB_URI ?? "");
    const res = await UserModel.create({ ...data, password: passwordHashed });

    if (!res) {
      return { success: false, message: "Error al registrar usuario" };
    }

    revalidateTag("users");
    return { success: true, message: "Usuario registrado satisfactoriamente" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Ha ocurrido un error" };
  }
}

export async function registerUser(data: Partial<IUser>) {
  try {
    if (!data?.password) {
      return { success: false, message: "Debe enviar una contraseña" };
    }
    const passwordHashed = await hashPassword(data.password);
    await mongoose.connect(process.env.MONGODB_URI ?? "");
    const res = await UserModel.create({ ...data, password: passwordHashed });

    if (!res) {
      return { success: false, message: "Error al registrar usuario" };
    }

    revalidateTag("users");
    return { success: true, message: "Registro satisfactorio" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Ha ocurrido un error inesperado" };
  }
}

export async function updateUser(id: string, data: Partial<IUser>) {
  try {
    await mongoose.connect(process.env.MONGODB_URI ?? "");
    const res = await UserModel.findByIdAndUpdate(id, data);

    if (!res) {
      return { success: false, message: "Error al registrar usuario" };
    }

    revalidateTag("users");
    return { success: true, message: "Usuario Editado" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Ha ocurrido un error inesperado" };
  }
}
