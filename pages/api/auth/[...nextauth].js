import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";

import clientPromise from "../../../app/lib/mongodb";
import User from "../../../model/users";

export default async function auth(req, res) {
  return await NextAuth(req, res, {
    adapter: MongoDBAdapter({
      db: (await clientPromise).db("react"),
    }),
    providers: [
      GithubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
      }),
      CredentialsProvider({
        // The name to display on the sign in form (e.g. 'Sign in with...')
        id: "credentials",
        name: "Credentials",
        type: "credentials",
        async authorize(credentials, req) {
          const user = await User.findOne({ email: credentials.email });
          if (user) {
            const checkPw = await bcrypt.compare(
              credentials.password,
              user.password
            );
            if (checkPw) {
              return {
                name: user.name,
                email: user.email,
                image: user.image,
                permission: 2,
              };
            }
          }
          return null;
        },
      }),
      // ...add more providers here
    ],
    secret: "INp8IvdIyeMcoGAgFGoA61DdBglwwSqnXJZkgz8PSnw",
    session: {
      jwt: true,
    },
    jwt: {
      signingKey: process.env.JWT_SIGNING_PRIVATE_KEY,
    },
    callbacks: {
      jwt: async ({ token, user }) => {
        user &&
          (token.user = {
            permission: user.permission,
            uid: user.id,
            email: user.email,
            name: user.name,
          });
        return token;
      },
      session: async ({ session, token, user }) => {
        session.user.uid = user.id;
        session.user.permission = user.permission ? user.permission : 0;
        return session;
      },
    },
  });
}
