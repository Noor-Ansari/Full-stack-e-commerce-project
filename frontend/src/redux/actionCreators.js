import {ADD_USER, ADD_CART} from "./Types"

export const addUser = (user) => {
    return {
        type: ADD_USER,
        payload : user,
    }
}

export const addCart = (cart) => {
    return {
        type: ADD_CART,
        payload : cart
    }
}