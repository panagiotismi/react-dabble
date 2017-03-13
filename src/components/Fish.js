import React from 'react';
import { formatPrice } from '../helpers';

class Fish extends React.Component {
  render() {
    const { details } = this.props;
    return (
      <li className="menu-fish">
        <img src={details.image} alt={details.name} />
        <h3 className="fish-name">
          {details.name}
          <span className="price">{formatPrice(details.price)}</span>
        </h3>
        <p>{details.desc}</p>
        <button>Add To Order</button>
      </li>
    );
  }
}

Fish.propTypes = {
  details: React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    desc: React.PropTypes.string,
    image: React.PropTypes.string.isRequired,
    price: React.PropTypes.number.isRequired,
    status: React.PropTypes.string.isRequired,
  }).isRequired
};

export default Fish;
