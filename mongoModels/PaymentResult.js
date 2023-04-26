import mongoose from "mongoose";

delete mongoose.connection.models["PaymentResult"];

const paymentResultSchema = new mongoose.Schema({
  paymentResult: {
    type: "Object",
    name: 'shipping_address',
    properties: {
      "id" : {
        type : String,
        name : "id",
      },
      "status" : {
        type : String,
        name : "status,
      },
      "emailAddress" : {
        type : String,
        name : "email_address",
      },
    }
  },
});

const PaymentResult = mongoose.model("PaymentResult", paymentResultSchema);

export default PaymentResult;
