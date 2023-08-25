import { NotificationModule } from "@/modules/notifications/notification-module";
import { store } from "@/redux";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import "../styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextUIProvider>
        <Provider store={store}>
          <Component {...pageProps} />
          <NotificationModule />
        </Provider>
      </NextUIProvider>
    </>
  );
}
