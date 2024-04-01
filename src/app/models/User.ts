import { model, models, Schema } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  address: string;
  password: string;
  role: string;
  name?: string;
  municipality?: string;
  phone?: string;
  image?: string;
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
    name: String,
    municipality: String,
    phone: String,
    image: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const UserModel = models?.User || model("User", UserSchema);
