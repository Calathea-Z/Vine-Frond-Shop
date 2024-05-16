import "@/styles/globals.css";
import "slick-carousel/slick/slick.css"; // Default styling
import "slick-carousel/slick/slick-theme.css"; // Theme styling (includes arrows)
import { StoreProvider } from "@/utils/Store";
import { SnackbarProvider } from "notistack";

export default function App({ Component, pageProps }) {
	return (
		<SnackbarProvider
			anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
			autoHideDuration={3000}
		>
			<StoreProvider>
				<Component {...pageProps} />
			</StoreProvider>
		</SnackbarProvider>
	);
}
