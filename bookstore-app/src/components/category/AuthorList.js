import React, {Component} from "react";
import axios from "axios";
import BookTypeItem from "./BookTypeItem";

class AuthorList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.loadReports();
    }

    loadReports() {

        axios.get("/categories")
            .then(response => {
                const categories = response.data;
                this.setState({
                    categories
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

    render() {
        let categories =
            this.state.categories && this.state.categories.length > 0 ? (
                this.state.categories.map(category => (
                    <BookTypeItem
                        key={category.id}
                        category={category}
                        Func={this.Func}
                    />
                ))
            ) : (
                <p className="collection-item">There is no category!</p>
            );
        return (
            <div className="container" style={{backgroundColor: "white"}}>
                <ul className="collection">
                    <div className="collection-item collection-header">
                        <h3>Categories</h3>
                    </div>
                    {categories}
                </ul>
            </div>
        );
    }
}

export default AuthorList;
