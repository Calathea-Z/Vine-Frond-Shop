import mongoose from "mongoose";

delete mongoose.connection.models["OrderItem"];

const orderItemSchema = new mongoose.Schema({
  orderItem: {
    type: "Object",
    name: 'order_item',
    properties: {
      "name" : {
        type : String,
      },
      "quantity" : {
        type : Number,
      },
      "image" : {
        type : String,
      },
      "price" : {
        type : Number,
      },
    }
  },
});

const OrderItem = mongoose.model("OrderItem", orderItemSchema);

export default OrderItem;
