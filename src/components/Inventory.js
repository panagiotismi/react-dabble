import React from 'react';
import AddFishForm from './AddFishForm';

class Inventory extends React.Component {
  constructor() {
    super();
    this.renderInventory = this.renderInventory.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e, key) {
    const fish = this.props.fishes[key];
    const updatedFish = {
      ...fish,
      [e.target.name]: e.target.value
    };
    this.props.updateFish(key, updatedFish);
  }

  renderInventory(key) {
    const fish = this.props.fishes[key];
    return (
      <div className="fish-edit" key={key}>
        <input
          name="name"
          value={fish.name}
          type="text"
          placeholder="Fish Name"
          onChange={e => this.handleChange(e, key)}
        />
        <input
          name="price"
          value={fish.price}
          type="text"
          placeholder="Fish Price"
          onChange={e => this.handleChange(e, key)}
        />
        <select
          name="status"
          value={fish.status}
          placeholder="Fish Status"
          onChange={e => this.handleChange(e, key)}
        >
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out</option>
        </select>
        <textarea
          name="desc"
          value={fish.desc}
          placeholder="Fish Description"
          onChange={e => this.handleChange(e, key)}
        />
        <input
          name="image"
          value={fish.image}
          type="text"
          placeholder="Fish Image"
          onChange={e => this.handleChange(e, key)}
        />
      </div>
    );
  }

  render() {
    return (
      <div>
        <h2>Inventory</h2>
        {
          Object.keys(this.props.fishes)
          .map(this.renderInventory)
        }
        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadSamples}>
          Load Sample Fish
        </button>
      </div>
    );
  }
}

Inventory.propTypes = {
  fishes: React.PropTypes.objectOf(React.PropTypes.object).isRequired,
  addFish: React.PropTypes.func.isRequired,
  loadSamples: React.PropTypes.func.isRequired,
  updateFish: React.PropTypes.func.isRequired,
};

export default Inventory;
