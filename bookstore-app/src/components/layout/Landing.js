import React, {Component} from 'react';
import {connect} from "react-redux";

class Landing extends Component {

    componentDidMount() {
        if (this.props.user.isAuthenticated === false || this.props.user.isAdmin === false) {
            this.props.history.push("/");
        }
    }

    render() {
        return (
            <div style={{height: "75vh"}} className="container valign-wrapper">
                <div className="row">
                    <div className="landing-copy col s12 center-align">
                        <h4>
                            <b>Hey there</b>
                            <p className="flow-text grey-text text-darken-1">
                                You are logged into{" "}
                                <span style={{fontFamily: "monospace"}}>ADMIN panel</span> 👏
                            </p>
                        </h4>
                        <button
                            style={{
                                borderRadius: "3px",
                                margin: "1rem"
                            }}
                            onClick={() => this.props.history.push("/orders")}
                            className="btn btn-large waves-effect waves-light hoverable accent-3"
                        >
                            Orders
                        </button>
                        <button
                            style={{
                                borderRadius: "3px",
                                margin: "1rem"
                            }}
                            onClick={() => this.props.history.push("/form/book")}
                            className="btn btn-large waves-effect waves-light hoverable accent-3"
                        >
                            Add book
                        </button>
                        <button
                            style={{
                                borderRadius: "3px",
                                margin: "1rem"
                            }}
                            onClick={() => this.props.history.push("/form/booktype")}
                            className="btn btn-large waves-effect waves-light hoverable accent-3"
                        >
                            Add book type
                        </button>
                        <button
                            style={{
                                borderRadius: "3px",
                                margin: "1rem"
                            }}
                            onClick={() => this.props.history.push("/form/author")}
                            className="btn btn-large waves-effect waves-light hoverable accent-3"
                        >
                            Add author
                        </button>
                        <button
                            style={{
                                borderRadius: "3px",
                                margin: "1rem"
                            }}
                            onClick={() => this.props.history.push("/form/publishingHouse")}
                            className="btn btn-large waves-effect waves-light hoverable accent-3"
                        >
                            Add publishing house
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(Landing);
