import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import "./App.css";
import ProductList from "./products/ProductList";
import UsersList from "./users/UsersList";
import OrderList from "./order/OrderList";
import SaleList from "./sales/SaleList";
import CategoryList from "./category/CategoryList";
import Landing from "./dashboard/Landing";
import CategoryForm from "./forms/CategoryForm";
import ProductForm from "./forms/ProductForm";
import UserForm from "./forms/UserForm";
import SaleForm from "./forms/SaleForm";
import OrderForm from "./forms/OrderForm";
import {Provider} from 'react-redux';
import store from '../store';
import Navbar from "./layout/Navbar";
import Home from "./layout/Home";
import Cart from "./cart/Cart";
import AdminRoute from "./private-route/AdminRoute";
import Authenticate from "./layout/Authenticate";


function App() {
    return (
        <Provider store = {store}>
                <Router>
                    <div className="App">
                        <Navbar/>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/cart" component={Cart}/>
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
