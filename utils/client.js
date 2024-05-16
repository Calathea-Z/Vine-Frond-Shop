import { createClient } from "next-sanity";

const client = createClient({
	projectId: "7dyckwr8",
	dataset: "production",
	token: process.env.SANITY_AUTH_TOKEN,
	apiVersion: "2023-04-06",
	useCdn: true,
});

export default client;
