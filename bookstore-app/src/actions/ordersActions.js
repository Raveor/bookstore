import {FETCH_ORDERS} from "../actions/types";
import axios from "axios";
axios.defaults.withCredentials = true;
export const fetch_orders = () => dispatch => {
    axios
        .get("/api/order/user")
        .then(res => dispatch({
            type: FETCH_ORDERS,
            payload: res.data
        }))
        .catch(() =>
            console.log("Error while fetching orders!")
        );
};
