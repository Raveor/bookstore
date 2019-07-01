import React, { Component } from 'react'
import { connect } from 'react-redux'
import {checkout} from '../../actions/cartActions.js'

class Recipe extends Component{

    handleChecked = (e)=>{
        if(e.target.checked){
            this.props.addShipping();
        }
        else{
            this.props.substractShipping();
        }
    };

    checkCheckout = () => {
        if(!this.props.user.isAuthenticated){
            alert("You are not logged in!");
        } else if(this.props.cartItems && this.props.cartItems.length === 0){
            alert("Add something to your cart!");
        } else{
            this.props.checkout(this.props.total, this.props.cartItems);
            alert("Your order was received!");
        }
    };


    render(){

        return(
            <div className="container">
                <div className="collection">
                    <li className="collection-item"><b>Total: {this.props.total} $</b></li>
                </div>
                <div className="checkout">
                    <button className="waves-effect waves-light btn" onClick={this.checkCheckout}>Checkout</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return{
        cartItems: state.cart.cartItems,
        total: state.cart.total,
        user: state.user
    }
};

const mapDispatchToProps = (dispatch)=>{
    return{
        addShipping: ()=>{dispatch({type: 'ADD_SHIPPING'})},
        substractShipping: ()=>{dispatch({type: 'SUB_SHIPPING'})},
        checkout: (total, cartItems) => {
            dispatch(checkout(total, cartItems))
        }
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(Recipe)
