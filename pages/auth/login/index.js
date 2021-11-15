import { getProviders, signIn } from 'next-auth/react';
import LoginForm from 'app/components/elements/forms/auth/LoginForm';
import { useRouter } from 'next/router';
import Button from 'react-bootstrap/Button';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function SignIn({ providers }) {
	return (
		<>
			<LoginForm>
				<Button onClick={() => signIn('github')}>Zaloguj się przez Github</Button>
				<Link href="/auth/register">
					<Button>Załóż konto email</Button>
				</Link>
				{/* {Object.values(providers).map((provider) => (
					<div key={provider.name}>
						<Button onClick={() => signIn(provider.id)}>
							Sign in {provider.id}with {provider.name}
						</Button>
					</div>
				))} */}
			</LoginForm>
		</>
	);
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
	const providers = await getProviders();
	return {
		props: { providers },
	};
}
