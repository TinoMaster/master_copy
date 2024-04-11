"use client";
import { IUser } from "@/app/models/User";

type Inputs = {
  name: string;
  username: string;
  email: string;
  address: string;
  municipality: string;
  CI: string;
  phone: string;
  role: string;
};

export const FormUpdateUser = ({ user }: { user: IUser }) => {
  return <div>FormUpdateUser</div>;
};
