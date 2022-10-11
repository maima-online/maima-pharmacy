import "../styles/globals.css";
import { Provider } from "react-redux";
import Head from "next/head";
import type { AppProps } from "next/app";
import PropTypes from "prop-types";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import muiTheme from "../styles/muitheme";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { SessionProvider } from "next-auth/react";
import createEmotionCache from "../src/lib/createEmotioCache";
import { wrapper } from "../redux/store"; // Importing redux store
import { useStore } from "react-redux";

import { PersistGate } from "redux-persist/integration/react";
import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  emotionCache?: EmotionCache;
};

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

function MyApp(props: AppPropsWithLayout) {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps: { session, ...pageProps },
  } = props;
  const store: any = useStore();
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <link rel="icon" href="/favicon.ico" />
      <Provider store={store}>
        <SessionProvider session={session}>
          <ThemeProvider theme={muiTheme}>
            <PersistGate persistor={store.__persistor} loading={null}>
              <CssBaseline />
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
              {getLayout(<Component {...pageProps} />)}
            </PersistGate>
          </ThemeProvider>
        </SessionProvider>
      </Provider>
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
export default wrapper.withRedux(MyApp);
