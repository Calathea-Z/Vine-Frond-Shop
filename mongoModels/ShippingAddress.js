import mongoose from "mongoose";

delete mongoose.connection.models["ShippingAddress"];

const shippingAddressSchema = new mongoose.Schema({
  shippingAddress: {
    type: "Object",
    name: 'shipping_address',
    properties: {
      "fullName" : {
        type : String,
        name : "full_name",
      },
      "address" : {
        type : String,
        name : "address",
      },
      "city" : {
        type : String,
        name : "city",
      },
      "state" : {
        type : String,
        name : "state",
      },
      "zipCode" : {
        type : Number,
        name : "zip_code",
      },
    }
  },
});

const ShippingAddress = mongoose.model("ShippingAddress", shippingAddressSchema);

export default ShippingAddress;
