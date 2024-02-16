import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

	// Split bio into paragraphs
	const bioParagraphs = bioData.bio.split("\n").filter(Boolean);

	// Function to split paragraphs into sentences
	const splitIntoSentences = (paragraph) => {
		return paragraph.match(/[^.!?]+[.!?]+/g) || [];
	};

	// Determine bubble width based on sentence length
	const getBubbleWidth = (sentence) => {
		const length = sentence.length;
		if (length < 50) return "w-3/4 md:w-1/2";
		if (length < 100) return "w-4/5 md:w-3/4";
		return "w-full";
	};

	return (
		<div className="flex flex-col justify-between min-h-screen">
			<Header />
			<main className="flex-grow">
				<div className="p-5 md:p-4 flex flex-col items-center justify-center">
					<div
						className="bg-gradient-to-r from-[#E8F0FE] to-[#CFE0FB] shadow-lg rounded-md p-4 flex flex-col md:flex-row items-center justify-between mt-36"
						style={{ maxWidth: "85%", maxHeight: "700px" }}
					>
						<div className="md:w-1/2 w-full">
							<Image
								src={`/assets/sydney.png`}
								alt={bioData.name}
								width={700}
								height={700}
								className="rounded-lg"
							/>
						</div>
						<div className="md:w-1/2 w-full h-full flex flex-col justify-between">
							<div className="flex flex-col md:flex-row md:flex-wrap justify-start items-start gap-2 p-2 h-full">
								<AnimatePresence>
									{bioParagraphs.map((paragraph, pIndex) => {
										const sentences = splitIntoSentences(paragraph);
										return sentences.map((sentence, sIndex) => (
											<motion.div
												key={`${pIndex}-${sIndex}`}
												custom={sIndex}
												variants={{
													hidden: {
														y: 300,
														opacity: 0,
														backgroundColor: "#AED6F1", // Changed from #FF6347 to a lighter blue
													},
													visible: (custom) => ({
														y: 0,
														opacity: 1,
														backgroundColor: "#f0f0f0",
														transition: {
															delay: custom * 1,
															duration: 7,
															type: "spring",
															stiffness: 20,
														},
													}),
												}}
												initial="hidden"
												animate="visible"
												whileHover={{
													scale: 1.1,
													boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.6)",
												}}
												className={`my-1 mx-1 p-3 rounded-lg shadow-md text-black ${getBubbleWidth(
													sentence
												)}`}
												style={{
													display: "inline-flex",
													flex: "1 0 45%",
													backgroundImage:
														"linear-gradient(135deg, #E2EFF1 25%, transparent 25%, transparent 50%, #E2EFF1 50%, #E2EFF1 75%, transparent 75%, transparent)",
													backgroundSize: "20px 20px",
												}}
											>
												{sentence}
											</motion.div>
										));
									})}
								</AnimatePresence>
							</div>
						</div>
					</div>
				</div>
			</main>
			<Footer />
		</div>
	);
};
export default About;
