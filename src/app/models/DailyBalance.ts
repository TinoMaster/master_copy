import { model, Schema, models } from "mongoose";
import { IUser } from "./User";

export interface IDailyBalance extends Document {
  _id: string;
  dateId: string;
  business: string;
  workers: {
    worker: string;
    salary: number;
    salaryType: {
      percentage: number;
      fixed: number;
    };
    discount: { percentage: number; fixed: number };
  }[];
  date: Date;
  total: number;
  workersSalary: number;
  businessSalary: number;
}

export interface IDailyBalancePopulated {
  _id: string;
  dateId: string;
  business: string;
  workers: {
    worker: IUser;
    salary: number;
    salaryType: {
      percentage: number;
      fixed: number;
    };
    discount: { percentage: number; fixed: number };
  };
  date: Date;
  total: number;
  workersSalary: number;
  businessSalary: number;
}

export const DailyBalanceSchema = new Schema(
  {
    dateId: { type: String, unique: true, required: true },
    business: { type: Schema.Types.ObjectId, ref: "Business", required: true },
    workers: [
      {
        worker: { type: Schema.Types.ObjectId, ref: "User", required: true },
        salary: { type: Number, required: true },
        salaryType: {
          percentage: { type: Number, required: true },
          fixed: { type: Number, required: true },
        },
        discount: { percentage: Number, fixed: Number },
      },
    ],
    date: { type: Date, required: true },
    total: { type: Number, required: true },
    businessSalary: { type: Number, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const DailyBalanceModel =
  models?.DailyBalance ||
  model<IDailyBalance>("DailyBalance", DailyBalanceSchema);
