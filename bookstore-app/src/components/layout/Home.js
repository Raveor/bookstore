import React, {Component} from 'react';
import {connect} from 'react-redux'
import {addToCart} from '../../actions/cartActions'
import {fetch_items} from "../../actions/itemsActions";
import M from 'materialize-css';
import Filter from "./Filter";

class Home extends Component {

    componentDidMount() {
        this.props.fetch_items();

    }

    handleClick = (id) => {
        this.props.addToCart(id);
    };

    render() {
        let itemList = this.props.items && this.props.items.length > 0 ? this.props.items.map(item => (
                <div className="card" key={item._id}>
                    <div className="card-image" >
                        <button className="btn-floating btn halfway-fab waves-effect waves-light red" onClick={() => {
                            this.handleClick(item)
                        }}><i className="material-icons">add</i></button>
                    </div>

                    <div className="card-content">
                        <div className="card-title">{item.title}</div>
                        <p>{item.author.name + " " +  item.author.surname}</p>
                        <p>{item.description}</p>
                        <p><b>Price: {item.price}zł</b></p>
                    </div>
                </div>
        )) : (
            <div className="card" key='1'>
                'No items here'
            </div>
        );

        return (
            <div className="container row">
                <h3 className="center">Our items</h3>
                <div className="col s3 left-align">
                    <Filter/>
            </div>
                <div className="box s9">
                    {itemList}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        items: state.items.items
    }
};
const mapDispatchToProps = (dispatch) => ({
    addToCart: (id) => {
        dispatch(addToCart(id))
    },
    fetch_items: () => {
        dispatch(fetch_items())
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Home)
