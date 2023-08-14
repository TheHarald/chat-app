import { store } from "@/redux";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { createGlobalStyle } from "styled-components";
import "typeface-inter";

const GlobalStyle = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    font-family: 'Inter', sans-serif;
    box-sizing: border-box;
    transition: 0.3s;
  }
`;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider store={store}>
        <GlobalStyle />
        <Component {...pageProps} />
      </Provider>
    </>
  );
}
