import Shippo from "shippo";
import { useState, useContext, useEffect } from "react";
import { Store } from "@/utils/Store";
import axios from 'axios'

const ShippingCostCalculator = () => {
  const shippoClient = Shippo(process.env.NEXT_PUBLIC_SHIPPO_API_KEY);

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
    } else if (itemQuantity > 2 && itemQuantity <= 5) {
      setBoxLength(11);
      setBoxWidth(8);
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
    const createShipment = async () => {
      try {
        const addressFrom = await shippoClient.address.create({
          "company": "Vine & Frond",
          "street1": process.env.NEXT_PUBLIC_BUSINESS_STREET,
          "city": process.env.NEXT_PUBLIC_BUSINESS_CITY,
          "state": process.env.NEXT_PUBLIC_BUSINESS_STATE,
          "zip": process.env.NEXT_PUBLIC_BUSINESS_ZIP,
          "country": "US",
        });
  
        const addressTo = await shippoClient.address.create({
          "company": shippingInformation.company,
          "name": `${shippingInformation.firstNameShipping} ${shippingInformation.lastNameShipping}`,
          "street1": shippingInformation.address,
          "city": shippingInformation.city,
          "state": shippingInformation.state,
          "zip": shippingInformation.zipCode,
          "country": "US",
        });    
        const parcel = await shippoClient.parcel.create({
          "length": boxLength,
          "width": boxWidth,
          "height": boxHeight,
          "distance_unit": "ft",
          "weight": shippingWeight,
          "mass_unit": "oz",
        });
  
        const shipment = await shippoClient.shipment.create({
          "address_from": addressFrom,
          "address_to": addressTo,
          "parcels": [parcel],
          "async": false,
        });
  
        const shipmentId = shipment.object_id;
        console.log("ShIP ID", shipment)
        const currencyCode = 'USD';
        getRatesForShipment(shipmentId, currencyCode);
      } catch (error) {
        console.log(error);
      }
    };
  
    const getRatesForShipment = async (shipmentId, currencyCode) => {
      const apiURL = `https://api.goshippo.com/shipments/${shipmentId}/rates/${currencyCode}/`; 
      const headers = {
        'Authorization': `ShippoToken ${process.env.NEXT_PUBLIC_SHIPPO_API_KEY}`,
        'Content-Type': 'application/json',
      };
  
      try {
        const res = await axios.get(apiURL, { headers });
        console.log(res);
        const rates = res.data.results;
        console.log("Rates", rates)
        return rates;
      } catch (error) {
        console.log(error);
      }
    };
  
    if (boxLength && boxWidth && boxHeight) {
      createShipment();
    }
  }, [boxLength, boxWidth, boxHeight, shippingInformation]);

  return <div>rates</div>;
};
export default ShippingCostCalculator;
