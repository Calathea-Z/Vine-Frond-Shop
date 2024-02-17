import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import FeaturedProducts from "@/components/FeaturedProducts";
import Head from "next/head";
import TopBanner from "@/components/TopBanner";
import client from "@/utils/client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

export default function Home() {
	const [topBannerData, setTopBannerData] = useState({});

	useEffect(() => {
		const fetchTopBannerData = async () => {
			const query = `*[_type == "topBanner" && enabled == true][0]`;
			const data = await client.fetch(query);
			if (data) {
				setTopBannerData(data);
			}
			console.log(`top banner data`, data);
		};

		fetchTopBannerData();
	}, []);

	const { ref, inView } = useInView({
		triggerOnce: true,
	});

	const isTopBannerVisible = !!topBannerData?.enabled;
	console.log(isTopBannerVisible);
	const mainStyle = {
		paddingTop: isTopBannerVisible ? "150px" : "100px",
	};

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
			<Header isTopBannerVisible={isTopBannerVisible} />
			<main
				className="z-0 relative min-h-screen snap-y snap-mandatory overflow-y-scroll bg-primary"
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
