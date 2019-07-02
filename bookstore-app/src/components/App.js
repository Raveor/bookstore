import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import "./App.css";
import Landing from "./layout/Landing";
import {Provider} from 'react-redux';
import store from '../store';
import Navbar from "./layout/Navbar";
import Home from "./layout/Home";
import Cart from "./layout/Cart";
import AdminRoute from "./private-route/AdminRoute";
import Login from "./auth/Login";
import Register from "./auth/Register";
import OrderList from "./order/OrderList";
import BookTypeForm from "./forms/BookTypeForm";
import AuthorForm from "./forms/AuthorForm";
import PublishingHouseForm from "./forms/PublishingHouseForm";
import BookForm from "./forms/BookForm";
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";
import {logoutUser, setCurrentUser} from "../actions/authActions";


if (localStorage.jwtToken) {
    // Set auth token header auth
    const token = localStorage.jwtToken;
    setAuthToken(token);
    // Decode token and get user info and exp
    const decoded = jwt_decode(token);
    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));
    // Check for expired token
    const currentTime = Date.now() / 1000; // to get in milliseconds
    if (decoded.exp < currentTime) {
        // Logout user
        store.dispatch(logoutUser());

        // Redirect to login
        window.location.href = "./authenticate/login";
    }
}

class App extends Component{
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className="App">
                        <Navbar/>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/cart" component={Cart}/>
                        <Route exact path="/authenticate/local" component={Login}/>
                        <Route exact path="/authenticate/register" component={Register}/>
                        <Switch>
                            <AdminRoute exact path="/admin" component={Landing}/>
                            <AdminRoute exact path="/orders" component={OrderList}/>
                            <AdminRoute exact path="/form/bookType" component={BookTypeForm}/>
                            <AdminRoute exact path="/form/author" component={AuthorForm}/>
                            <AdminRoute exact path="/form/publishinghouse" component={PublishingHouseForm}/>
                            <AdminRoute exact path="/form/book" component={BookForm}/>
                        </Switch>
                    </div>
                </Router>
            </Provider>

        );
    }
}

export default App;
