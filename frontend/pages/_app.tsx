import "../styles/globals.css";
import type { AppProps } from "next/app";
import { createContext } from "react";

export const MarkContext = createContext(null);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MarkContext.Provider value="">
      <Component {...pageProps} />
    </MarkContext.Provider>
  );
}

export default MyApp;
