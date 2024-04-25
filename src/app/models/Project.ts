import { model, models, Schema } from "mongoose";

export interface IProject extends Document {
  _id: string;
  name: string;
  owner: string;
  business: string[];
  credit: number;
}

const ProjectSchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    business: [{ type: Schema.Types.ObjectId, ref: "Business" }],
    credit: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const ProjectModel =
  models?.Project || model<IProject>("Project", ProjectSchema);
