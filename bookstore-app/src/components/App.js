import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import "./App.css";
import CategoryList from "./category/CategoryList";
import Landing from "./dashboard/Landing";
import {Provider} from 'react-redux';
import store from '../store';
import Navbar from "./layout/Navbar";
import Home from "./layout/Home";
import Cart from "./cart/Cart";
import AdminRoute from "./private-route/AdminRoute";
import Login from "./auth/Login";
import Register from "./auth/Register";

function App() {
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
                        <AdminRoute exact path="/categories" component={CategoryList}/>
                    </Switch>
                </div>
            </Router>
        </Provider>

    );
}

export default App;