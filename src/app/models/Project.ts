import { model, models, Schema } from "mongoose";

export interface IProject {
  _id: string;
  name: string;
  image: string;
  owner: string;
  business: string;
  description: string;
  status: string;
  credit: number;
  workers: string[];
  address: string;
  municipality: string;
  phone: string;
}

const ProjectSchema = new Schema(
  {
    name: { type: String, required: true },
    image: String,
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    business: { type: Schema.Types.ObjectId, ref: "Business", required: true },
    description: { type: String, required: true },
    status: { type: String, required: true },
    credit: { type: Number, default: 0 },
    workers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    address: String,
    municipality: String,
    phone: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const ProjectModel = models?.Project || model("Project", ProjectSchema);
