import React from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { formatPrice } from '../helpers';

const Order = ({ fishes, order, removeFromOrder }) => {
  const orderIds = Object.keys(order);
  const total = orderIds.reduce((prevTotal, key) => {
    const fish = fishes[key];
    const count = order[key];
    const isAvailable = fish && fish.status === 'available';
    return isAvailable ? prevTotal + (count * fish.price || 0) : prevTotal;
  }, 0);

  const renderOrder = key => {
    const fish = fishes[key];
    if (!fish) {
      return null;
    }
    const count = order[key];
    const isAvailable = fish && fish.status === 'available';
    const removeButton = (
      <button type="button" onClick={() => removeFromOrder(key)}>
        &times;
      </button>
    );
    return (
      <CSSTransition
        classNames="order"
        key={key}
        timeout={{ enter: 500, exit: 500 }}
      >
        {isAvailable ? (
          <li key={key}>
            <span>
              <TransitionGroup component="span" className="count">
                <CSSTransition
                  classNames="count"
                  key={count}
                  timeout={{ enter: 500, exit: 500 }}
                >
                  <span>{count}</span>
                </CSSTransition>
              </TransitionGroup>
              kgs of {fish.name}
              <span className="price">
                &nbsp;{formatPrice(count * fish.price)}&nbsp;
              </span>
              {removeButton}
            </span>
          </li>
        ) : (
          <li key={key}>
            Sorry, {fish ? fish.name : 'fish'} is no longer available!{' '}
            {removeButton}
          </li>
        )}
      </CSSTransition>
    );
  };

  return (
    <div className="order-wrap">
      <h2>Your Order</h2>
      <TransitionGroup component="ul" className="order">
        {orderIds.map(renderOrder)}
      </TransitionGroup>
      <div className="total">
        Total:
        <strong>&nbsp;{formatPrice(total)}</strong>
      </div>
    </div>
  );
};

Order.propTypes = {
  fishes: PropTypes.objectOf(PropTypes.object).isRequired,
  order: PropTypes.objectOf(PropTypes.number).isRequired,
  removeFromOrder: PropTypes.func.isRequired,
};

export default Order;
