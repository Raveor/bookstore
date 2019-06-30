import {FETCH_ITEMS, UPDATE_FILTER} from "../actions/types";
import axios from "axios";
axios.defaults.withCredentials = true;
export const fetch_items = () => dispatch => {
    axios
        .get("/api/book")
        .then(res => dispatch({
            type: FETCH_ITEMS,
            payload: res.data
        }))
        .catch(() =>
            console.log("Error while fetching items!")
        );
};


export const update_filters = filters => ({
    type: UPDATE_FILTER,
    payload: filters
});
