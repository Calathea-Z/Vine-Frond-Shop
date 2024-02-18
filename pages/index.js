import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import FeaturedProducts from "@/components/FeaturedProducts";
import Head from "next/head";
import TopBanner from "@/components/TopBanner";
import SideScrollButton from "@/components/SideScrollButton";
import client from "@/utils/client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

export default function Home() {
	const [topBannerData, setTopBannerData] = useState({});
	const [sideButtonData, setSideButtonData] = useState({});

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
			<Header isTopBannerVisible={isTopBannerVisible} />
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
					ref={ref}
					className="snap-start bg-primary w-full flex justify-center items-center gap-1 font-thin italic text-xl p-3"
				>
					<motion.h1
						whileHover={{
							scale: 1.1,
							textShadow: "0px 0px 8px rgba(255, 255, 255, 0.8)",
						}}
						className="p-2 text-sm sm:text-2xl cursor-pointer"
						initial={{ x: -1000 }}
						animate={{ x: inView ? 0 : -1000 }}
						transition={{ type: "spring", stiffness: 30 }}
					>
						@vineandfrond
					</motion.h1>
					<motion.h1
						whileHover={{
							scale: 1.1,
							textShadow: "0px 0px 8px rgba(255, 255, 255, 0.8)",
						}}
						className="p-2 text-sm sm:text-2xl cursor-pointer"
						initial={{ x: 1000 }}
						animate={{ x: inView ? 0 : 1000 }}
						transition={{ type: "spring", stiffness: 30 }}
					>
						#vineandfrond
					</motion.h1>
				</section>
				{/* <InstagramFeed /> */}
				<section className="snap-end">
					<Footer />
				</section>
			</main>
		</>
	);
}
