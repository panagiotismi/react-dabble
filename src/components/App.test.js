import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';

configure({ adapter: new Adapter() });

it('renders App without crashing', () => {
  shallow(<App />);
});

const wrapper = shallow(<App />);

it('renders Header', () => {
  const header = <Header tagline="Fresh Seafood Market" />;
  expect(wrapper.contains(header)).toBe(true);
});

it('renders Order', () => {
  const order = <Order />;
  expect(wrapper.contains(order)).toBe(true);
});

it('renders Inventory', () => {
  const inventory = <Inventory />;
  expect(wrapper.contains(inventory)).toBe(true);
});

it('renders App correctly', () => {
  const app = (
    <div className="catch-of-the-day">
      <div className="menu">
        <Header tagline="Fresh Seafood Market" />
      </div>
      <Order />
      <Inventory />
    </div>
  );
  expect(wrapper).toContainEqual(app);
});
