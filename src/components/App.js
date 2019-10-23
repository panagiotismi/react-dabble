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

  // const removeFish = key => setFishes({ ...fishes, [key]: null });

  const addToOrder = key =>
    setOrder(prevOrder => ({ ...prevOrder, [key]: prevOrder[key] + 1 || 1 }));

  const removeFromOrder = key => {
    delete order[key];
    setOrder(order);
  };

  return (
    <div className="catch-of-the-day">
      <div className="menu">
        <Header tagline="Fresh Seafood Market" />
        <ul className="list-of-fishes">
          {Object.keys(fishes).map(key => (
            <Fish
              key={key}
              index={key}
              details={fishes[key]}
              addToOrder={addToOrder}
            />
          ))}
        </ul>
      </div>
      <Order
        fishes={fishes}
        order={order}
        removeFromOrder={removeFromOrder}
        params={params}
      />
      <Inventory
        fishes={fishes}
        loadSamples={() => dispatch(['SET', sampleFishes])}
        addFish={fish => dispatch(['ADD', fish])}
        updateFish={(key, updatedFish) =>
          dispatch(['UPDATE', { key, updatedFish }])
        }
        // removeFish={removeFish}
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
