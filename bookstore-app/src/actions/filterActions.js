import {FETCH_CATEGORIES, UPDATE_FILTER} from "../actions/types";
import axios from "axios";
export const fetch_categories = () => dispatch => {
    axios.all([
        axios.get('/api/publishinghouse'),
        axios.get('/api/booktype')
    ])
        .then(axios.spread((house, bookType) => dispatch({
            type: FETCH_CATEGORIES,
            payload: {publishingHouse: house.data, bookTypes: bookType.data}
        })))
        //.then(response => this.setState({ vehicles: response.data }))
        .catch(error => console.log(error));

};
