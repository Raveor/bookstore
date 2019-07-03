import React, {Component} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";


class BookForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {
                title: "",
                description: "",
                price: "",
                publishYear: "",
                publishingHouse: "0",
                bookType: "0",
                author: "0"
            },
            errors: {
                title: "",
                name: "",
                description: "",
                price: "",
                publishYear: "",
                publishingHouse: "",
                bookType: "",
                author: ""
            },
            loading: true
        };
    }

    validateForm = (errors) => {
        let valid = true;
        Object.values(errors).forEach(
            (val) => val.length > 0 && (valid = false)
        );
        return valid;
    };

    componentDidMount() {
        axios.all([
            axios.get('/api/publishinghouse'),
            axios.get('/api/booktype'),
            axios.get('/api/author')
        ])
            .then(axios.spread((house, bookType, author) => {
                this.setState({
                    ...this.state,
                    publishingHouse: house.data,
                    bookType: bookType.data,
                    author: author.data,
                    loading: false
                })
            }))
            .catch(error => console.log(error));
    }


    handleChange = e => {
        e.preventDefault();
        const {name, value} = e.target;
        let errors = this.state.errors;
        console.log(name);
        console.log(value);
        console.log(value.constructor);

        switch (name) {
            case 'title':
                errors.title =
                    value.length < 5
                        ? 'Title must be at lest 5 characters long!'
                        : '';
                break;
            case 'description':
                errors.description =
                    value.length < 1
                        ? 'Description must not be empty!'
                        : '';
                break;
            case 'price':
                errors.price =
                    (value !== "") && (!/^[0-9]+$/.test(value))
                        ? 'Price must be not empty number!'
                        : '';
                break;
            case 'publishYear':
                if (value !== 0) {
                    if ((value !== "") && (!/^[0-9]+$/.test(value))) {
                        errors.publishYear = "Year must be number";
                        break;
                    }
                    if (value.length !== 4) {
                        errors.publishYear = "Year must have 4 numbers";
                        break;
                    }
                    if((value > new Date().getFullYear())){
                        errors.publishYear = "Year must not be greater than current year";
                        break;
                    }
                    errors.publishYear = "";
                }
                break;
            case 'publishingHouse':
                errors.publishingHouse =
                    parseInt(value) === 0
                        ? 'Publishing House must not be empty!'
                        : '';
                break;
            case 'bookType':
                errors.bookType =
                    parseInt(value) === 0
                        ? 'Book type must not be empty!'
                        : '';
                break;
            case 'author':
                errors.author =
                    parseInt(value) === 0
                        ? 'Author must not be empty!'
                        : '';
                break;
            default:
                break;
        }
        console.log(errors);

        this.setState({
            errors,
            ...this.state,
            data: {
                ...this.state.data,
                [name]: value
            },
        });
        console.log(this.state);
    };

    handleSubmit = e => {
        e.preventDefault();
        if (this.validateForm(this.state.errors)) {
            axios
                .post('/api/book', this.state.data)
                .then(() => {
                    this.setState({
                        data: {
                            title: "",
                            description: "",
                            price: "",
                            publishYear: "",
                            publishingHouse: "0",
                            bookType: "0",
                            author: "0"
                        },
                        errors: {
                            title: "",
                            name: "",
                            description: "",
                            price: "",
                            publishYear: "",
                            publishingHouse: "",
                            bookType: "",
                            author: "",
                            message: "New book was saved!",
                        },
                    });
                })
                .catch(errors => {
                    this.setState({
                            ...this.state,
                            errors: {
                                ...this.state.errors,
                                message: errors.message
                            }
                        }
                    );
                });

        }
    };

    render() {

        if (this.state.loading) {
            return (
                <div className="preloader-wrapper big active">
                    <div className="spinner-layer spinner-blue-only">
                        <div className="circle-clipper left">
                            <div className="circle"/>
                        </div>
                        <div className="gap-patch">
                            <div className="circle"/>
                        </div>
                        <div className="circle-clipper right">
                            <div className="circle"/>
                        </div>
                    </div>
                </div>
            )
        }

        const {errors} = this.state;

        let selectAuthor = <select name="author" defaultValue="0" className="col s6 browser-default"
                             onChange={this.handleChange}>
            <option value="0">Choose author</option>
            {this.state.author
                .map((author) => <option key={author._id} name="author" id="author"
                                         value={author._id}>{author.name + " " + author.surname}</option>)}
        </select>;

        let selectBookType = <select name="bookType" defaultValue="0" className="col s6 browser-default"
                             onChange={this.handleChange}>
            <option value="0">Choose book type</option>
            {this.state.bookType
                .map((bookType) => <option key={bookType._id} name="bookType" id="bookType"
                                         value={bookType._id}>{bookType.name}</option>)}
        </select>;

        let selectHouse = <select name="publishingHouse" defaultValue="0" className="col s6 browser-default"
                             onChange={this.handleChange}>
            <option value="0">Choose Publishing House</option>
            {this.state.publishingHouse
                .map((publishingHouse) => <option key={publishingHouse._id} name="publishingHouse" id="publishingHouse"
                                         value={publishingHouse._id}>{publishingHouse.name}</option>)}
        </select>;

        return (
            <div className="container row">
                <div className="container">
                    <div style={{marginTop: "4rem"}} className="row">
                        <div className="col s8 offset-s2">
                            <Link to="/admin" className="btn-flat waves-effect">
                                <i className="material-icons left">keyboard_backspace</i> Back to
                                admin panel
                            </Link>
                            <div className="col s12" style={{paddingLeft: "11.250px"}}>
                                <h4>
                                    New book:
                                </h4>
                            </div>
                            <div className="input-field col s12">
                <span className="red-text">
                  {(!(Object.entries(errors).length === 0 && errors.constructor === Object)) ? errors.message : " "}
                </span>
                            </div>
                            <form onSubmit={this.handleSubmit}>
                                <div className="input-field col s12">
                                    <input id="title" name="title" type="text"
                                           className={errors.title.length > 0 ? 'invalid' : ''}
                                           onChange={this.handleChange}/>
                                    <label htmlFor="title">Title</label>
                                    {errors.title.length > 0 &&
                                    <span className="helper-text" data-error={errors.title}> </span>}
                                </div>
                                <div className="input-field col s12">
                                    <input id="description" name="description" type="text"
                                           className={errors.description.length > 0 ? 'invalid' : ''}
                                           onChange={this.handleChange}/>
                                    <label htmlFor="description">Description</label>
                                    {errors.description.length > 0 &&
                                    <span className="helper-text" data-error={errors.description}> </span>}
                                </div>
                                <div className="input-field col s12">
                                    <input id="price" name="price" type="text"
                                           className={errors.price.length > 0 ? 'invalid' : ''}
                                           onChange={this.handleChange}/>
                                    <label htmlFor="price">Price</label>
                                    {errors.price.length > 0 &&
                                    <span className="helper-text" data-error={errors.price}> </span>}
                                </div>
                                <div className="input-field select-year col s12">
                                    <input id="publishYear" name="publishYear" type="text"
                                           className={errors.publishYear.length > 0 ? 'invalid' : ''}
                                           onChange={this.handleChange}/>
                                    <label htmlFor="publishYear">Publish year</label>
                                    {errors.publishYear.length > 0 &&
                                    <span className="helper-text" data-error={errors.publishYear}> </span>}
                                </div>

                                <div className=" col s12">
                                        {selectAuthor}
                                        {errors.author.length > 0 &&
                                        <span className="helper-text col s12 red-text">{errors.author} </span>}
                                </div>
                                <div className=" col s12">
                                        {selectBookType}
                                        {errors.bookType.length > 0 &&
                                        <span className="helper-text col s12 red-text"> {errors.bookType}</span>}
                                </div>
                                <div className=" col s12">
                                        {selectHouse}
                                        {errors.publishingHouse.length > 0 &&
                                        <span className="helper-text col s12 red-text">{errors.publishingHouse}</span>}
                                </div>

                                <div className="col s12" style={{paddingLeft: "11.250px"}}>
                                    <button
                                        style={{
                                            width: "150px",
                                            borderRadius: "3px",
                                            letterSpacing: "1.5px",
                                            marginTop: "1rem"
                                        }}
                                        type="submit"
                                        className="btn btn-large waves-effect waves-light hoverable red accent-3"
                                    >
                                        Submit
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default BookForm;

