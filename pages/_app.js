import Layout from '../components/layout/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SSRProvider } from '@react-aria/ssr';

function MyApp({ Component, pageProps }) {
	return (
		<SSRProvider>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</SSRProvider>
	);
}

export default MyApp;
