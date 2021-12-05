import "public/css/bootstrap.min.css";
import { SSRProvider } from "@react-aria/ssr";
import { useSession, SessionProvider } from "next-auth/react";
import { CookiesProvider } from "react-cookie";
import { Provider } from "react-redux";
import { useState } from "react";
import store from "app/lib/reduxStore";
import "app/styles/index.scss";
import MainNavigation from "app/components/layout/mainNavigation";
import AuthProvider from "app/lib/AuthProvider";
import Layout from "app/components/layout/layout";
import NextHead from "next/head";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const [title, setTitle] = useState("Ładowanie...");
  return (
    <SSRProvider>
      <CookiesProvider>
        <Provider store={store}>
          <SessionProvider session={session}>
            <NextHead>
              <title>SKLEP - {title}</title>
            </NextHead>
            <MainNavigation />
            <Layout>
              <AuthProvider>
                <Component {...pageProps} setTitle={setTitle} />
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
        destination: "/",
        permanent: false,
      },
    };
  }
}

export default MyApp;
