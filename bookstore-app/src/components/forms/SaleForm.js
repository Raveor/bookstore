import React, {Component} from 'react';
import axios from "axios";


class SaleForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {
                order_date: Date.now(),
                user_id: "",
                total: "",
            },
            errors: {
                order_date: "",
                user_id: "",
                total: "",
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
    validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);


    componentDidMount() {
        axios.get("/users")
            .then(response => {
                const users = response.data;
                this.setState({
                    ...this.state,
                    users: users
                });
                this.setState({
                    ...this.state,
                    loading: false
                })
            })
            .catch(error => {
                console.log(error);
            });
    }


    handleChange = e => {
        if(e.target.type !== 'checkbox'){
            e.preventDefault();
        }
        console.log(this.state);
        const {name} = e.target;
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        let errors = this.state.errors;
        switch (name) {
            case 'total':
                errors.total =
                    value.length < 1
                        ? 'Regular_price must not be empty!'
                        : '';
                break;
            case 'user_id':
                errors.user_id =
                    value === 0
                        ? 'Taxable must not be empty!'
                        : '';
                break;
            default:
                break;
        }

        this.setState({
            errors,
            ...this.state,
            data: {
                ...this.state.data,
                [name]: value
            },
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        console.log(this.state.data);
        if (this.validateForm(this.state.errors)) {
            axios
                .post('/sales', this.state.data)
                .then(() => {
                    this.setState({
                        data: {
                            order_date: Date.now(),
                            user_id: "",
                            total: "",
                        },
                        errors: {
                            order_date: "",
                            user_id: "",
                            total: "",
                        },
                    });
                })
                .catch(postError => {
                    this.setState({
                            ...this.state,
                            postError
                        }
                    );
                    console.log(postError);
                });

        }
    };

    render() {

        if (this.state.loading) {
            return (
                <div className="preloader-wrapper big active">
                    <div className="spinner-layer spinner-blue-only">
                        <div className="circle-clipper left">
                            <div className="circle"></div>
                        </div>
                        <div className="gap-patch">
                            <div className="circle"></div>
                        </div>
                        <div className="circle-clipper right">
                            <div className="circle"></div>
                        </div>
                    </div>
                </div>
            )
        }

        const {errors} = this.state;

        let select = <select name="user_id" defaultValue="0" className="col s6 browser-default" onChange={this.handleChange}><option value="0">Choose role</option>{this.state.users.map((user) => <option key={user.id} name="user_id" id="user_id" value={user.id}>{user.email}</option>)}</select>;
        return (
            <div className="container row">
                <form className="col s12" onSubmit={this.handleSubmit}>
                    <div className="input-field col s6">
                        <input id="total" name="total" type="text" className={errors.total.length > 0 ? 'invalid' : ''}
                               onChange={this.handleChange}/>
                        <label className="active" htmlFor="total">Total value</label>
                        <span className="helper-text" data-error={errors.total}> </span>
                    </div>
                    <div className="input-field col s6" >
                        <label>Select user
                            {select}
                            <span className="helper-text" data-error={errors.taxable}> </span>
                        </label>
                    </div>

                    <div className="row center">
                        <button
                            className="center waves-effect waves-light btn-small"
                            type="submit"
                        >
                            Save<i className="material-icons right">send</i>
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default SaleForm;

