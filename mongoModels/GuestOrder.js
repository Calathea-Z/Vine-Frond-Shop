import mongoose from "mongoose";


delete mongoose.connection.models["GuestOrder"];

const GuestOrderSchema = new mongoose.Schema({
  orderItems: [
    {
      name: { type: String, required: true },
      quantity: {type: Number, required: true},
      image: {type: String},
      price: { type: Number, required: true},
    },
  ],
  shippingInformation: {
    firstNameShipping: { type: String, required: true},
    lastNameShipping: { type: String, required: true},
    company: {type: String},
    address: { type: String, required: true},
    city: { type: String, required: true},
    zipCode: { type: String, required: true},
    usState: {type: String, required: true},
    shippingContactEmail: { type: String, required: true},
  },
  itemsPrice: { type: Number, default: 0},
  parsedShippingCost: { type: Number, default: 0},
  taxPrice: { type: Number, default: 0},
  totalPrice: { type: Number, default: 0},
},
{
  timestamps: true,
});

const GuestOrder = mongoose.model("GuestOrder", GuestOrderSchema);

export default GuestOrder;
