import React from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

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
		return <div>Wczytywanie strony lub nie masz uprawnień...</div>;
	}
}

export default AuthProvider;
