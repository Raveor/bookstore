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
                <Link to="/orders">orders</Link>{' '}
                <Link to="/form/booktype">Booktype form</Link>{' '}
                <Link to="/form/author">Author form</Link>{' '}
                <Link to="/form/publishinghouse">PublishingHouse form</Link>{' '}
                <Link to="/form/book">Book form</Link>{' '}
            </div>
        );
    }
}


const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(Landing);
