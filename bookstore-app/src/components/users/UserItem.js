import React, {Component} from "react";
import PropTypes from "prop-types";

class UserItem extends Component {
    constructor(props) {
        super(props);
        this.state = {role: {}};
    }

    render() {
        let user = this.props.user;

        return this.props.expanded ? (
            <li className="collection-item">
                <span
                    className="title"
                    onClick={() => this.props.expandFunc(null)}
                >
                    <h4>{user.name}</h4>
                    <div className="secondary-content">
                        <button
                            className="waves-effect waves-light btn-small"
                            onClick={() => this.props.Func(user.id)}
                        >
                        Delete<i className="material-icons right">send</i>
                    </button>
                        </div>
                </span>
                <p>{user.email}</p>
                <p>
                    {user.active}
                </p>
                {/*<i className="grey-text">{category.name}</i>*/}

            </li>
        ) : (
            <a
                href="#!"
                className="collection-item"
                onClick={() => this.props.expandFunc(user.id)}
            >
                <li>
                    {user.name}
                    <div className="secondary-content mr-10">
                        <button
                            className="waves-effect waves-light btn-small  mr-10"
                            onClick={() => this.props.Func(user.id)}
                        >
                            Delete<i className="material-icons right">send</i>
                        </button>
                    </div>
                </li>
            </a>
        );
    };


}

UserItem.propTypes = {
    expanded: PropTypes.bool,
    user: PropTypes.object.isRequired,
    Func: PropTypes.func.isRequired,
    expandFunc: PropTypes.func.isRequired
};

export default UserItem;