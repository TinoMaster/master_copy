import { model, models, Schema } from "mongoose";

export interface IUser {
  _id: string;
  name?: string;
  username: string;
  email: string;
  password: string;
  role: string;
  address?: string;
  municipality?: string;
  CI?: number;
  phone?: string;
}

const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: {
      type: String,
      unique: true,
      required: true,
      match: [/.+@.+\..+/, "Please enter a valid e-mail address"],
    },
    address: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    CI: Number,
    name: String,
    municipality: String,
    phone: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const UserModel = models?.User || model("User", UserSchema);
