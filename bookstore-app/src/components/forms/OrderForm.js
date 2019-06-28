import React, {Component} from 'react';
import axios from "axios";


class OrderForm extends Component {


    // order_id,
    // sku,
    // name,
    // description,
    // quantity,
    // price,
    // subtotal

    constructor(props) {
        super(props);
        this.state = {
            data: {
                sku: "",
                name: "",
                description: "",
                subtotal: "",
                quantity: "",
                price: "",
                order_id: ""
            },
            errors: {
                sku: "",
                name: "",
                description: "",
                subtotal: "",
                quantity: "",
                price: "",
                order_id: ""
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
        axios.get("/sales")
            .then(response => {
                const sales = response.data;
                this.setState({
                    ...this.state,
                    sales: sales
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
        const {name} = e.target;
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        let errors = this.state.errors;
        switch (name) {
            case 'sku':
                errors.sku =
                    value.length < 5
                        ? 'Full Name must be 5 characters long!'
                        : '';
                break;
            case 'name':
                errors.name =
                    value.length < 1
                        ? 'Name must not be empty!'
                        : '';
                break;
            case 'description':
                errors.description =
                    value.length < 1
                        ? 'Description must not be empty!'
                        : '';
                break;
            case 'subtotal':
                errors.subtotal =
                    value.length < 1
                        ? 'Regular_price must not be empty!'
                        : '';
                break;
            case 'quantity':
                errors.quantity =
                    value.length < 1
                        ? 'Quantity must not be empty!'
                        : '';
                break;
            case 'price':
                errors.quantity =
                    value.length < 1
                        ? 'Quantity must not be empty!'
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
                .post('/orders', this.state.data)
                .then(() => {
                    this.setState({
                        data: {
                            sku: "",
                            name: "",
                            description: "",
                            subtotal: "",
                            quantity: "",
                            price: ""
                        },
                        errors: {
                            sku: "",
                            name: "",
                            description: "",
                            subtotal: "",
                            quantity: "",
                            price: ""
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

        let select = <select name="order_id" defaultValue="0" className="col s6 browser-default" onChange={this.handleChange}><option value="0">Choose sale id</option>{this.state.sales.map((category) => <option key={category.id} name="order_id" id="order_id" value={category.id}>{category.id}</option>)}</select>;
        return (
            <div className="container row">
                <form className="col s12" onSubmit={this.handleSubmit}>
                    <div className="input-field col s6">
                        <input id="sku" name="sku" type="text" className={errors.sku.length > 0 ? 'invalid' : ''}
                               onChange={this.handleChange}/>
                        <label className="active" htmlFor="sku">Sku</label>
                        <span className="helper-text" data-error={errors.sku}/>
                    </div>
                    <div className="input-field col s6">
                        <input id="name" name="name" type="text" className={errors.name.length > 0 ? 'invalid' : ''}
                               onChange={this.handleChange}/>
                        <label className="active" htmlFor="name">Name</label>
                        <span className="helper-text" data-error={errors.name}/>
                    </div>
                    <div className="input-field col s6">
                        <input id="description" name="description" type="text" className={errors.description.length > 0 ? 'invalid' : ''}
                               onChange={this.handleChange}/>
                        <label className="active" htmlFor="description">Description</label>
                        <span className="helper-text" data-error={errors.description}/>
                    </div>
                    <div className="input-field col s6">
                        <input id="subtotal" name="subtotal" type="text" className={errors.subtotal.length > 0 ? 'invalid' : ''}
                               onChange={this.handleChange}/>
                        <label className="active" htmlFor="subtotal">Subtotal</label>
                        <span className="helper-text" data-error={errors.subtotal}/>
                    </div>
                    <div className="input-field col s6">
                        <input id="quantity" name="quantity" type="text" className={errors.quantity.length > 0 ? 'invalid' : ''}
                               onChange={this.handleChange}/>
                        <label className="active" htmlFor="quantity">Quantity</label>
                        <span className="helper-text" data-error={errors.quantity}/>
                    </div>
                    <div className="input-field col s6">
                        <input id="price" name="price" type="text" className={errors.price.length > 0 ? 'invalid' : ''}
                               onChange={this.handleChange}/>
                        <label className="active" htmlFor="price">Price</label>
                        <span className="helper-text" data-error={errors.price}/>
                    </div>
                    <div className="input-field col s6" >
                        <label>Materialize Select
                            {select}
                            <span className="helper-text" data-error={errors.order_id}/>
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

export default OrderForm;

