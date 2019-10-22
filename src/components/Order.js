import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
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
    const count = order[key];
    const removeButton = (
      <button type="button" onClick={() => removeFromOrder(key)}>
        <i className="fa fa-times fa-lg" />
      </button>
    );
    const isAvailable = fish && fish.status === 'available';
    return isAvailable ? (
      <li key={key}>
        {count} kgs of {fish.name} {removeButton}
        <span className="price">{formatPrice(count * fish.price)}</span>
      </li>
    ) : (
      <li key={key}>
        Sorry, {fish ? fish.name : 'fish'} is no longer available!{' '}
        {removeButton}
      </li>
    );
  };

  return (
    <div className="order-wrap">
      <h2>Your Order</h2>
      <ul className="order">{orderIds.map(renderOrder)}</ul>
      <div className="total">
        Total: &nbsp;
        <strong>{formatPrice(total)}</strong>
      </div>
    </div>
  );
};

// class Order extends React.Component {
//   constructor() {
//     super();

//     this.renderOrder = this.renderOrder.bind(this);
//   }

//   renderOrder(key) {
//     const fish = this.props.fishes[key];
//     const count = this.props.order[key];
//     const isAvailable = fish && fish.status === 'available';
//     const removeButton = (
//       <button type="button" onClick={() => this.props.removeFromOrder(key)}>
//         <i className="fa fa-times fa-lg" />
//       </button>
//     );
//     return isAvailable ? (
//       <li key={key}>
//         <span>
//           <CSSTransition
//             component="span"
//             className="count"
//             transitionName="count"
//             transitionEnterTimeout={250}
//             transitionLeaveTimeout={250}
//           >
//             <span key={count}>{count}</span>
//           </CSSTransition>
//           kgs of {fish.name} {removeButton}
//         </span>
//         <span className="price">{formatPrice(count * fish.price)}</span>
//       </li>
//     ) : (
//       <li key={key}>
//         Sorry, {fish ? fish.name : 'fish'} is no longer available!
//         {removeButton}
//       </li>
//     );
//   }

//   render() {
//     const orderIds = Object.keys(this.props.order);
//     const total = orderIds.reduce((prevTotal, key) => {
//       const fish = this.props.fishes[key];
//       const count = this.props.order[key];
//       const isAvailable = fish && fish.status === 'available';
//       return isAvailable ? prevTotal + (count * fish.price || 0) : prevTotal;
//     }, 0);
//     return (
//       <div className="order-wrap">
//         <h2>Your Order</h2>
//         <CSSTransition
//           component="ul"
//           className="order"
//           transitionName="order"
//           transitionEnterTimeout={500}
//           transitionLeaveTimeout={500}
//         >
//           {orderIds.map(this.renderOrder)}
//           <li className="total">
//             <strong>Total:</strong>
//             {formatPrice(total)}
//           </li>
//         </CSSTransition>
//       </div>
//     );
//   }
// }

Order.propTypes = {
  fishes: PropTypes.objectOf(PropTypes.object).isRequired,
  order: PropTypes.objectOf(PropTypes.number).isRequired,
  removeFromOrder: PropTypes.func.isRequired,
};

export default Order;
