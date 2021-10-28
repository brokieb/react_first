import React from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Loading from '../layout/Loading';
// import signIn from '../../pages/auth/login'
function AuthProvider({ children }) {
	const { data: session, status, token } = useSession();
	const isUser = !!session?.user;
	const router = useRouter();
	const role = 'admin';
	let allowed = true;

	if (router.pathname.startsWith('/auth') && session) {
		allowed = false;
	} else if (router.pathname.startsWith('/admin') && role != 'admin') {
		allowed = false;
	} else if (router.pathname.startsWith('/user') && !session) {
		allowed = false;
	}

	if (allowed) {
		return children;
	} else {
		return <Loading />;
	}
}
export async function getServerSideProps(context) {
	const session = await getSession({ req: context.req });
	if (!session) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}
}

export default AuthProvider;
