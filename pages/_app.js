import 'public/css/bootstrap.min.css';
import { SSRProvider } from '@react-aria/ssr';
import { useSession, SessionProvider } from 'next-auth/react';
import { CookiesProvider } from 'react-cookie';
import { Provider } from 'react-redux';

import store from 'app/lib/reduxStore';
import 'app/styles/index.scss';
import MainNavigation from 'app/components/layout/mainNavigation';
import AuthProvider from 'app/lib/AuthProvider';
import Layout from 'app/components/layout/layout';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
	return (
		<SSRProvider>
			<CookiesProvider>
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
			</CookiesProvider>
		</SSRProvider>
	);
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

export default MyApp;
