import Cookies from "js-cookie";
import { createContext, useReducer } from "react";

export const Store = createContext();

const initialState = {
	cart: {
		cartItems: Cookies.get("cartItems")
			? JSON.parse(Cookies.get("cartItems"))
			: [],
		shippingInformation: Cookies.get("shippingAddress")
			? JSON.parse(Cookies.get("shippingAddress"))
			: {},
		shippingWeight: Cookies.get("shippingWeight")
			? JSON.parse(Cookies.get("shippingWeight"))
			: null,
		shippingCost: Cookies.get("shippingCost")
			? JSON.parse(Cookies.get("shippingCost"))
			: null,
		paymentSuccess: Cookies.get("orderSuccess")
			? JSON.parse(Cookies.get("orderSuccess"))
			: false,
	},
	userInfo: Cookies.get("userInfo")
		? JSON.parse(Cookies.get("userInfo"))
		: null,
};

function reducer(state, action) {
	switch (action.type) {
		case "CART_ADD_ITEM": {
			const newItem = action.payload;
			const existItem = state.cart.cartItems.find(
				(item) => item._key === newItem._key
			);
			const cartItems = existItem
				? state.cart.cartItems.map((item) =>
						item._key === existItem._key ? newItem : item
				  )
				: [...state.cart.cartItems, newItem];
			Cookies.set("cartItems", JSON.stringify(cartItems));
			return { ...state, cart: { ...state.cart, cartItems } };
		}
		case "CART_REMOVE_ITEM": {
			const cartItems = state.cart.cartItems.filter(
				(item) => item._key !== action.payload._key
			);
			Cookies.set("cartItems", JSON.stringify(cartItems));
			return { ...state, cart: { ...state.cart, cartItems } };
		}
		case "CART_CLEAR_ITEMS": {
			return { ...state, cart: { ...state.cart, cartItems: [] } };
		}
		case "USER_LOGIN": {
			return { ...state, userInfo: action.payload };
		}
		case "USER_LOGOUT": {
			return {
				...state,
				userInfo: null,
				cart: {
					cartItems: [],
					shippingInformation: {},
				},
			};
		}
		case "SAVE_SHIPPING_ADDRESS": {
			return {
				...state,
				cart: {
					...state.cart,
					shippingInformation: {
						...state.cart.shippingInformation,
						...action.payload,
					},
				},
			};
		}
		case "UPDATE_SHIPPING_WEIGHT": {
			return {
				...state,
				cart: { ...state.cart, shippingWeight: action.payload },
			};
		}
		case "UPDATE_SHIPPING_COST": {
			return {
				...state,
				cart: { ...state.cart, shippingCost: action.payload },
			};
		}
		case "UPDATE_PAYMENT_SUCCESS": {
			return {
				...state,
				cart: { ...state.cart, orderSuccess: action.payload },
			};
		}
		case "CLEAR_PAYMENT_STATUS": {
			return {
				...state,
				cart: { ...state.cart, orderSuccess: false },
			};
		}
		default:
			return state;
	}
}

export function StoreProvider(props) {
	const [state, dispatch] = useReducer(reducer, initialState);
	const value = { state, dispatch };
	return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
