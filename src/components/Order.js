import React from 'react';
import { formatPrice } from '../helpers';

class Order extends React.Component {
  constructor() {
    super();
    this.renderOrder = this.renderOrder.bind(this);
  }

  renderOrder(key) {
    const fish = this.props.fishes[key];
    const count = this.props.order[key];
    const isAvailable = fish && (fish.status === 'available');
    return isAvailable ?
      (
        <li key={key}>
          <span>{count}kgs of {fish.name}</span>
          <span className="price">{formatPrice(count * fish.price)}</span>
        </li>
      ) : (
        <li key={key}>
          Sorry, {fish ? fish.name : 'fish'} is no longer available!
        </li>
      );
  }

  render() {
    const orderIds = Object.keys(this.props.order);
    const total = orderIds.reduce((prevTotal, key) => {
      const fish = this.props.fishes[key];
      const count = this.props.order[key];
      const isAvailable = fish && (fish.status === 'available');
      return isAvailable ?
        prevTotal + (count * fish.price || 0) :
        prevTotal;
    }, 0);
    return (
      <div className="order-wrap">
        <h2>Your Order</h2>
        <ul className="order">
          {orderIds.map(this.renderOrder)}
          <li className="total">
            <strong>Total:</strong>
            {formatPrice(total)}
          </li>
        </ul>
      </div>
    );
  }
}

Order.propTypes = {
  fishes: React.PropTypes.objectOf(React.PropTypes.object).isRequired,
  order: React.PropTypes.objectOf(React.PropTypes.number).isRequired,
};

export default Order;
