import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import FeaturedProducts from "@/components/FeaturedProducts";
import Head from "next/head";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function Home() {
	const { ref, inView } = useInView({
		triggerOnce: true,
	});

	return (
		<div className="z-0 relative min-h-screen snap-y snap-mandatory overflow-y-scroll bg-primary">
			<Head>
				<title>Vine & Frond</title>
			</Head>
			<Header className="sticky top-0 left-0 w-full z-50" />
			<main className="snap-y snap-mandatory">
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
		</div>
	);
}
