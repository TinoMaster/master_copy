import { model, models, Schema } from "mongoose";

export interface IBusiness {
  _id: string;
  name: string;
  owner: string;
  projects: string[];
  credit: number;
}

const BusinessSchema = new Schema(
  {
    name: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    projects: [{ type: Schema.Types.ObjectId, ref: "Project" }],
    credit: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const BusinessModel =
  models?.Business || model("Business", BusinessSchema);
