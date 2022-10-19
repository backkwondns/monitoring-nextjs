import type { AppProps } from 'next/app';
import Head from 'next/head';
import styled, { createGlobalStyle } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { AccessToken } from 'libs';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { GlobalContext } from 'hooks';

const GlobalStyle = createGlobalStyle`
  body{margin:0px;}
  *{
    box-sizing:border-box;
  }
  * {
    font-family: -apple-system;
  }
`;
const Container = styled.div`
  width: 100vw;
  heigh: 100vh;
`;

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    if (AccessToken.getAccessToken() === '') {
      fetch('/api/refresh_token', {
        method: 'POST',
        credentials: 'include',
      }).then(async (response) => {
        if (response.status === 200) {
          const { data } = await response.json();
          AccessToken.setAccessToken(data.accessToken);
        } else {
          router.push('/auth');
        }
      });
    }
  }, []);
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
        <title>Monitoring</title>
      </Head>
      <ToastContainer autoClose={2000} />
      <GlobalStyle />
      <Container>
        <GlobalContext.Context>
          <Component {...pageProps} />
        </GlobalContext.Context>
      </Container>
    </>
  );
}
