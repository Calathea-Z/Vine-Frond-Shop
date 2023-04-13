import "@/styles/globals.css";
import { StoreProvider } from "@/utils/Store";
import { SnackbarProvider } from "notistack";

export default function App({ Component, pageProps }) {
  return (
    <SnackbarProvider anchorOrigin={{ vertical: "top", horizontal: "center" }} autoHideDuration={3000}>
      <StoreProvider>
        <Component {...pageProps} />
      </StoreProvider>
    </SnackbarProvider>
  );
}
