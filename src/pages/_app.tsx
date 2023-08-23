import { NotificationModule } from "@/modules/notifications/notification-module";
import { store } from "@/redux";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { createGlobalStyle } from "styled-components";
// import "typeface-inter";
import "../styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";

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
      <NextUIProvider>
        <Provider store={store}>
          {/* <GlobalStyle /> */}
          <Component {...pageProps} />
          <NotificationModule />
        </Provider>
      </NextUIProvider>
    </>
  );
}
