import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {connect} from "react-redux";
import {logoutUser} from "../../actions/authActions";

class Navbar extends Component {

    render() {
        let icons =
            this.props.user.isAuthenticated ?
                <React.Fragment>
                <li><a onClick={this.props.logoutUser}>Log out</a></li>
                <li><Link to="/user/orders"><i className="material-icons">assignment_ind</i></Link></li>
                </React.Fragment>
                :
                <li><Link to="/authenticate/local">Log in with email</Link></li>;

        let admin = !this.props.user.isAdmin ? "" :
            <li><Link to="/admin"><i className="material-icons">info</i></Link></li>;

        return (
            <nav>
                <div className="nav-wrapper">
                    <Link to="/" className="brand-logo center"><i className="material-icons">cloud</i>Logo</Link>
                    <ul className="right hide-on-med-and-down">
                        {icons}
                        <li><Link to="/cart"><i className="material-icons">shopping_cart</i></Link></li>
                        {admin}
                    </ul>
                </div>
            </nav>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
};
const mapDispatchToProps = (dispatch) => ({
    logoutUser: () => {
        dispatch(logoutUser())
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
