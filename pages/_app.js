import "@/styles/globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import nookies from "nookies";
import App from "next/app";
import { StoreProvider } from "@/utils/Store";
import { SnackbarProvider } from "notistack";

export default class MyApp extends App {
	static async getInitialProps(appContext) {
		const appProps = await App.getInitialProps(appContext);
		const initialCookies = nookies.get(appContext.ctx);
		return { ...appProps, initialCookies };
	}

	render() {
		const { Component, pageProps, initialCookies } = this.props;
		return (
			<SnackbarProvider
				anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
				autoHideDuration={3000}
			>
				<StoreProvider initialCookies={initialCookies}>
					<Component {...pageProps} />
				</StoreProvider>
			</SnackbarProvider>
		);
	}
}
