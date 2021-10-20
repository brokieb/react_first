import NextAuth, { signIn } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
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

				// // The credentials is used to generate a suitable form on the sign in page.
				// // You can specify whatever fields you are expecting to be submitted.
				// // e.g. domain, username, password, 2FA token, etc.
				// // You can pass any HTML attribute to the <input> tag through the object.
				// credentials: {
				// 	name: { label: 'Login', type: 'text', placeholder: 'jsmith' },
				// 	email: { label: 'Email', type: 'text', placeholder: 'jsmith' },
				// 	password: { label: 'Hasło', type: 'password' },
				// 	rpassword: { label: 'Powtórz hasło', type: 'password' },
				// },
				// async authorize(credentials, req) {
				// 	await dbConnect();
				// 	const result = await User.findOne({ email: credentials.email });

				// 	if (result == null) {
				// 		//zakladamy uzytkownika
				// 	} else {
				// 		const checkPw = await bcrypt.compare(credentials.password, result.password);
				// 		if (!checkPw) {
				// 			throw new Error('Niepoprawne hasło');
				// 		} else {
				// 			return { name: result.name, email: result.email, id: result._id, image: result.image };
				// 		}

				// 		//użytkownik taki istnieje
				// 	}
				// },
			}),
			// ...add more providers here
		],
		session: {
			jwt: true,
		},
		jwt: {
			signingKey: process.env.JWT_SIGNING_PRIVATE_KEY,
		},
	});
}
