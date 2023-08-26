import { NotificationModule } from "@/modules/notifications/notification-module";
import { store } from "@/redux";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import "../styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { useRouter } from "next/router";
import Layout from "@/layout/layout";

const excludedPathes = ["/login"];

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isLayout = !excludedPathes.includes(router.pathname);
  console.log(excludedPathes.includes(router.pathname));

  return (
    <>
      <NextUIProvider>
        <Provider store={store}>
          {isLayout ? (
            <Layout>
              <Component {...pageProps} />
            </Layout>
          ) : (
            <Component {...pageProps} />
          )}

          <NotificationModule />
        </Provider>
      </NextUIProvider>
    </>
  );
}
