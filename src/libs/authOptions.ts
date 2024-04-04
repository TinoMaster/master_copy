import { UserModel } from "@/app/models/User";
import { db_config } from "@/config/db.config";
import { nextAuthConfig } from "@/config/nextAuth.config";
import { verifyPassword } from "@/functions/api/password.verify";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import mongoose from "mongoose";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "./clientPromise";

export const authOptions: AuthOptions = {
  secret: nextAuthConfig.secret,
  providers: [
    CredentialsProvider({
      name: "credentials",
      id: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "laura@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (credentials) {
          const { email, password } = credentials;

          await mongoose.connect(`${db_config.URI}`);
          const user = await UserModel.findOne({ email }).select("+password");

          if (user && (await verifyPassword(password, user.password))) {
            return user;
          } else {
            return null;
          }
        }
      },
    }),
  ],
  adapter: MongoDBAdapter(clientPromise) as any,
  pages: {
    signIn: "/login",
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: nextAuthConfig.secret,
    maxAge: 60 * 60 * 24 * 30,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.email = user.email;
        token.username = user.username;
        token.role = user.role;
      }

      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user = {
          username: token.username,
          email: token.email,
          sub: token.sub,
          role: token.role,
        } as any;
      }
      return session;
    },
  },
};
