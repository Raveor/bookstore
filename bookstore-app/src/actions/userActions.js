import {GET_USER, SET_USER} from "../actions/types";

import axios from "axios";
axios.defaults.withCredentials = true;
export const setUser = () => dispatch => {
    axios
        .get("/user")
        .then(res => {
            console.log(res.data);
            console.log(JSON.stringify(res.data));
            dispatch({
                type: SET_USER,
                payload: res.data
            })
        })
        .catch(err =>
            console.log("Error while fetching items!" + err)
        );
};


export const getUser = () => ({
    type: GET_USER,
});
