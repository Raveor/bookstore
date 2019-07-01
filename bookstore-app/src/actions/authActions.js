import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import sha1 from "sha1"

import {GET_ERRORS, SET_USER} from "./types";

export const registerUser = (userData, history) => dispatch => {
    userData.password = sha1(userData.password);
    userData.passwordConfirmation = sha1(userData.passwordConfirmation);

    axios
        .post("/api/auth/register", userData)
        .then(() => history.push("/authenticate/local"))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

export const loginUser = userData => dispatch => {
    userData.password = sha1(userData.password);

    axios
        .post("/api/auth/login", userData)
        .then(res => {
            const {token} = res.data;
            localStorage.setItem("jwtToken", token);

            setAuthToken(token);

            const decoded = jwt_decode(token);

            dispatch(setCurrentUser(decoded));
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

export const setCurrentUser = decoded => {
    return {
        type: SET_USER,
        payload: decoded
    };
};

export const logoutUser = () => dispatch => {
    localStorage.removeItem("jwtToken");

    setAuthToken(false);

    dispatch(setCurrentUser({}));
};
