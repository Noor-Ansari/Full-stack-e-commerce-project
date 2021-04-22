import {ADD_USER, ADD_CART} from "./Types"

const initialState = {
    user: JSON.parse(sessionStorage.getItem("user")),
    cart : [],
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_USER:
            return {
                ...state,
                user : action.payload
            }
        case ADD_CART:
            return {
                ...state,
                cart : action.payload
            }
        default:
            return state
    }
}

export default rootReducer;