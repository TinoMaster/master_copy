import { Role } from "@/services/validators/user.zod";
import { model, models, Schema } from "mongoose";
import { IBusiness } from "./Business";

export interface IUser extends Document {
  _id: string;
  email: string;
  username: string;
  password: string;
  role: Role;
  name?: string;
  address?: string;
  municipality?: string;
  CI?: number;
  phone?: string;
  project?: string;
  business: string[];
  salaryType?: { percentage: number; fixed: number };
}

export interface IUserBusinessPopulated
  extends Omit<IUser, "password" | "business"> {
  business: IBusiness[];
}

const UserSchema = new Schema(
  {
    username: { type: String, required: true },
    email: {
      type: String,
      unique: true,
      required: true,
      match: [/.+@.+\..+/, "Please enter a valid e-mail address"],
    },
    password: { type: String, required: true },
    role: { type: String, required: true },
    address: { type: String },
    CI: Number,
    name: String,
    municipality: String,
    phone: String,
    project: { type: Schema.Types.ObjectId, ref: "Project" },
    business: [{ type: Schema.Types.ObjectId, ref: "Business" }],
    salaryType: { percentage: Number, fixed: Number },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const UserModel = models?.User || model("User", UserSchema);
