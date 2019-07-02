import React, {Component} from "react";
import PropTypes from "prop-types";
import BookItem from "./BookItem";

class OrderItem extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        console.log("entering oredr item");
        let order = this.props.order;
        console.log(order);
        let price = (order.books
            .reduce(
                (accumulator, currentValue) => accumulator + currentValue.price * currentValue.quantity
                , 0
            ));

        return this.props.expanded ? (
            <React.Fragment>
                <li>

                    <h5>{"User email: " + order.userId.email}</h5>
                    <div className="secondary-content">
                        <span>Order id: {order._id}</span>
                    </div>
                </li>
            {order.books.map(book => (<BookItem
                    book={book}
                    user={order.userId}
                    key={book._id}
                />))}
            </React.Fragment>

        ) : (
            <a
                className="collection-item"
                onClick={() => this.props.expandFunc(order._id)}
            >
                <li>
                    {order.userId.email + " order " + order._id}
                    <div className="secondary-content">{price} zł
                    </div>
                </li>
            </a>
        );
    };


}

OrderItem.propTypes = {
    expanded: PropTypes.bool,
    order: PropTypes.object.isRequired,
    Func: PropTypes.func.isRequired,
    expandFunc: PropTypes.func.isRequired
};

export default OrderItem;
