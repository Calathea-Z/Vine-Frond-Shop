import { useEffect, useState } from "react";
import Footer from "@/components/mainPage/Footer";
import Header from "@/components/mainPage/header/Header";
import Image from "next/image";
import client from "../utils/client";
import { bioPic } from "@/public/assets/index";
import { urlFor } from "@/utils/image";

const About = () => {
	const [bioData, setBioData] = useState({
		name: "",
		header: "",
		image: null,
		bio: "",
	});

	useEffect(() => {
		const fetchBioData = async () => {
			const data = await client.fetch(`*[_type == "bio"]`);
			if (data.length > 0) {
				const { header, image, bio } = data[0];
				setBioData({ header, image: image, bio });
			}
		};
		fetchBioData();
	}, []);

	return (
		<div className="flex flex-col justify-between min-h-screen">
			<Header />
			<main className="flex-grow mt-36 p-2 bg-primary">
				<div className="container mx-auto px-4 py-8">
					<div className="flex flex-col md:flex-row items-center justify-between gap-8">
						<div className="md:w-1/2">
							{bioData.image ? (
								<Image
									src={urlFor(bioData.image.asset._ref).url()}
									alt="Photo of Sydney with pottery and plants."
									width={630}
									height={630}
									priority={true}
									className="rounded-3xl translate-y-4"
									onError={(e) => {
										e.target.onerror = null;
										e.target.src = bioPic;
									}} // Fallback to bioPic if error occurs
								/>
							) : (
								<Image
									src={bioPic} // Fallback image if bioData.image is not available
									alt="Photo of Sydney with pottery and plants."
									width={630}
									height={630}
									priority={true}
									className="rounded-3xl translate-y-4"
								/>
							)}
						</div>
						<div className="md:w-1/2 space-y-7">
							<h1 className="text-3xl font-bold">{bioData.header}</h1>
							<p className=" text-lg leading-[1.85rem]">{bioData.bio}</p>
						</div>
					</div>
				</div>
			</main>
			<Footer />
		</div>
	);
};

export default About;
