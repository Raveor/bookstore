import React, {Component} from "react";
import PropTypes from "prop-types";

class CategoryItem extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let product = this.props.category;

        return (
            <li className="collection-item">
                {product.name}
                <div className="secondary-content mr-10">
                    <span>Id: {product.id}</span>
                </div>
            </li>

        )
    };


}

CategoryItem.propTypes = {
    category: PropTypes.object.isRequired,
    Func: PropTypes.func.isRequired,
};

export default CategoryItem;