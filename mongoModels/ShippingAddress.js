import mongoose from "mongoose";

delete mongoose.connection.models["ShippingAddress"];

const shippingAddressSchema = new mongoose.Schema({
  shippingAddress: {
    type: "Object",
    name: "shipping_address",
    properties: {
      firstNameShipping: {
        type: String,
      },
      lastNameShipping: {
        type: String,
      },
      company: {
        type: String,
      },
      address: {
        type: String,
      },
      city: {
        type: String,
      },
      state: {
        type: String,
      },
      zipCode: {
        type: Number,
      },
    },
  },
});

const ShippingAddress = mongoose.model(
  "ShippingAddress",
  shippingAddressSchema
);

export default ShippingAddress;
