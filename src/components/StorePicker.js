import React from 'react';
import PropTypes from 'prop-types';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
  goToStore(e) {
    e.preventDefault();
    // first grab the text from the input box
    const storeId = this.storeInput.value;
    // second transition from / to /store/:storeId
    return this.props.history.push(`/store/${storeId}`);
  }

  render() {
    return (
      <form className="store-selector" onSubmit={e => this.goToStore(e)}>
        <h2>Please Enter A Store</h2>
        <input
          type="text"
          required
          placeholder="Store Name"
          defaultValue={getFunName()}
          ref={input => (this.storeInput = input)}
        />
        <button type="submit">
          Visit Store <i className="fa fa-arrow-right" />
        </button>
      </form>
    );
  }
}

StorePicker.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default StorePicker;
