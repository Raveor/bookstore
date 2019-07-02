import React, {Component} from "react";
import axios from "axios";
import OrderItem from "./OrderItem";
import {Link} from "react-router-dom";

class OrderList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        console.log("Order list załadowano ziomus");
        this.loadReports();
    }

    loadReports() {
        axios.get("/api/order")
            .then(response => {
                const orders = response.data;
                const expand = orders.length > 0 ? orders[0].id : null;
                this.setState({
                    orders,
                    expand
                });
            })
            .catch(error => {
                this.setState({
                        error
                    }
                );
                console.log(error);
            });
    };

    setExpanded = id => {
        this.setState({expand: id});
    };

    render() {
        let products =
            this.state.orders && this.state.orders.length > 0 ? (
                this.state.orders.map(order => (
                    <OrderItem
                        key={order._id}
                        order={order}
                        expanded={order._id === this.state.expand}
                        expandFunc={this.setExpanded}
                    />
                ))
            ) : (
                <p className="collection-item">There is no orders!</p>
            );
        return (
            <div className="container row">
                <div className="container">
                    <div style={{marginTop: "4rem"}} className="row">
                        <div className="col s12">
                            <Link to="/admin" className="btn-flat waves-effect">
                                <i className="material-icons left">keyboard_backspace</i> Back to
                                admin panel
                            </Link>
                            <div className="col s12" style={{paddingLeft: "11.250px"}}>
                                <h4>
                                    Orders:
                                </h4>
                            </div>
                            <div className="input-field col s12">
                            </div>
                            <ul className="collection">
                                {products}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default OrderList;
