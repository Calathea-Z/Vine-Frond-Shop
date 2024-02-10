import { useEffect, useState } from "react";
import { urlFor } from "@/utils/image.js";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Image from "next/image";
import client from "../utils/client"; // Assuming the path to the client is correct

const About = () => {
	const [bioData, setBioData] = useState({
		name: "",
		image: "",
		bio: "",
	});

	useEffect(() => {
		const fetchBioData = async () => {
			const data = await client.fetch(`*[_type == "bio"]`);
			if (data.length > 0) {
				const { name, image, bio } = data[0];
				setBioData({ name, image, bio });
			}
		};
		fetchBioData();
	}, []);

	return (
		<div className="flex flex-col justify-between min-h-screen">
			<Header />
			<main className="flex-grow">
				<div className="p-5 md:p-4 flex flex-col items-center justify-center">
					<div
						className="bg-[#f2c88c] shadow-lg rounded-md p-4 flex flex-col md:flex-row items-center justify-between mt-36"
						style={{ maxWidth: "85%" }}
					>
						<div className="md:w-1/2 w-full">
							<img
								src={`/assets/sydney.png`}
								alt={bioData.name}
								width={700} // Adjusted to make the photo slightly smaller
								height={700} // Adjusted to make the photo slightly smaller
								className="rounded-lg"
							/>
						</div>
						<div className="md:w-1/2 w-full text-sm md:text-lg leading-relaxed md:pl-4">
							<p>{bioData.bio}</p>
						</div>
					</div>
				</div>
			</main>
			<Footer />
		</div>
	);
};
export default About;
