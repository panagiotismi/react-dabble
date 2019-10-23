import React from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from '../helpers';

const Fish = ({
  fish: { name, image, price, desc, status },
  index,
  addToOrder,
}) => {
  const isAvailable = status === 'available';
  const buttonText = isAvailable ? 'Add To Order' : 'Sold Out!';
  return (
    <li className="menu-fish">
      <img src={image} alt={name} />
      <h3 className="fish-name">
        {name}
        <span className="price">{formatPrice(price)}</span>
      </h3>
      <p>{desc}</p>
      <button
        type="button"
        disabled={!isAvailable}
        onClick={() => addToOrder(index)}
      >
        {buttonText}
      </button>
    </li>
  );
};

Fish.propTypes = {
  fish: PropTypes.shape({
    name: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
  addToOrder: PropTypes.func.isRequired,
  index: PropTypes.string.isRequired,
};

export default Fish;
