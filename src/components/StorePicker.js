import React from 'react';

class StorePicker extends React.Component {
  render() {
    return (
      <form className="store-selector">
        <h2>Please Enter A Store</h2>
        <input type="text" required placeholder="Store Name" />
        <button type="submit">
          Visit Store <i className="fa fa-arrow-right" />
        </button>
      </form>
    );
  }
}

export default StorePicker;