import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      username: string;
      role: "admin" | "user" | "worker";
      sub?: string;
      project?: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    username: string;
    role: "admin" | "user" | "worker";
    sub?: string;
    project?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    username: string;
    role: "admin" | "user" | "worker";
    sub?: string;
    project?: string;
  }
}
