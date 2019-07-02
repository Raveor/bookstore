import React, {Component} from "react";
import axios from "axios";
import OrderItem from "./OrderItem";

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
            <div className="container" style={{backgroundColor: "white"}}>
                <ul className="collection">
                    <div className="collection-item collection-header">
                        <h3>Orders</h3>
                    </div>
                    {products}
                </ul>
            </div>
        );
    }
}

export default OrderList;
