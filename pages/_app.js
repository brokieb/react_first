import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/index.scss';
import { SSRProvider } from '@react-aria/ssr';
import MainNavigation from '../components/layout/MainNavigation';
import AuthProvider from '../components/auth/AuthProvider';
import Layout from '../components/layout/Layout';
import { useSession, SessionProvider } from 'next-auth/react';
import { Provider } from 'react-redux';
import store from '../lib/reduxStore';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
	return (
		<SSRProvider>
			<Provider store={store}>
				<SessionProvider session={session}>
					<MainNavigation />
					<Layout>
						<AuthProvider>
							<Component {...pageProps} />
						</AuthProvider>
					</Layout>
				</SessionProvider>
			</Provider>
		</SSRProvider>
	);
}

export async function getServerSideProps(context) {
	const session = await getSession({ req: context.req });
	console.log('uruchamian server sajda');
	if (!session) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}
}

export default MyApp;
