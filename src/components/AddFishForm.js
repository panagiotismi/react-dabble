import React, { useRef } from 'react';
import PropTypes from 'prop-types';

const AddFishForm = ({ addFish }) => {
  const fishForm = useRef(null);
  const name = useRef(null);
  const price = useRef(null);
  const status = useRef(null);
  const desc = useRef(null);
  const image = useRef(null);

  const createFish = e => {
    e.preventDefault();
    addFish({
      name: name.current.value,
      price: price.current.value,
      status: status.current.value,
      desc: desc.current.value,
      image: image.current.value,
    });
    fishForm.reset();
  };
  return (
    <form ref={fishForm} className="fish-edit" onSubmit={createFish}>
      <input ref={name} type="text" placeholder="Fish Name" />
      <input ref={price} type="text" placeholder="Fish Price" />
      <select ref={status}>
        <option value="available">Fresh!</option>
        <option value="unavailable">Sold Out</option>
      </select>
      <textarea ref={desc} placeholder="Fish Description" />
      <input ref={image} type="text" placeholder="Fish Image" />
      <button type="submit">+ Add Item</button>
    </form>
  );
};

AddFishForm.propTypes = {
  addFish: PropTypes.func.isRequired,
};

export default AddFishForm;
