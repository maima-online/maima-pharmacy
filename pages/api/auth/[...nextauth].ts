import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { userService } from "../../../services";

const providers = [
  CredentialsProvider({
    name: "Credentials",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials: any, req) {
      const user = await userService.login({
        email: credentials?.email,
        password: credentials?.password,
      });

      if (user) {
        return user.data;
      } else {
        return null;
      }
    },
  }),
];

const callbacks: any = {};

callbacks.jwt = async function jwt({ token, user }: any) {
  if (user) {
    token.accessToken = user.accessToken;
  }
  return token;
};

callbacks.session = async function session({ session, token }: any) {
  session.accessToken = token.accessToken;
  session.expires = token.exp;
  return session;
};

const options = {
  providers,
  callbacks,
  pages: {
    error: "/login", // Changing the error redirect page to our custom login page
  },
};

const nextAuth = (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);

export default nextAuth;
