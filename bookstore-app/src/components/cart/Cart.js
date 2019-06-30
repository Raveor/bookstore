import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {removeItem} from '../../actions/cartActions.js'
import {addQuantity, subQuantity} from '../../actions/cartActions'
import Recipe from '../layout/Recipe'

class Cart extends Component {

    //to remove the item completely
    handleRemove = (id) => {
        this.props.removeItem(id);
    };
    //to add the localQuantity
    handleAddQuantity = (id) => {
        this.props.addQuantity(id);
    };
    //to substruct from the quantity
    handleSubtractQuantity = (id) => {
        this.props.subtractQuantity(id);
    };

    render() {


        let addedItems = this.props.cartItems.length ?
            (
                this.props.cartItems.map(item => {
                    return (

                        <li className="collection-item" key={item.id}>
                            <div className="item-desc center-block">
                                <span className="title">{item.title}</span>
                                <p>{item.author.author}</p>
                                <p>{item.description}</p>
                                <p><b>Price: {item.price}$</b></p>
                                <p>
                                    <b>Quantity: {item.localQuantity}</b>
                                </p>
                                <div className="add-remove">
                                    <Link to="/cart"><i className="material-icons" onClick={() => {
                                        this.handleAddQuantity(item._id)
                                    }}>arrow_drop_up</i></Link>
                                    <Link to="/cart"><i className="material-icons" onClick={() => {
                                        this.handleSubtractQuantity(item._id)
                                    }}>arrow_drop_down</i></Link>
                                </div>
                                <button className="waves-effect waves-light btn pink remove" onClick={() => {
                                    this.handleRemove(item._id)
                                }}>Remove
                                </button>
                            </div>

                        </li>

                    )
                })
            ) :

            (
                <p>Nothing.</p>
            );
        return (
            <div className="container">
                <div className="cart">
                    <h5>You have ordered:</h5>
                    <ul className="collection">
                        {addedItems}
                    </ul>
                </div>
                <Recipe/>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        cartItems: state.cart.cartItems,
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        removeItem: (id) => {
            dispatch(removeItem(id))
        },
        addQuantity: (id) => {
            dispatch(addQuantity(id))
        },
        subtractQuantity: (id) => {
            dispatch(subQuantity(id))
        }
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart)
