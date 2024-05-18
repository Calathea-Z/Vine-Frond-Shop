import { createContext, useReducer, useEffect } from "react";
import Cookies from "js-cookie";

export const Store = createContext(); // Create a React context for global state management

const defaultInitialState = {
	cart: {
		cartItems: [],
		shippingInformation: {},
		shippingWeight: null,
		shippingCost: null,
		paymentSuccess: false,
	},
	userInfo: null,
	isCartVisible: false,
};

// Reducer function to handle state changes based on dispatched actions
function reducer(state, action) {
	switch (action.type) {
		case "CART_ADD_ITEM": {
			const newItem = action.payload;
			const existItem = state.cart.cartItems.find(
				(item) => item._key === newItem._key
			);
			// Update cart items, replacing existing item if found, otherwise adding new item
			const cartItems = existItem
				? state.cart.cartItems.map((item) =>
						item._key === existItem._key ? newItem : item
				  )
				: [...state.cart.cartItems, newItem];
			Cookies.set("cartItems", JSON.stringify(cartItems)); // Update cookies with new cart items
			return { ...state, cart: { ...state.cart, cartItems } };
		}
		case "CART_REMOVE_ITEM": {
			// Filter out the item to be removed from the cart
			const cartItems = state.cart.cartItems.filter(
				(item) => item._key !== action.payload._key
			);
			Cookies.set("cartItems", JSON.stringify(cartItems)); // Update cookies with new cart items
			return { ...state, cart: { ...state.cart, cartItems } };
		}
		case "CART_CLEAR_ITEMS": {
			// Clear all items from the cart
			return { ...state, cart: { ...state.cart, cartItems: [] } };
		}
		case "USER_LOGIN": {
			// Set user info upon login
			return { ...state, userInfo: action.payload };
		}
		case "USER_LOGOUT": {
			// Clear user info and reset cart upon logout
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
			// Save or update shipping address in the cart
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
			// Update the shipping weight for the cart
			return {
				...state,
				cart: { ...state.cart, shippingWeight: action.payload },
			};
		}
		case "UPDATE_SHIPPING_COST": {
			// Update the shipping cost for the cart
			return {
				...state,
				cart: { ...state.cart, shippingCost: action.payload },
			};
		}
		case "UPDATE_PAYMENT_SUCCESS": {
			// Update payment success status
			return {
				...state,
				cart: { ...state.cart, orderSuccess: action.payload },
			};
		}
		case "CLEAR_PAYMENT_STATUS": {
			// Clear payment success status
			return {
				...state,
				cart: { ...state.cart, orderSuccess: false },
			};
		}
		case "SHOW_CART": {
			return { ...state, isCartVisible: true };
		}
		case "HIDE_CART": {
			return { ...state, isCartVisible: false };
		}
		case "INITIALIZE_STATE": {
			// Initialize state with values from cookies
			const { cartItems, userInfo } = action.payload;
			return {
				...state,
				cart: { ...state.cart, cartItems },
				userInfo,
			};
		}
		default:
			return state;
	}
}

export function StoreProvider({ children, initialCookies }) {
	const [state, dispatch] = useReducer(reducer, defaultInitialState); // Use React's useReducer hook for state management

	useEffect(() => {
		if (initialCookies) {
			// Parse cookies and initialize state on component mount
			const cartItems = initialCookies.cartItems
				? JSON.parse(initialCookies.cartItems)
				: [];
			const userInfo = initialCookies.userInfo
				? JSON.parse(initialCookies.userInfo)
				: null;
			dispatch({ type: "INITIALIZE_STATE", payload: { cartItems, userInfo } });
		}
	}, [initialCookies]);

	const value = { state, dispatch }; // Prepare the context value

	return <Store.Provider value={value}>{children}</Store.Provider>; // Provide the context to children components
}
