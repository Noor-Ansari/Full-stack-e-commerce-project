import {ADD_USER, ADD_CART} from "./Types"

const initialState = {
    user: "",
    cart : [],
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_USER:
            return {
                ...state,
                user : action.payload
            }
        default:
            return state
    }
}

export default rootReducer;