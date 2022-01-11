import { SSRProvider } from "@react-aria/ssr";
import { useSession, SessionProvider, getSession } from "next-auth/react";
import { CookiesProvider } from "react-cookie";
import { Provider } from "react-redux";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import NextHead from "next/head";
import TawkTo from "tawkto-react";
import store from "../app/lib/reduxStore";
import "../app/styles/index.scss";
import "../public/css/bootstrap.min.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import MainNavigation from "../app/components/layout/mainNavigation";
import AuthProvider from "../app/lib/AuthProvider";
import Layout from "../app/components/layout/layout";
import Loading from "../app/components/layout/loading";
import Footer from "../app/components/layout/footer";
import favicon from "../app/components/images/favicon.ico";
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const [title, setTitle] = useState("Ładowanie...");
  const [loading, setLoading] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState(false);
  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setLoading(true);
      setTitle("Ładowanie...");
    });
    router.events.on("routeChangeComplete", () => {
      setLoading(false);
    });
    var tawk = new TawkTo("61d74e90b84f7301d329babe", "1fooglpce");

    tawk.onStatusChange((status) => {
      tawk.setAttributes(
        {
          name: session.user ? session.user.name : "none",
          email: session.user.email ? session.user.email : "none",
        },
        function (error) {}
      );
    });
  }, []);

  return (
    <SSRProvider>
      <CookiesProvider>
        <Provider store={store}>
          <SessionProvider session={session}>
            <NextHead>
              <title>Plejerek - {title}</title>
              <link rel="shortcut icon" href={favicon.src} />
            </NextHead>
            <MainNavigation
              expanded={expandedMenu}
              setExpanded={setExpandedMenu}
            />
            <div
              onClick={() => {
                expandedMenu && setExpandedMenu(false);
              }}
              className="min-vh-100"
            >
              <Layout onClick={() => {}}>
                <AuthProvider>
                  {loading ? (
                    <Loading />
                  ) : (
                    <Component {...pageProps} setTitle={setTitle} />
                  )}
                </AuthProvider>
              </Layout>
            </div>
            <Footer />
          </SessionProvider>
        </Provider>
      </CookiesProvider>
    </SSRProvider>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req });
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
