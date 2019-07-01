import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {FaFacebookF, FaGoogle} from 'react-icons/fa';
import {setUser, getUser} from "../../actions/userActions";
import {connect} from "react-redux";

class Authenticate extends Component {

    componentDidMount() {
        this.handleDeleteBlackList()
    }

    async handleDeleteBlackList() {
        await this.props.setUser();
        this.props.history.push("/");

        // No idea what you have set your type: to in your action so I just made this up
    }


render() {

    return (""
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

export default connect(mapStateToProps, mapDispatchToProps)(Authenticate)

