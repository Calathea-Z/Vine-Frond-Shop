import nc from "next-connect";
import client from "../../../utils/client";

const handler = nc();

handler.get(async (req, res) => {
	const stockists = await client.fetch(`*[_type == "stockist"]`);
	res.status(200).json(stockists);
});

export default handler;
