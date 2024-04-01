import bcrypt from "bcrypt";

export const verifyPassword = async (pass: string, hash: string) => {
  const isMatch = await bcrypt.compare(pass, hash);
  return isMatch;
};
