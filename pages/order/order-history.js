import { Store } from "@/utils/Store";
import { getError } from "@/utils/error";
import { useContext, useEffect, useReducer } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ClipLoader from "react-spinners/ClipLoader";
import dynamic from "next/dynamic";
import Link from "next/link";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, orders: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

const OrderHistoryScreen = () => {
  const router = useRouter();
  const { state } = useContext(Store);
  const { userInfo } = state;

  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    orders: [],
    error: "",
  });

  useEffect(() => {
    if (!userInfo) {
      router.push("/login");
    }
    const fetchOrders = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/orders/history`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: getError(error) });
      }
    };
    fetchOrders();
  }, [router, userInfo]);

  return (
    <div>
      <Header />
      {loading ? (
        <div className="min-h-screen flex justify-center items-center">
          <ClipLoader />
        </div>
      ) : (
        <div className="p-4 grid gap-2">
          <h1 className='text-xl text-center font-sans font-bold'>{userInfo.firstName}'s{""} Order History</h1>
          {orders.slice().reverse().map((order, index) => (
            <div key={index} className='border-2 border-gray-400 rounded-md p-2 grid grid-cols-4 gap-2'>
              <div>
                <h1 className='font-sans'>Order Date:</h1>
              <h1 className='font-sans text-sm'>{order.createdAt.substring(0,10)}</h1>
              </div>
              <div>
                <h1 className='font-sans'>Confirmation Number:</h1>
                <h1 className='font-sans text-xs'>{order._id}</h1>
              </div>
              <div>
                <h1 className='font-sans'>Total Price:</h1>
                <h1 className='font-sans text-sm'>${order.totalPrice}</h1>
              </div>
              <div className='flex justify-center items-center'>
                <Link href={`/order/${order._id}`} className='font-sans text-sm text-black rounded-lg border-black border-2 shadow-md bg-primary p-2 hover:opacity-80' passHref>Order Details</Link>
              </div>
            </div>
          ))}
        </div>
      )}

      <Footer />
    </div>
  );
};

export default dynamic(() => Promise.resolve(OrderHistoryScreen), {
  ssr: false,
});
