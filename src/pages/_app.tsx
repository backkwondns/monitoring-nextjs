import type { AppProps } from 'next/app';
import Head from 'next/head';
import styled, { createGlobalStyle } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Fetch, Storage } from 'libs';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { GlobalContext } from 'hooks';
import { ApiTypes } from 'types';

const GlobalStyle = createGlobalStyle`
  body{margin:0;}
  *{
    box-sizing:border-box;
  }
  * {
    font-family: -apple-system, Arial, sans-serif;
  }
`;
const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    if (router.pathname !== '/auth' && router.pathname !== '/signup') {
      if (Storage.getItem('accessToken') === '') {
        Fetch.fetchPost<object, ApiTypes.RefreshTokenType>('/refresh_token', {}).then(async (res) => {
          if (res.statusCode === 200) {
            if (res.data) {
              Storage.setItem('accessToken',res.data.accessToken);
              Storage.setItem('userName',res.data.userName);
            }
          } else {
            router.push('/auth');
          }
        });
      }
    } else if (!Storage.validItem('accessToken')) {
      Fetch.fetchPost<object, ApiTypes.RefreshTokenType>('/refresh_token', {}).then((res) => {
        if (res.statusCode === 200) {
          if (res.data) Storage.setItem('accessToken',res.data.accessToken);
        }
      });
    }
  }, []);
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
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