import React, {Component} from "react";
import PropTypes from "prop-types";

class OrderItem extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let product = this.props.order;

        return this.props.expanded ? (
            <li className="collection-item">
                <span
                    className="title"
                    onClick={() => this.props.expandFunc(null)}
                >
                    <h4>{product.name}</h4>
                    <div className="secondary-content">
                        <span>{product.price} zł</span>

                        </div>
                </span>
                <p>Price: {product.price}</p>
                <p>
                    {product.description}
                </p>

            </li>
        ) : (
            <a
                href="#!"
                className="collection-item"
                onClick={() => this.props.expandFunc(product.id)}
            >
                <li>
                    {product.name}
                    <div className="secondary-content mr-10">{product.price} zł
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