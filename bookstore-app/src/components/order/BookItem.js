import React, {Component} from 'react';
import PropTypes from 'prop-types';

class BookItem extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {
        let book = this.props.book;
        return (
            <li className="collection-item" style={{display: "list-item"}}>
                <h5>{book.bookId.title}</h5>
                <div className="secondary-content">
                    <span>Amount: {book.quantity}</span><br/>
                    <span>Price for one: {book.price}</span>
                </div>
                <p>
                    {book.bookId.author.name + " " + book.bookId.author.surname}
                </p>
            </li>
        );
    }

}

BookItem.propTypes = {
    book: PropTypes.object.isRequired
};

export default BookItem;
