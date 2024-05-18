import Header from "@/components/mainPage/header/Header";
import SmallHeader from "@/components/mainPage/header/SmallHeader";
import Hero from "@/components/mainPage/Hero";
import Footer from "@/components/mainPage/Footer";
import FeaturedProducts from "@/components/mainPage/FeaturedProducts";
import TagLines from "@/components/mainPage/TagLines";
import TopBanner from "@/components/mainPage/TopBanner";
import SideScrollButton from "@/components/mainPage/SideScrollButton";
import client from "@/utils/client";
//Packages
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import Head from "next/head";

export default function Home() {
	const [topBannerData, setTopBannerData] = useState({});
	const [sideButtonData, setSideButtonData] = useState({});
	const [isCartVisible, setIsCartVisible] = useState(false);

	const toggleCart = () => {
		setIsCartVisible(!isCartVisible);
	};

	useEffect(() => {
		const fetchData = async () => {
			const queries = {
				topBanner: `*[_type == "topBanner" && enabled == true][0]`,
				sideButton: `*[_type == "sideButton" && enabled == true][0]`,
			};

			const topBannerData = await client.fetch(queries.topBanner);
			if (topBannerData) {
				setTopBannerData(topBannerData);
			}

			const sideButtonData = await client.fetch(queries.sideButton);
			if (sideButtonData) {
				setSideButtonData(sideButtonData);
			}
		};

		fetchData();
	}, []);

	const isTopBannerVisible = !!topBannerData?.enabled;
	const mainStyle = {
		paddingTop: isTopBannerVisible ? "150px" : "100px",
	};

	const isSideButtonEnabled = !!sideButtonData?.enabled;

	const { ref, inView } = useInView({
		threshold: 0.1, // Adjusted threshold for better inView detection
	});

	return (
		<>
			<Head>
				<title>Vine & Frond</title>
				<meta
					name="description"
					content="Explore our collection of handmade pottery and houseplants."
				/>
			</Head>

			{isTopBannerVisible && <TopBanner data={topBannerData} />}

			{isSideButtonEnabled && <SideScrollButton data={sideButtonData} />}

			<div className="lg:hidden">
				<SmallHeader />
			</div>
			<div className="hidden lg:block">
				<Header isTopBannerVisible={isTopBannerVisible} />
			</div>

			<main
				className="z-0 relative min-h-screen snap-y snap-mandatory bg-primary"
				style={mainStyle}
			>
				<section className="snap-start">
					<Hero />
				</section>

				<section className="snap-start">
					<FeaturedProducts />
				</section>

				<section
					ref={ref} //The ref is used to monitor when this section comes into the viewport.
					className="snap-start bg-primary w-full flex justify-center items-center gap-1 font-thin italic text-xl p-3"
				>
					<TagLines inView={inView} />
				</section>
				<section className="snap-end">
					<Footer />
				</section>
			</main>
		</>
	);
}
