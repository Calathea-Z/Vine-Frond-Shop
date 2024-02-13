import { useEffect, useState, useCallback } from "react";
import client from "@/utils/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { motion } from "framer-motion";
import {
	GoogleMap,
	LoadScript,
	Marker,
	InfoWindow,
} from "@react-google-maps/api";

const Stockists = () => {
	const svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4">
  <path d="M4.5 7c.681 0 1.3-.273 1.75-.715C6.7 6.727 7.319 7 8 7s1.3-.273 1.75-.715A2.5 2.5 0 1 0 11.5 2h-7a2.5 2.5 0 0 0 0 5ZM6.25 8.097A3.986 3.986 0 0 1 4.5 8.5c-.53 0-1.037-.103-1.5-.29v4.29h-.25a.75.75 0 0 0 0 1.5h.5a.754.754 0 0 0 .138-.013A.5.5 0 0 0 3.5 14H6a.5.5 0 0 0 .5-.5v-3A.5.5 0 0 1 7 10h2a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h2.5a.5.5 0 0 0 .112-.013c.045.009.09.013.138.013h.5a.75.75 0 1 0 0-1.5H13V8.21c-.463.187-.97.29-1.5.29a3.986 3.986 0 0 1-1.75-.403A3.986 3.986 0 0 1 8 8.5a3.986 3.986 0 0 1-1.75-.403Z" />
</svg>
`;

	const svgIconUrlEncoded = encodeURIComponent(svgIcon);
	const dataUrl = `data:image/svg+xml;charset=UTF-8,${svgIconUrlEncoded}`;

	const [stockists, setStockists] = useState([]);
	const [mapCenter, setMapCenter] = useState({
		lat: 35.595088490906676, // Default center of the map (Asheville, NC)
		lng: -82.55361660009542,
	});
	const [zoomLevel, setZoomLevel] = useState(8);
	const [selectedStockist, setSelectedStockist] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await client.fetch(
					`*[_type == "stockist"]{
				name,
				description,
				"address": address.city + ", " + address.state + " " + address.zipCode,
				keywords,
                latitude,
                longitude,
				url
			}`
				);
				const sortedData = data.sort((a, b) => a.name.localeCompare(b.name));
				setStockists(sortedData);
			} catch (error) {
				console.error(error);
				setError("Failed to fetch stockists. Please try again later.");
			}
		};

		fetchData();
	}, []);

	if (error) {
		return (
			<div className="bg-primary flex flex-col min-h-screen">
				<Header />
				<main className="flex-grow p-8 mt-32 flex justify-center items-center">
					<h1 className="text-4xl font-bold mb-8 text-red-500">{error}</h1>
				</main>
				<Footer className="mt-auto" />
			</div>
		);
	}

	const mapContainerStyle = {
		width: "31.25rem",
		height: "30rem",
		borderRadius: "8px",
	};

	const handleCardClick = (latitude, longitude, stockist) => {
		setMapCenter({ lat: latitude, lng: longitude });
		setZoomLevel(16); // Zoom in closer when a card is clicked
		setSelectedStockist(stockist); // Automatically select the stockist to show its info window
	};

	// Using useCallback to ensure function stability and prevent unnecessary re-renders
	const renderMap = useCallback(
		() => (
			<LoadScript
				googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
			>
				<GoogleMap
					mapContainerStyle={mapContainerStyle}
					center={mapCenter}
					zoom={zoomLevel}
					options={{
						fullscreenControl: true,
						disableDefaultUI: true,
						gestureHandling: "cooperative",
						styles: [
							{
								featureType: "poi.business",
								elementType: "labels",
								stylers: [{ visibility: "off" }],
							},
						],
					}}
				>
					{stockists.map((stockist) => (
						<Marker
							key={stockist.name}
							position={{
								lat: parseFloat(stockist.latitude),
								lng: parseFloat(stockist.longitude),
							}}
							icon={{
								url: dataUrl, // Use the Data URL here for the custom icon
								scaledSize: new window.google.maps.Size(35, 35), // Adjust the size of the icon
							}}
							onClick={() =>
								handleCardClick(
									parseFloat(stockist.latitude),
									parseFloat(stockist.longitude),
									stockist
								)
							} // Updated to use handleCardClick to set selectedStockist
						/>
					))}
					{selectedStockist && (
						<InfoWindow
							position={{
								lat: parseFloat(selectedStockist.latitude) + 0.00001, // Adjust latitude to prevent icon from being hidden
								lng: parseFloat(selectedStockist.longitude),
							}}
							options={{ pixelOffset: new window.google.maps.Size(0, -40) }} // Adjust the InfoWindow position to make it pop
						>
							<div className="bg-[#f9f9f9] p-4 rounded-lg shadow-md text-center">
								<h2 className="text-[#1976D2] font-bold">
									{selectedStockist.name}
								</h2>
								<p className="mb-1">{selectedStockist.description}</p>
								<p className="italic">{selectedStockist.address}</p>
								{selectedStockist.url && (
									<a
										href={selectedStockist.url}
										target="_blank"
										rel="noopener noreferrer"
										className="inline-block text-white bg-[#1976D2] p-[.1rem] px-[.3rem] mt-2 rounded-md no-underline"
									>
										Visit Website
									</a>
								)}
							</div>
						</InfoWindow>
					)}
				</GoogleMap>
			</LoadScript>
		),
		[stockists, mapCenter, zoomLevel, selectedStockist]
	);

	return (
		<div className="bg-primary flex flex-col min-h-screen">
			<Header />
			<main className="flex-grow p-8 mt-32">
				<div className="flex justify-center items-center flex-col my-8">
					<h1 className="text-4xl font-bold mb-8">Stockists</h1>
					<div className="grid grid-cols-3 gap-8">
						<div className="col-span-2 grid grid-cols-2 gap-4">
							{stockists.map((stockist) => (
								<motion.div
									key={stockist.name}
									className="bg-white shadow-lg rounded-lg p-6 mb-8"
									whileHover={{ scale: 1.02, rotate: 1 }}
									transition={{ type: "spring", stiffness: 400 }}
									onClick={() =>
										handleCardClick(
											parseFloat(stockist.latitude),
											parseFloat(stockist.longitude),
											stockist // Pass the stockist object to handleCardClick
										)
									}
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
											<span className="hover:text-gray-800">
												{stockist.name}
											</span>
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
						<div className="col-span-1">
							<div className="sticky top-40 bg-white rounded-md shadow-lg flex justify-center p-3">
								{renderMap()}
							</div>
						</div>
					</div>
				</div>
			</main>
			<Footer className="mt-auto" />
		</div>
	);
};

export default Stockists;
