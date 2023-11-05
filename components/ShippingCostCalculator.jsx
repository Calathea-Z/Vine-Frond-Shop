import { useState, useContext, useEffect } from "react";
import { Store } from "@/utils/Store";
import axios from "axios";
import jsCookie from "js-cookie";
import ClipLoader from "react-spinners/ClipLoader";

const ShippingCostCalculator = () => {
  const {
    state: {
      cart: { cartItems, shippingWeight, shippingInformation },
    },
    dispatch,
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
  }, [cartItems]);

  useEffect(() => {
    const getShippingRates = async () => {
      const data = {
        shippingWeight,
        zipCode: shippingInformation?.zipCode.substring(0, 5),
        boxLength,
        boxWidth,
        boxHeight,
      };

      try {
        const res = await axios.post("/api/shipping/shippingCost", data);
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(res.data, "application/xml");
        const errorElement = xmlDoc.querySelector("Error Description");
        if (errorElement) {
          const errorMessage = errorElement.textContent;
          console.error(`Error from USPS API: ${errorMessage}`);
        } else {
          const rateElement = xmlDoc.querySelector("Rate");
          if (rateElement) {
            const rate = rateElement.textContent;
            dispatch({
              type: "UPDATE_SHIPPING_COST",
              payload: rate,
            });
            jsCookie.set("shippingCost", JSON.stringify(rate));
            setShippingRate(rate);
          } else {
            console.error("Rate element not found in XML document");
          }
        }
      } catch (error) {
        console.error("Error fetching shipping rates", error);
      }
    };

    if (boxLength && boxWidth && boxHeight) {
      getShippingRates();
    }
  }, [
    boxLength,
    boxWidth,
    boxHeight,
    shippingInformation.zipCode,
    shippingWeight,
    dispatch,
  ]);

  return (
    <div className="s flex justify-between p-3">
      <h1 className="font-sans">USPS Priority Mail</h1>
      <p className="font-sans">
        {shippingRate ? (
          `$${shippingRate}`
        ) : (
          <>
            <ClipLoader />
          </>
        )}
      </p>
    </div>
  );
};
export default ShippingCostCalculator;
