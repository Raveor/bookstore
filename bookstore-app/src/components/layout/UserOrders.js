import React, {Component} from 'react';
import {fetch_orders} from "../../actions/ordersActions";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import OrderItem from "../order/OrderItem";

class UserOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expand: ""
        };
    }

    setExpanded = id => {
        this.setState({expand: id});
    };

    componentDidMount() {
        this.props.fetch_orders();

    }
    render() {
        let products =
            this.props.orders && this.props.orders.length > 0 ? (
                this.props.orders.map(order => (
                    <OrderItem
                        key={order._id}
                        order={order}
                        expanded={order._id === this.state.expand}
                        expandFunc={this.setExpanded}
                    />
                ))
            ) : (
                <p className="collection-item">There are no orders!</p>
            );
        return (
            <div className="container row">
                <div className="container">
                    <div style={{marginTop: "4rem"}} className="row">
                        <div className="col s12">
                            <div className="col s12" style={{paddingLeft: "11.250px"}}>
                                <h4>
                                    Your orders:
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

UserOrders.propTypes = {
    orders: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        orders: state.orders.orders,
    }
};
const mapDispatchToProps = (dispatch) => ({
    fetch_orders: () => {
        dispatch(fetch_orders())
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(UserOrders)
