import { ADD_USER, ADD_CART, REMOVE_PRODUCT,  ADD_PRODUCTS, REMOVE_USER } from "./Types";

const initialState = {
	user: JSON.parse(sessionStorage.getItem("user")) || "",
    cart: [],
    products : []
};

const rootReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_USER:
			return {
				...state,
				user: action.payload,
			};
		case REMOVE_USER:
			sessionStorage.removeItem("user")
			return {
				...state,
				user : ""	
		}
        case ADD_PRODUCTS:
           return {
               ...state,
               products : action.payload
            }
		case ADD_CART:
			return {
				...state,
				cart: action.payload,
			};
		case REMOVE_PRODUCT:
			return {
				...state,
				cart: state.cart.filter(
					({ product_id }) => product_id._id !== action.payload
				),
			};
		default:
			return state;
	}
};

export default rootReducer;
