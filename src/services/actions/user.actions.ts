"use server";
import { IUser, IUserBusinessPopulated, UserModel } from "@/app/models/User";
import { hashPassword } from "@/functions/api/password.hash";
import { parseServerResponse } from "@/libs/utils";
import mongoose from "mongoose";
import { revalidateTag } from "next/cache";
import { TOwnerZod } from "../validators/user.zod";
import { IBusiness } from "@/app/models/Business";
import { IDailyBalance } from "@/app/models/DailyBalance";

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

export async function getUsersByProject(projectId: string, owner: string) {
  try {
    await mongoose.connect(process.env.MONGODB_URI ?? "");
    const res = await UserModel.find({ project: projectId });
    const users = res.filter(
      (user) => JSON.parse(JSON.stringify(user._id)) !== owner
    );
    return parseServerResponse<IUser[]>(users);
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

export async function registerAdmin(data: TOwnerZod) {
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

export async function deleteUser(userId: string) {
  try {
    await mongoose.connect(process.env.MONGODB_URI ?? "");
    await UserModel.findByIdAndDelete(userId);
    revalidateTag("users");
    return { success: true, message: "Usuario eliminado" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Ha ocurrido un error inesperado" };
  }
}

export async function existEmail(email: string, userId?: string) {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    const user = await UserModel.findOne({ email });
    if (user && JSON.parse(JSON.stringify(user._id)) !== userId) {
      return true;
    }
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function ListBusinessToBalanceByUser(userId: string) {
  try {
    await mongoose.connect((process.env.MONGODB_URI as string) ?? "");
    const user = await UserModel.findById<IUserBusinessPopulated>(
      userId
    ).populate("business");

    if (!user) throw new Error("No se encontró el usuario");

    const businesses: Pick<IBusiness, "_id" | "name">[] = user.business.map(
      (business) => {
        return {
          _id: business._id,
          name: business.name,
        };
      }
    );
    return {
      success: true,
      data: parseServerResponse<Pick<IBusiness, "_id" | "name">[]>(businesses),
    };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Error al obtener usuario" };
  }
}

export async function ListWorkersByBusiness(businessId: string) {
  try {
    await mongoose.connect((process.env.MONGODB_URI as string) ?? "");
    const usersByBusiness = await UserModel.find<IUser>({
      business: { $in: [businessId] },
    });

    if (!usersByBusiness) throw new Error("Error al hacer la petición");

    if (!usersByBusiness.length) return null;

    return parseServerResponse<IUser[]>(usersByBusiness);
  } catch (error) {
    console.log(error);
    return null;
  }
}
