import React, {Component} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";

class AuthorForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {
                name: "",
                surname: ""
            },
            errors: {
                name: "",
                surname: ""
            }
        };
    }

    validateForm = (errors) => {
        let valid = true;
        Object.values(errors).forEach(
            (val) => val.length > 0 && (valid = false)
        );
        return valid;
    };


    handleChange = e => {
        e.preventDefault();
        const {name, value} = e.target;
        let errors = this.state.errors;

        if (name === 'name') {
            errors.name =
                value.length < 2
                    ? "Name must be at least 2 characters long!"
                    : '';
        } else if (name === 'surname') {
            errors.surname =
                value.length < 2
                    ? "Surname must be at least 2 characters long!"
                    : '';
        }

        this.setState({
            errors,
            data: {
                ...this.state.data,
                [name]: value
            }
        });
    };



    handleSubmit = e => {
        e.preventDefault();
        if (this.validateForm(this.state.errors)) {
            axios
                .post('/api/author', this.state.data )
                .then(() => {
                    this.setState({
                        data: {
                            name: "",
                            surname: ""
                        },
                        errors: {
                            message: "New author was saved",
                            name: "",
                            surname: ""
                        }
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
        const {errors} = this.state;

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
                                    New author:
                                </h4>
                            </div>
                            <div className="input-field col s12">
                <span className="red-text">
                  {(!(Object.entries(errors).length === 0 && errors.constructor === Object)) ? errors.message : " "}
                </span>
                            </div>

                            <form onSubmit={this.handleSubmit}>
                                <div className="input-field col s12">
                                    <input id="name" name="name" type="text" className={errors.name.length > 0 ? 'invalid' : ''}
                                           onChange={this.handleChange}/>
                                    {errors.name.length > 0 &&
                                    <span className="helper-text" data-error={errors.name}/>}
                                    <label htmlFor="name">Name</label>
                                </div>
                                <div className="input-field col s12">
                                    <input id="surname" name="surname" type="text" className={errors.surname.length > 0 ? 'invalid' : ''}
                                           onChange={this.handleChange}/>
                                    {errors.surname.length > 0 &&
                                    <span className="helper-text" data-error={errors.surname}/>}
                                    <label htmlFor="surname">Surname</label>
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

export default AuthorForm;

