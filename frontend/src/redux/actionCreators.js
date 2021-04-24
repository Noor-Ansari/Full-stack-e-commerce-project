import {ADD_USER, ADD_CART, REMOVE_PRODUCT, ADD_PRODUCTS,REMOVE_USER} from "./Types"

export const addUser = (user) => {
    return {
        type: ADD_USER,
        payload : user,
    }
}

export const removeUser = (user) => {
    return {
        type: REMOVE_USER,
        payload : user,
    }
}

export const addCart = (cart) => {
    return {
        type: ADD_CART,
        payload : cart
    }
}

export const removeFromCart = (removedProduct) => {
    return {
        type: REMOVE_PRODUCT,
        payload : removedProduct
    }
}


export const addProducts = (products) => {
    return {
        type: ADD_PRODUCTS,
        payload : products
    }
}