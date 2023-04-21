import EasyPost from "@easypost/api/types/EasyPost";
import { useState } from "react";

const EasyPost = async ({
  company,
  firstName,
  lastName,
  address,
  city,
  usState,
  zipCode,
  weight,
  quantity
}) => {
  const [boxLength, setBoxLength] = useState(null);
  const [boxWidth, setBoxWidth] = useState(null);
  const [boxHeight, setBoxHeight] = useState(null);
  const itemQuantity = quantity

  const pickBoxSize = (itemQuantity) => {
    if (itemQuantity <= 2) {
      setBoxLength(7)
      setBoxWidth(7)
      setBoxHeight(6)
    } else if (itemQuantity >2 && itemQuantity <=5){
      setBoxLength(11)
      setBoxWidth(8)
      setBoxHeight(6)
    } else {
      setBoxLength(12)
      setBoxWidth(11)
      setBoxHeight(8)
    }
  }

  pickBoxSize(itemQuantity);

  const api = new Easypost(process.env.EASYPOST_KEY);

  const fromAddress = new api.Address({
    company: process.env.BUSINESS_NAME,
    address: process.env.BUSINESS_STREET,
    city: process.env.BUSINESS_CITY,
    State: process.env.BUSINESS_STATE,
    zipCode: process.env.BUSINESS_ZIP,
  });

  fromAddress.save().then(console.log);

  const toAddress = new api.Address({
    companyName: company,
    firstName: firstName,
    lastName: lastName,
    address: address,
    city: city,
    State: usState,
    zipCode: zipCode,
  });

  toAddress.save().then(console.log);

  const parcel = new api.Parcel({
    length: boxLength,
    width: boxWidth,
    height: boxHeight,
    weight: weight,
  });

  parcel.save().then(console.log);

  const shipment = new api.Shipment({
    toAddress: toAddress,
    fromAddress: fromAddress,
    parcel: parcel,
  });

  shipment.save().then(console.log);

  shipment
    .getRates(shipment.lowestRate(["USPS"], ["First"]))
    .then((rates) => {
      console.log(rates);
    })
    .catch((error) => {
      console.log(error);
    });

  return <div>EasyPost</div>;
};
export default EasyPost;
