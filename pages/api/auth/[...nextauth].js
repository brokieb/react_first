import NextAuth, { signIn } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
import bcrypt from "bcrypt";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";

import clientPromise from "app/lib/mongodb";
import dbConnect from "app/lib/dbConnect";
import User from "model/users";

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
              console.log(user);
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
    session: {
      jwt: true,
    },
    jwt: {
      signingKey: process.env.JWT_SIGNING_PRIVATE_KEY,
    },
    callbacks: {
      async session({ session, token }) {
        const user = await User.findOne(
          token.sub ? { _id: token.sub } : { email: token.email }
        );

        session.user.permission = user.permission ? user.permission : 0;
        session.user.uid = user._id;
        //dołączenie do obiektu sesji id użytkownika i uprawnienia z bazy

        return Promise.resolve(session);
      },
    },
  });
}
