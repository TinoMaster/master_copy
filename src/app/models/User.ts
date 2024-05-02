import { model, models, Schema } from "mongoose";

export interface IUser extends Document {
  _id: string;
  email: string;
  username: string;
  password: string;
  role: string;
  name?: string;
  address?: string;
  municipality?: string;
  CI?: number;
  phone?: string;
  project?: string;
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
    password: { type: String, required: true },
    role: { type: String, required: true },
    address: { type: String },
    CI: Number,
    name: String,
    municipality: String,
    phone: String,
    project: { type: Schema.Types.ObjectId, ref: "Project" },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const UserModel = models?.User || model("User", UserSchema);
