import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { getFunName } from '../helpers';

const StorePicker = ({ history }) => {
  const storeInput = useRef(getFunName());

  const goToStore = e => {
    e.preventDefault();
    // first grab the text from the input box
    const storeId = storeInput.current.value;
    // second transition from / to /store/:storeId
    return history.push(`/store/${storeId}`);
  };

  return (
    <form className="store-selector" onSubmit={e => goToStore(e)}>
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
