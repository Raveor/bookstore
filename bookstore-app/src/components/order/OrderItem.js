import React, {Component} from "react";
import PropTypes from "prop-types";
import BookItem from "./BookItem";

class OrderItem extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let order = this.props.order;
        let price = (order.books
            .reduce(
                (accumulator, currentValue) => accumulator + currentValue.price * currentValue.quantity
                , 0
            ));

        return this.props.expanded ? (
            <React.Fragment>
                <ul className="collection">

                    <h5>{"User email: " + order.userId.email}</h5>

                    {order.books.map(book => (<BookItem
                        book={book}
                        user={order.userId}
                        key={book._id}
                    />))}
                    <div className="secondary-content">
                        <span>Order id: {order._id}</span>
                        <br/>
                    </div>
                </ul>
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
    expandFunc: PropTypes.func.isRequired
};

export default OrderItem;
