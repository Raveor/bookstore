import React, {Component} from 'react';
import {fetch_categories} from "../../actions/filterActions";
import {connect} from 'react-redux';
import Checkbox from './Checkbox';
import {update_filters} from "../../actions/itemsActions";

class Filter extends Component {

    componentDidMount() {
        this.props.fetch_categories();
        this.selectedCheckboxes = new Set();
    }

    toggleCheckbox = label => {
        if (this.selectedCheckboxes.has(label)) {
            this.selectedCheckboxes.delete(label);
        } else {
            this.selectedCheckboxes.add(label);
        }

        this.props.update_filters(Array.from(this.selectedCheckboxes));
    };

    createCheckbox = label => (
        <Checkbox
            classes="filters-available-size"
            label={label}
            handleCheckboxChange={this.toggleCheckbox}
            key={label}
        />
    );

    createCheckboxesHouse = () => this.props.filter ? this.props.filter.publishingHouse.map( house => (
        <Checkbox
            classes="filters-available-size"
            label={house.name}
            handleCheckboxChange={this.toggleCheckbox}
            key={house.name}
        />
    )) : "";
    createCheckboxesTypes = () => this.props.filter ? this.props.filter.bookTypes.map(bookType => (
        <Checkbox
            classes="filters-available-size"
            label={bookType.name}
            handleCheckboxChange={this.toggleCheckbox}
            key={bookType.name}
        />
    )) : "";

    render() {
        return (
            <div className="filters">
                <h5 className="title">Book types:</h5>
                {this.createCheckboxesTypes()}
                <h5 className="title">Publishing houses:</h5>
                {this.createCheckboxesHouse()}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    filter: state.filter
});

const mapDispatchToProps = (dispatch) => ({
    fetch_categories: () => {
        dispatch(fetch_categories())
    },
    update_filters: (filters) => {
        dispatch(update_filters(filters))
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Filter);
