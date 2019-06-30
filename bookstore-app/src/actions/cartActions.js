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
import uuid from "uuid";


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

export const checkout=(userId, total, cartItems)=>{
    axios.defaults.withCredentials = true;
    let saleId;
    axios
        .post("/sales", {order_date: Date.now(), total: total, user_id: userId})
            .then(res => {
                saleId = res.data.id;
                let orders = cartItems.map(item => ({
                    id: uuid.v4(),
                    order_id: saleId,
                    sku: item.sku,
                    name: item.name,
                    description: item.description,
                    quantity: item.localQuantity,
                    price: item.regular_price,
                    subtotal: item.regular_price,
            }));
                axios.post("/ordersMany", {order: orders})
                    .then(res => {
                        return ({
                            type: CHECKOUT
                        })
                    }).catch( () => {
                    return {
                        type: ERROR
                    };
                })
            })
            .catch(err => {
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
