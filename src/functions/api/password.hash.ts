import bcrypt from "bcrypt";

export const hashPassword = async (pass: string) => {
  const hash = await bcrypt.hash(pass, 10);
  return hash;
};
