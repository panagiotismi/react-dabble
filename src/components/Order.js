import React from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
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
    const removeButton = (
      <button onClick={() => this.props.removeFromOrder(key)}>
        <i className="fa fa-times fa-lg" />
      </button>
    );
    return isAvailable ?
      (
        <li key={key}>
          <span>
            <CSSTransitionGroup
              component="span"
              className="count"
              transitionName="count"
              transitionEnterTimeout={250}
              transitionLeaveTimeout={250}
            >
              <span key={count}>{count}</span>
            </CSSTransitionGroup>
            kgs of {fish.name} {removeButton}
          </span>
          <span className="price">{formatPrice(count * fish.price)}</span>
        </li>
      ) : (
        <li key={key}>
          Sorry, {fish ? fish.name : 'fish'} is no longer available!
          {removeButton}
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
        <CSSTransitionGroup
          component="ul"
          className="order"
          transitionName="order"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          {orderIds.map(this.renderOrder)}
          <li className="total">
            <strong>Total:</strong>
            {formatPrice(total)}
          </li>
        </CSSTransitionGroup>
      </div>
    );
  }
}

Order.propTypes = {
  fishes: React.PropTypes.objectOf(React.PropTypes.object).isRequired,
  order: React.PropTypes.objectOf(React.PropTypes.number).isRequired,
  removeFromOrder: React.PropTypes.func.isRequired,
};

export default Order;
