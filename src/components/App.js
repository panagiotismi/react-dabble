import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';
import base from '../base';

class App extends React.Component {
  constructor() {
    super();
    this.addFish = this.addFish.bind(this);
    this.updateFish = this.updateFish.bind(this);
    this.removeFish = this.removeFish.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.addToOrder = this.addToOrder.bind(this);
    this.removeFromOrder = this.removeFromOrder.bind(this);
    // Initial state
    this.state = {
      fishes: {},
      order: {},
    };
  }

  componentWillMount() {
    this.ref = base.syncState(
      `${this.props.match.params.storeId}/fishes`,
      {
        context: this,
        state: 'fishes',
      }
    );
    // DO THIS WITH FUNCTIONAL setState
    // check if there is any order in localStorage
    const localStorageRef = localStorage.getItem(
      `order-${this.props.match.params.storeId}`
    );
    if (localStorageRef) {
      // update App's order state
      this.setState({ order: JSON.parse(localStorageRef) });
    }
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem(
      `order-${this.props.match.params.storeId}`,
      JSON.stringify(nextState.order)
    );
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  // DO THIS WITH FUNCTIONAL setState
  addFish(fish) {
    const fishes = { ...this.state.fishes };
    const timestamp = Date.now();
    fishes[`fish-${timestamp}`] = fish;
    this.setState({ fishes });
  }

  // DO THIS WITH FUNCTIONAL setState
  updateFish(key, updatedFish) {
    const fishes = { ...this.state.fishes };
    fishes[key] = updatedFish;
    this.setState({ fishes });
  }

  // DO THIS WITH FUNCTIONAL setState
  removeFish(key) {
    const fishes = { ...this.state.fishes };
    // fisher state is kept in Firebase, so "delete obj[key]" doesn't work
    fishes[key] = null;
    this.setState({ fishes });
  }

  loadSamples() {
    this.setState({ fishes: sampleFishes });
  }

  addToOrder(key) {
    // take a copy of the state
    const order = { ...this.state.order };
    // update or add the new number of fish ordered
    order[key] = order[key] + 1 || 1;
    // update the state
    this.setState({ order });
  }

  removeFromOrder(key) {
    const order = { ...this.state.order };
    // order state is kept in localStorage instead of Firebase,
    // so "delete obj[key]" works
    delete order[key];
    this.setState({ order });
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="list-of-fishes">
            {
              Object.keys(this.state.fishes)
              .map(key =>
                <Fish
                  key={key}
                  index={key}
                  details={this.state.fishes[key]}
                  addToOrder={this.addToOrder}
                />
              )
            }
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          params={this.props.match.params}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          fishes={this.state.fishes}
          addFish={this.addFish}
          loadSamples={this.loadSamples}
          updateFish={this.updateFish}
          removeFish={this.removeFish}
        />
      </div>
    );
  }
}

App.propTypes = {
  match: React.PropTypes.shape({
    params: React.PropTypes.objectOf(
      React.PropTypes.string.isRequired
    ).isRequired,
  }).isRequired,
};

export default App;
