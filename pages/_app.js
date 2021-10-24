import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/index.scss';
import { SSRProvider } from '@react-aria/ssr';
import MainNavigation from '../components/layout/MainNavigation';
import AuthProvider from '../components/auth/AuthProvider';
import Layout from '../components/layout/Layout';
import { useSession, SessionProvider } from 'next-auth/react';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
	return (
		<SSRProvider>
			<SessionProvider session={session}>
				<MainNavigation />
				<Layout>
					<AuthProvider>
						<Component {...pageProps} />
					</AuthProvider>
				</Layout>
			</SessionProvider>
		</SSRProvider>
	);
}

export default MyApp;
