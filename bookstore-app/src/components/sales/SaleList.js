import React, {Component} from "react";
import axios from "axios";
import SaleItem from "./SaleItem";

class SaleList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.loadReports();
    }

    loadReports() {
        axios.get("/sales")
            .then(response => {
                const products = response.data;
                const expandProduct = products.length > 0 ? products[0].id : null;
                this.setState({
                    products,
                    expandProduct
                });
            })
            .catch(error => {
                this.setState({
                        error
                    }
                );
                console.log(error);
            });
    };

    Func(car) {
        console.log("Actually nothing.")
    };

    render() {
        let products =
            this.state.products && this.state.products.length > 0 ? (
                this.state.products.map(products => (
                    <SaleItem
                        key={products.id}
                        product={products}
                        Func={this.Func}
                    />
                ))
            ) : (
                <p className="collection-item">There is no sales!</p>
            );
        return (
            <div className="container" style={{backgroundColor: "white"}}>
                <ul className="collection">
                    <div className="collection-item collection-header">
                        <h3>Sales</h3>
                    </div>
                    {products}
                </ul>
            </div>
        );
    }
}

export default SaleList;
