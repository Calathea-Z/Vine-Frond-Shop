import "@/styles/globals.css";
import { StoreProvider } from "@/utils/Store";
import { SnackbarProvider } from "notistack";
import { SessionProvider } from 'next-auth/react'

export default function App({ Component, pageProps, session }) {
  return (
    <SessionProvider session={session}>
      <SnackbarProvider
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={3000}
      >
        <StoreProvider>
          <Component {...pageProps} />
        </StoreProvider>
      </SnackbarProvider>
    </SessionProvider>
  );
}
