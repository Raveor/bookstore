import React, {Component} from "react";
import PropTypes from "prop-types";

class SaleItem extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let product = this.props.product;

        return (
            <li className="collection-item">
                <span className="title">
                    <h4>{product.order_date}</h4>
                    <div className="secondary-content">
                        <span>{product.total} zł</span>
                        <button
                            className="waves-effect waves-light btn-small"
                            onClick={() => this.props.Func(product.id)}
                        >
                        Detail<i className="material-icons right">send</i>
                    </button>
                        </div>
                </span>
                <p>Price: {product.total}</p>
                <p>
                    {product.order_date}
                </p>

            </li>
        )
    };


}

SaleItem.propTypes = {
    product: PropTypes.object.isRequired,
    Func: PropTypes.func.isRequired,
};

export default SaleItem;
