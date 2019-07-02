import React, {Component} from 'react';
import PropTypes from 'prop-types';

class BookItem extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {
        let book = this.props.book;
        console.log("inside book");
        return (
            <li>
                    <h5>{book.bookId.title}</h5>
                    <div className="secondary-content">
                        <span>Amount: {book.quantity}</span>
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
