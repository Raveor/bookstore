import {Link} from "react-router-dom";
import React, {Component} from 'react';
import {connect} from "react-redux";

class Landing extends Component {

    componentDidMount() {
        if(this.props.user.isAuthenticated === false || this.props.user.isAdmin === false){
            this.props.history.push("/");
        }
    }

    render() {
        return (
            <div>
                <Link to="/">Home</Link>{' '}
                <Link to="/users">users</Link>{' '}
                <Link to="/orders">orders</Link>{' '}
                <Link to="/sales">sales</Link>{' '}
                <Link to="/categories">categories</Link>{' '}
                <Link to="/users/form">users form</Link>{' '}
                <Link to="/orders/form">orders form</Link>{' '}
                <Link to="/sales/form">sales form</Link>{' '}
                <Link to="/categories/form">categories form</Link>{' '}
            </div>
        );
    }
}


const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(Landing);
