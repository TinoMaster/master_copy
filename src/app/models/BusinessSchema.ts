import { model, models, Schema } from "mongoose";

export interface IBusiness extends Document {
  _id: string;
  name: string;
  owner: string;
  project: string;
  description?: string;
  status: string;
  workers: string[];
  address: string;
  municipality: string;
  phone?: string;
  schedules?: { day: string; openingTime: string; closingTime: string }[];
  statisticPermission?: boolean;
}

const BusinessSchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    project: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    description: { type: String },
    status: { type: String, required: true },
    workers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    address: String,
    municipality: String,
    phone: String,
    schedules: [
      {
        day: String,
        openingTime: String,
        closingTime: String,
      },
    ],
    statisticPermission: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const BusinessModel =
  models?.Business || model<IBusiness>("Business", BusinessSchema);
