import { LayoutContextProvider } from "@/contexts/LayoutContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LayoutContextProvider>
      <Component {...pageProps} />
    </LayoutContextProvider>
  );
}
