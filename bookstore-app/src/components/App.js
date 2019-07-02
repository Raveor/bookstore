import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import "./App.css";
import CategoryList from "./category/CategoryList";
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
import ProductList from "./products/ProductList";
import BookTypeForm from "./forms/BookTypeForm";
import AuthorForm from "./forms/AuthorForm";
import PublishingHouseForm from "./forms/PublishingHouseForm";
import BookForm from "./forms/BookForm";

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
                        <Route exact path="/admin" component={Landing}/>
                        <Route exact path="/orders" component={OrderList}/>
                        <Route exact path="/books" component={ProductList}/>
                        <Route exact path="/bookType" component={CategoryList}/>
                        <Route exact path="/form/bookType" component={BookTypeForm}/>
                        <Route exact path="/form/author" component={AuthorForm}/>
                        <Route exact path="/form/publishinghouse" component={PublishingHouseForm}/>
                        <Route exact path="/form/book" component={BookForm}/>
                    </Switch>
                </div>
            </Router>
        </Provider>

    );
}

export default App;
