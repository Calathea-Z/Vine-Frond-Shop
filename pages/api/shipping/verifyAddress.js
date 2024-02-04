import axios from "axios";
import qs from "qs";
import { xml2js } from "xml-js";

export default async function handler(req, res) {
	if (req.method === "POST") {
		const { street, city, state, zipCode } = req.body;
		const params = {
			API: "Verify",
			XML: `<AddressValidateRequest USERID="${process.env.USPS_USERNAME}">
      <Revision>1</Revision>
      <Address ID="0">
        <Address1/>
        <Address2>${street}</Address2>
        <City>${city}</City>
        <State>${state}</State>
        <Zip5>${zipCode}</Zip5>
        <Zip4/>
      </Address>
    </AddressValidateRequest>`,
		};
		const paramString = qs.stringify(params);
		try {
			const response = await axios.post(
				`https://secure.shippingapis.com/ShippingAPI.dll?API=Verify&${paramString}`
			);
			const xmlString = response.data;
			const result = xml2js(xmlString, {
				compact: true,
				ignoreDeclaration: true,
			});
			const address = result.AddressValidateResponse.Address;

			// check if address is undefined before accessing its properties
			const valid = address && address.Error ? false : true;
			const suggestedAddress = valid
				? null
				: {
						street: address.Address2?._text.trim(),
						city: address.City?._text.trim(),
						state: address.State?._text.trim(),
						zipCode: address.Zip5?._text.trim(),
				  };
			res.status(200).json({ valid, suggestedAddress });
		} catch (error) {
			console.error(error);
			res
				.status(500)
				.json({ error: "An error occurred while verifying the address." });
		}
	} else {
		res.status(404).json({ error: "Invalid request method." });
	}
}
