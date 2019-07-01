import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    GET_CART,
    ADD_QUANTITY,
    SUB_QUANTITY,
    CHECKOUT,
    ERROR
} from "../actions/types";
import axios from "axios";

export const getCartItems = () => {
    return {
        type: GET_CART,
        payload: "data"
    }
};

export const removeItem=(_id)=>{
    return{
        type: REMOVE_FROM_CART,
        _id
    }
};
export const addQuantity=(_id)=>{
    return{
        type: ADD_QUANTITY,
        _id
    }
};
export const subQuantity=(_id)=>{
    return{
        type: SUB_QUANTITY,
        _id
    }
};

export const addToCart=(item)=>{
    return{
        type: ADD_TO_CART,
        item
    }
};

export const checkout=(total, cartItems)=>{
    let books = cartItems.map(cart => ({
        bookId: cart._id,
        quantity: cart.localQuantity,
        price: cart.localQuantity * cart.price
    }));
    axios
        .post("/api/order", {books: books})
            .catch(() => {
                return {
                    type: ERROR
                };
            });
    return ({
        type: CHECKOUT
    })
};

export const checkoutSuccess = () => {
    return {
        type: CHECKOUT
    }
};
