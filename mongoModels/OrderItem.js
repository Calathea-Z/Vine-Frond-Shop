import mongoose from "mongoose";

delete mongoose.connection.models["OrderItem"];

const orderItemSchema = new mongoose.Schema({
  orderItem: {
    type: "Object",
    name: 'order_item',
    properties: {
      "name" : {
        type : String,
        name : "name",
      },
      "quantity" : {
        type : Number,
        name : "quantity",
      },
      "image" : {
        type : String,
        name : "image",
      },
      "price" : {
        type : Number,
        name : "price",
      },
    }
  },
});

const OrderItem = mongoose.model("OrderItem", orderItemSchema);

export default OrderItem;
