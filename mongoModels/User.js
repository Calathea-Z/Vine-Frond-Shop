import mongoose from "mongoose";

delete mongoose.connection.models["User"];

const userSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: [true, "Please provide a first name."],
		},
		lastName: {
			type: String,
			required: [true, "Please provide a last name"],
		},
		email: {
			type: String,
			required: [true, "Please provide an email"],
		},
		password: {
			type: String,
			required: [true, "Please provide a password"],
		},
		salt: {
			type: String,
			required: true,
		},
		isAdmin: {
			type: Boolean,
			required: true,
			default: false,
		},
		isWholesale: {
			type: Boolean,
			required: true,
			default: false,
		},
		shippingContactEmail: {
			type: String,
		},
		firstNameShipping: {
			type: String,
		},
		lastNameShipping: {
			type: String,
		},
		address: {
			type: String,
		},
		city: {
			type: String,
		},
		zipCode: {
			type: Number,
		},
		usState: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

const User = mongoose.model("User", userSchema) || mongoose.models.User;

export default User;
