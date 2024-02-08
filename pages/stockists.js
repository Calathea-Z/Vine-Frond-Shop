import { useEffect, useState } from "react";
import client from "@/utils/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { motion } from "framer-motion";

const Stockists = () => {
	const [stockists, setStockists] = useState([]);

	useEffect(() => {
		client
			.fetch(
				`*[_type == "stockist"]{
				name,
				description,
				"address": address.city + ", " + address.state + " " + address.zipCode,
				keywords,
				url
			}`
			)
			.then((data) => {
				const sortedData = data.sort((a, b) => a.name.localeCompare(b.name));
				setStockists(sortedData);
			})
			.catch(console.error);
	}, []);

	return (
		<div className="bg-primary flex flex-col min-h-screen">
			<Header />
			<main className="flex-grow p-8 mt-28">
				<div className="flex justify-center items-center flex-col my-8">
					<h1 className="text-4xl font-bold mb-8">Stockists</h1>
					<div className="grid grid-cols-3 gap-8">
						{stockists.map((stockist, index) => (
							<motion.div
								key={index}
								className="bg-white shadow-lg rounded-lg p-6"
								whileHover={{ scale: 1.02, rotate: 1 }}
								transition={{ type: "spring", stiffness: 400 }}
							>
								<h2 className="text-2xl font-bold mb-4 hover:text-gray-800">
									{stockist.url ? (
										<Link
											href={stockist.url}
											target="_blank"
											rel="noopener noreferrer"
											className="hover:text-gray-800"
										>
											{stockist.name}
										</Link>
									) : (
										<span className="hover:text-gray-800">{stockist.name}</span>
									)}
								</h2>
								<p className="text-sm italic mb-4 text-purple-700">
									{stockist.keywords ? stockist.keywords.join(", ") : "N/A"}
								</p>
								<p className="mb-4 text-base">{stockist.description}</p>
								<p className="text-base">{stockist.address}</p>
							</motion.div>
						))}
					</div>
				</div>
			</main>
			<Footer className="mt-auto" />
		</div>
	);
};
export default Stockists;
