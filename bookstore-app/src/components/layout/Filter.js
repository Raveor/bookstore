import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { updateFilters } from '../../actions/itemsActions';
import Checkbox from './Checkbox';

const availableSizes = ['XS', 'S', 'M', 'ML', 'L', 'XL', 'XXL'];

class Filter extends Component {
    static propTypes = {
        updateFilters: PropTypes.func.isRequired,
        filters: PropTypes.array
    };

    componentDidMount() {
        this.selectedCheckboxes = new Set();
    }

    toggleCheckbox = label => {
        if (this.selectedCheckboxes.has(label)) {
            this.selectedCheckboxes.delete(label);
        } else {
            this.selectedCheckboxes.add(label);
        }

        this.props.updateFilters(Array.from(this.selectedCheckboxes));
    };

    createCheckbox = label => (
        <Checkbox
            classes="filters-available-size"
            label={label}
            handleCheckboxChange={this.toggleCheckbox}
            key={label}
        />
    );

    createCheckboxes = () => availableSizes.map(this.createCheckbox);

    render() {
        return (
            <div className="filters">
                <h4 className="title">Sizes:</h4>
                {this.createCheckboxes()}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    filters: state.filters
});

export default connect(
    mapStateToProps,
    { updateFilters }
)(Filter);
