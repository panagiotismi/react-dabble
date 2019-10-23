import React, { useState, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';

import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import base from '../base';
import sampleFishes from '../sample-fishes';
import fishReducer, { initialFishes } from '../reducers/fishReducer';

const App = ({ match: { params } }) => {
  const [fishes, dispatch] = useReducer(fishReducer, initialFishes);
  const [order, setOrder] = useState({});

  useEffect(() => {
    const ref = base.ref(`${params.storeName}/fishes`);
    ref.on('value', snapshot => dispatch(['SET', snapshot.val() || {}]));
    return () => ref.off();
  }, [params.storeName]);

  useEffect(() => {
    const ref = base.ref(`${params.storeName}/fishes`);
    ref.update(fishes);
  }, [fishes, params.storeName]);

  useEffect(() => {
    const localStorageRef = localStorage.getItem(`order-${params.storeName}`);
    if (localStorageRef) {
      setOrder(JSON.parse(localStorageRef));
    }
  }, [params.storeName]);

  useEffect(() => {
    localStorage.setItem(`order-${params.storeName}`, JSON.stringify(order));
  }, [order, params.storeName]);

  return (
    <div className="catch-of-the-day">
      <div className="menu">
        <Header tagline="Fresh Seafood Market" />
        <ul className="list-of-fishes">
          {Object.keys(fishes).map(
            key =>
              fishes[key] && (
                <Fish
                  key={key}
                  index={key}
                  fish={fishes[key]}
                  addToOrder={() =>
                    setOrder(prevOrder => ({
                      ...prevOrder,
                      [key]: prevOrder[key] + 1 || 1,
                    }))
                  }
                />
              )
          )}
        </ul>
      </div>
      <Order
        fishes={fishes}
        order={order}
        removeFromOrder={key => {
          const { [key]: toRemove, ...rest } = order;
          setOrder(rest);
        }}
        params={params}
      />
      <Inventory
        fishes={fishes}
        loadSamples={() => dispatch(['SET', sampleFishes])}
        addFish={newFish =>
          dispatch(['UPDATE', { key: `fish${Date.now()}`, newFish }])
        }
        updateFish={(key, newFish) => dispatch(['UPDATE', { key, newFish }])}
        deleteFish={key => dispatch(['UPDATE', { key, newFish: null }])}
        // storeName={params.storeName}
      />
    </div>
  );
};

App.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
  }).isRequired,
};

export default App;
