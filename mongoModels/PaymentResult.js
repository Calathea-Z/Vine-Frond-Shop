import mongoose from "mongoose";

delete mongoose.connection.models["PaymentResult"];

const paymentResultSchema = new mongoose.Schema({
  paymentResult: {
    type: "Object",
    name: 'shipping_address',
    properties: {
      "id" : {
        type : String,
      },
      "status" : {
        type : String,
      },
      "emailAddress" : {
        type : String,
      },
    }
  },
});

const PaymentResult = mongoose.model("PaymentResult", paymentResultSchema);

export default PaymentResult;
