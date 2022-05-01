import { createContext, useReducer } from "react";
import cartReducer from "../reducer/cartReducer";
import {CartContextType} from "../shared/shareddtypes";


function parseStorage() {
	let cartJSON = localStorage.getItem("cart")
	console.log(cartJSON)
	if (cartJSON == null) return [];
	return JSON.parse(cartJSON);
}

const initialState = {
	cartItems: parseStorage(),
	dispatch: () => {}
}
export const CartContext = createContext<CartContextType>(initialState);

export const CartProvider = ({ children }: any) => {

	const [cartItems, dispatch] = useReducer(cartReducer, initialState.cartItems);

	localStorage.setItem("cart", JSON.stringify(cartItems));

	return (
		<CartContext.Provider value={{
			cartItems,
			dispatch
		}}>
			{ children }
		</CartContext.Provider>
	)
}