import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {FaFacebookF, FaGoogle} from 'react-icons/fa';
import {setUser, getUser} from "../../actions/userActions";
import axios from 'axios';
import {connect} from "react-redux";

class Navbar extends Component {
    render() {
        let icons = this.props.user.isAuthenticated ? "" : <React.Fragment>
            <li><a href="http://localhost:9000/authenticate/facebook"><FaFacebookF/></a></li>
            <li><a href="http://localhost:9000/authenticate/google"><FaGoogle/></a></li>
        </React.Fragment>;

        let admin = !this.props.user.isAdmin ? "" : <li><Link to="/admin"><i className="material-icons">info</i></Link></li>;



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
    getUser: () => {
        dispatch(getUser())
    },
    setUser: () => {
        dispatch(setUser())
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)

