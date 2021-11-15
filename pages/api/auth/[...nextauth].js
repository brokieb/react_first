import NextAuth, { signIn } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import FacebookProvider from 'next-auth/providers/facebook';
import bcrypt from 'bcrypt';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';

import clientPromise from 'app/lib/mongodb';
import dbConnect from 'app/lib/dbConnect';
import User from 'model/users';

export default async function auth(req, res) {
	return await NextAuth(req, res, {
		adapter: MongoDBAdapter({
			db: (await clientPromise).db('react'),
		}),
		providers: [
			GithubProvider({
				clientId: process.env.GITHUB_ID,
				clientSecret: process.env.GITHUB_SECRET,
			}),
			CredentialsProvider({
				// The name to display on the sign in form (e.g. 'Sign in with...')
				name: 'Logo',
				credentials: {
					email: { label: 'Email', type: 'text', placeholder: 'jsmith' },
					password: { label: 'Hasło', type: 'password' },
				},
				async authorize(credentials, req) {
					const user = await User.findOne({ email: credentials.email });

					if (user == null) {
						return null;
					} else {
						const checkPw = await bcrypt.compare(credentials.password, user.password);
						if (!checkPw) {
							return null;
						} else {
							return { name: user.name, _id: user._id };
						}
					}
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
				//dołączenie do obiektu sesji id użytkownika i uprawnienia z bazy
				const user = await User.findById(token.sub);
				session.user.permission = user.permission ? user.permission : 0;
				session.user.uid = user._id;

				return Promise.resolve(session);
			},
		},
	});
}
