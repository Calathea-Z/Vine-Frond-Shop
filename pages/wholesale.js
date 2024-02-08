import { useEffect, useState } from "react";
import client from "@/utils/client";

const Wholesale = () => {
	// const [stockists, setStockists] = useState([]);

	// useEffect(() => {
	// 	client
	// 		.fetch(
	// 			`*[_type == "stockist"]{
	// 			name,
	// 			description,
	// 			"address": address.city + ", " + address.state + " " + address.zipCode
	// 		}`
	// 		)
	// 		.then((data) => setStockists(data))
	// 		.catch(console.error);
	// }, []);

	return (
		<div className="flex justify-center items-center flex-col">
			<p>hi</p>
		</div>
	);
};
export default Wholesale;
