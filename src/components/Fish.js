import React from 'react';
import { formatPrice } from '../helpers';

class Fish extends React.Component {
  render() {
    const { details, index } = this.props;
    const isAvailable = details.status === 'available';
    const buttonText = isAvailable ? 'Add To Order' : 'Sold Out!';
    return (
      <li className="menu-fish">
        <img src={details.image} alt={details.name} />
        <h3 className="fish-name">
          {details.name}
          <span className="price">
            {formatPrice(details.price)}
          </span>
        </h3>
        <p>{details.desc}</p>
        <button
          disabled={!isAvailable}
          onClick={() => this.props.addToOrder(index)}
        >
          {buttonText}
        </button>
      </li>
    );
  }
}

Fish.propTypes = {
  details: React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    desc: React.PropTypes.string.isRequired,
    image: React.PropTypes.string.isRequired,
    price: React.PropTypes.oneOfType([
      React.PropTypes.string.isRequired,
      React.PropTypes.number.isRequired,
    ]).isRequired,
    status: React.PropTypes.string.isRequired,
  }).isRequired,
  addToOrder: React.PropTypes.func.isRequired,
  index: React.PropTypes.string.isRequired,
};

export default Fish;
