import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';
import Header from './Header';

configure({ adapter: new Adapter() });
const wrapper = shallow(
  <App match={{ params: { storeName: 'drab-obnoxious-tomatoes' } }} />
);

it('renders App without crashing', async () => wrapper);

it('renders Header', async () => {
  const header = <Header tagline="Fresh Seafood Market" />;
  expect(wrapper.contains(header)).toBe(true);
});
