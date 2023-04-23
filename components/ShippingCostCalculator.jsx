import { useState, useContext, useEffect } from "react";
import { Store } from "@/utils/Store";
import axios from 'axios'

const ShippingCostCalculator = () => {


  const {
    state: {
      cart: { cartItems, shippingWeight, shippingInformation },
    },
  } = useContext(Store);

  const [boxLength, setBoxLength] = useState(null);
  const [boxWidth, setBoxWidth] = useState(null);
  const [boxHeight, setBoxHeight] = useState(null);
  const [shippingRate, setShippingRate] = useState(null);

  const pickBoxSize = (itemQuantity) => {
    if (itemQuantity <= 2) {
      setBoxLength(7);
      setBoxWidth(7);
      setBoxHeight(6);
    } else {
      setBoxLength(12);
      setBoxWidth(11);
      setBoxHeight(8);
    }
  };

  useEffect(() => {
    const totalQuantity = cartItems.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.quantity;
    }, 0);
    pickBoxSize(totalQuantity);
  }, [cartItems.quantity]);

  useEffect(() => {
    const getShippingRates = async () => {
      const data = {
        shippingWeight, 
        zipCode : shippingInformation?.zipCode, 
        boxLength, 
        boxWidth,
        boxHeight,
      };

      const res = await axios.post("/api/shipping/shippingCost", data);
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(res.data, "application/xml");
      const rate = xmlDoc.querySelector('RateV4Response Package Postage Rate').textContent;
      console.log(rate);
      setShippingRate(rate)
    };

    if (boxLength && boxWidth && boxHeight) {
      getShippingRates();
    }
  },[boxLength, boxWidth, boxHeight, shippingInformation.zipCode])
  

  return (
    <div>
      Shipping rate: {shippingRate ? `$${shippingRate}` : "N/A"}
    </div>
  )
}
export default ShippingCostCalculator