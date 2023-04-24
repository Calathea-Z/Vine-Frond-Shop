import { Store } from "@/utils/Store";
import { urlFor } from "@/utils/image";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import { useSnackbar } from "notistack";
import sadCart from "../public/assets/sadCart.png";
import { useRouter } from "next/router";
import jsCookie from "js-cookie";

const CartSummary = () => {
  const router = useRouter();
  const {
    state: {
      cart: { cartItems,  },
    },
    dispatch,
  } = useContext(Store);
  return (
    <div>CartSummary</div>
  )
}
export default CartSummary