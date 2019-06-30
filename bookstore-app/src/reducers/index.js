import { combineReducers } from "redux";
import cartReducer from "./cartReducer";
import itemsReducer from "./itemsReducer";
import userReducer from "./userReducer";
import filterReducer from "./filterReducer";

export default combineReducers({
    cart: cartReducer,
    items: itemsReducer,
    user: userReducer,
    filter: filterReducer
});
