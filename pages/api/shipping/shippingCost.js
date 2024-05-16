import axios from "axios";
import qs from "qs";

export default async function handler(req, res) {
	if (req.method === "POST") {
		const { boxLength, boxWidth, boxHeight, shippingWeight, zipCode } =
			req.body;
		const params = {
			API: "RateV4",
			XML: `<RateV4Request USERID="${process.env.USPS_USERNAME}" PASSWORD="${process.env.USPS_PASSWORD}">
    <Package ID="0">
      <Service>PRIORITY</Service>
      <ZipOrigination>28791</ZipOrigination>
      <ZipDestination>${zipCode}</ZipDestination>
      <Pounds>0</Pounds>
      <Ounces>${shippingWeight}</Ounces>
      <Container/>
      <Width>${boxWidth}</Width>
      <Length>${boxLength}</Length>
      <Height>${boxHeight}</Height>    
      <Machinable>true</Machinable>
    </Package>
  </RateV4Request>`,
		};

		const paramString = qs.stringify(params);

		try {
			const response = await axios.post(
				`https://secure.shippingapis.com/ShippingAPI.dll?API=RateV4&${paramString}`
			);
			res.status(200).json(response.data);
		} catch (error) {
			console.error(error);
			res
				.status(500)
				.json({ error: "An error occurred while fetching shipping rates." });
		}
	} else {
		res.status(404).json({ error: "Invalid request method." });
	}
}
