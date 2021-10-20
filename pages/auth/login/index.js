import { getProviders, signIn } from 'next-auth/react';
import LoginForm from '../../../components/auth/LoginForm';
import { useRouter } from 'next/router';
import Button from 'react-bootstrap/Button';
import { useSession } from 'next-auth/react';

export default function SignIn({ providers }) {
	return (
		<>
			<LoginForm>
				{Object.values(providers).map((provider) => (
					<div key={provider.name}>
						<Button onClick={() => signIn(provider.id)}>Sign in with {provider.name}</Button>
					</div>
				))}
			</LoginForm>
		</>
	);
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
	console.log('asdsad');
	const providers = await getProviders();
	return {
		props: { providers },
	};
}
