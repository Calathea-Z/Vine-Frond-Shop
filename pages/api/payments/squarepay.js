import { Client } from "square";

const crypto = require("crypto");
const bigInt = (BigInt.prototype.toJSON = function () {
	return this.toString();
}); // eslint-disable-line no-unused-vars

const randomString = (size = 21) => {
	return crypto.randomBytes(size).toString("base64").slice(0, size);
};

const { paymentsApi } = new Client({
	accessToken: process.env.SQUARE_TOKEN,
	environment: "sandbox",
});

export default async function handler(req, res) {
	try {
		const amount = Math.round(parseFloat(req.body.amount) * 100);

		const { result } = await paymentsApi.createPayment({
			idempotencyKey: randomString(),
			sourceId: req.body.sourceId,
			amountMoney: {
				currency: "USD",
				amount: amount,
			},
		});
		res.status(200).json(result);
	} catch (error) {
		res.status(500).send();
	}
}
