import {FETCH_CATEGORIES, UPDATE_FILTER} from "../actions/types";


export default function (state = null, action) {
    switch (action.type) {
        case FETCH_CATEGORIES:
            return {
                ...state,
                publishingHouse: action.payload.publishingHouse,
                bookTypes: action.payload.bookTypes
            };
        case UPDATE_FILTER:
            return {
                ...state,
                categories: action.payload
            };
        default:
            return state;
    }
}
