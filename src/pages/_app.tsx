import * as React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import createEmotionCache from 'theme/createEmotionCache';
import { THEME } from 'theme';
import 'theme/global.css';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider as ReduxProvider } from 'react-redux';
import store, { persistor } from 'store';
import PageContainer from 'components/layout/container/PageContainer';
import LayoutSnackbar from 'components/layout/snackbar/LayoutSnackbar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'utils/dayjsUtil';

const queryClient = new QueryClient();

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const MyApp = (props: MyAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <QueryClientProvider client={queryClient}>
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <CacheProvider value={emotionCache}>
            <Head>
              <link rel="icon" href="/logo/icon.png" />
              <title>1st Army Area</title>
              <meta
                name="viewport"
                content="initial-scale=1, width=device-width"
              />
              <meta name="description" content="1st Army Are" />
              <meta property="og:description" content="1st Army Are" />
              <meta property="og:image" content="../../public/logo/icon.png" />
              <link rel="shortcut icon" href="/images/favicon.ico" />
              <link
                rel="apple-touch-icon"
                sizes="180x180"
                href="/images/favicon_io/apple-touch-icon.png"
              />
              <link
                rel="icon"
                type="image/png"
                sizes="32x32"
                href="/images/favicon_io/favicon-32x32.png"
              />
              <link
                rel="icon"
                type="image/png"
                sizes="16x16"
                href="/images/favicon_io/favicon-16x16.png"
              />
            </Head>
            <ThemeProvider theme={THEME}>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              <PageContainer>
                <Component {...pageProps} />
              </PageContainer>
              <LayoutSnackbar />
            </ThemeProvider>
          </CacheProvider>
        </PersistGate>
      </ReduxProvider>
    </QueryClientProvider>
  );
};

export default MyApp;
