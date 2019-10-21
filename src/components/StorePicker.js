import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { getFunName } from '../helpers';

const StorePicker = ({ history }) => {
  const storeInput = useRef(null);

  const goToStore = e => {
    e.preventDefault();
    // grab the text from the input box and transition to /store/:storeName
    return history.push(`/store/${storeInput.current.value}`);
  };

  return (
    <form className="store-selector" onSubmit={goToStore}>
      <h2>Please Enter A Store</h2>
      <input
        type="text"
        required
        placeholder="Store Name"
        defaultValue={getFunName()}
        ref={storeInput}
      />
      <button type="submit">
        Visit Store <i className="fa fa-arrow-right" />
      </button>
    </form>
  );
};

StorePicker.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default StorePicker;
