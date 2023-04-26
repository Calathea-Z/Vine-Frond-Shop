import mongoose from "mongoose";

delete mongoose.connection.models["Order"];

const orderSchema = new mongoose.Schema({
  user: {
    type: ref,
    ref: "User",
    unique: true
  },
  userName: {
    type: String,
    name: 'user_name'
  },
  itemsPrice: {
    type: Number,
    name: 'items_price',
  },
  shippingPrice: {
    type: Number,
    name: 'shipping_price',
  },
  taxPrice: {
    type: Number,
    name: 'tax_price',
  },
  totalPrice: {
    type: Number,
    name: 'total_price',
  },
  shippingAddress: {
    type: ref,
    ref: 'ShippingAddress',
    name: 'shipping_address',
  },
  paymentResult: {
    type: ref, 
    ref: "PaymentResult",
    name: 'payment_result',
  },
  orderItems: {
    type: embedsMany,
    ref: "OrderItem",
    name: 'order_items',
  },
  isPaid: {
    type: Boolean,
    name: 'is_paid',
  },
  paidDate: {
    type: Date,
    name: 'paid_date'
  },
  createdAt: {
    type: 'Date',
    name: 'created_at'
  }
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
