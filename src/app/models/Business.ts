import { initialSchedules } from "@/constants";
import mongoose, { model, models, Schema } from "mongoose";
import { UserModel } from "./User";

export interface IBusiness extends Document {
  _id: string;
  name: string;
  owner: string;
  project: string;
  description?: string;
  status: string;
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
    address: String,
    municipality: String,
    phone: String,
    schedules: {
      type: [
        {
          day: String,
          openingTime: String,
          closingTime: String,
        },
      ],
      default: initialSchedules,
    },
    statisticPermission: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

BusinessSchema.pre("findOneAndDelete", async function (next) {
  try {
    const businessId: mongoose.Types.ObjectId = this.getQuery()["_id"];
    const users = await UserModel.find({ business: { $in: [businessId] } });

    if (users.length > 0) {
      await Promise.all(
        users.map(async (user) => {
          await UserModel.findByIdAndUpdate(user._id, {
            $pull: { business: businessId },
          });
        })
      );
    }

    next();
  } catch (error: any) {
    console.log(error);
    next(error);
  }
});

export const BusinessModel =
  models?.Business || model<IBusiness>("Business", BusinessSchema);
