import mongoose from "mongoose";
import User from "./User";
import PaymentResult from "./PaymentResult";
import ShippingAddress from "./ShippingAddress";
import OrderItem from "./OrderItem";


delete mongoose.connection.models["Order"];
const { Schema } = mongoose;

const orderSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: User
  },
  userfirstName: {
    type: String,
  },
  userlastName: {
    type: String,
  },
  itemsPrice: {
    type: Number,
  },
  shippingPrice: {
    type: Number,
  },
  taxPrice: {
    type: Number,
  },
  totalPrice: {
    type: Number,
  },
  shippingAddress: {
    type: Schema.Types.ObjectId,
    ref: ShippingAddress,
  },
  paymentResult: {
    type: Schema.Types.ObjectId, 
    ref: PaymentResult,
  },
  orderItems: {
    type: Array,
    ref: OrderItem,
  },
  isPaid: {
    type: Boolean,
  },
  paidDate: {
    type: Date,
  },
  createdAt: {
    type: 'Date',
  }
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
