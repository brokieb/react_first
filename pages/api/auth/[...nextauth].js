import NextAuth, { signIn } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import FacebookProvider from 'next-auth/providers/facebook';
import bcrypt from 'bcrypt';
import clientPromise from '../../../lib/mongodb';
import dbConnect from '../../../lib/dbConnect';
import User from '../../../model/users';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';

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
					console.log(user);
					if (user == null) {
						return null;
					} else {
						const checkPw = await bcrypt.compare(credentials.password, user.password);
						if (!checkPw) {
							return null;
						} else {
							console.log('zalogowano :(');
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
			async session({ session, token, user }) {
				//dołączenie do obiektu sesji id użytkownika z bazy
				session.user.uid = token.sub;
				return Promise.resolve(session);
			},
		},
	});
}
