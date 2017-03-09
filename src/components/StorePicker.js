import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
  goToStore(e) {
    // first grab the text from the input box
    e.preventDefault();
    const storeId = this.storeInput.value;
    return this.props.history.push(`/store/${storeId}`);
    // second transition from / to /store/:storeId
  }

  render() {
    console.log(this);
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

export default StorePicker;
