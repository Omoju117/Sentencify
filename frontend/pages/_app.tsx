import "../styles/globals.css";
import type { AppProps } from "next/app";
import { createContext } from "react";
import axios from "axios";

export const MarkContext = createContext(null);

function MyApp({ Component, pageProps }: AppProps) {
  axios.defaults.withCredentials = true;
  return (
    <MarkContext.Provider value="">
      <Component {...pageProps} />
    </MarkContext.Provider>
  );
}

export default MyApp;
