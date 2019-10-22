import React, { useRef } from 'react';
import PropTypes from 'prop-types';

const AddFishForm = ({ addFish }) => {
  const nameInput = useRef(null);
  const priceInput = useRef(null);
  const statusSelect = useRef(null);
  const descArea = useRef(null);
  const imageInput = useRef(null);

  const createFish = e => {
    e.preventDefault();
    addFish({
      name: nameInput.current.value,
      price: parseFloat(priceInput.current.value),
      status: statusSelect.current.value,
      desc: descArea.current.value,
      image: `https://picsum.photos/seed/${imageInput.current.value}/200`,
    });
    e.currentTarget.reset();
  };
  return (
    <form className="fish-edit" onSubmit={createFish}>
      <input ref={nameInput} type="text" placeholder="Fish Name" />
      <input ref={priceInput} type="text" placeholder="Fish Price" />
      <select ref={statusSelect}>
        <option value="available">Fresh!</option>
        <option value="unavailable">Sold Out</option>
      </select>
      <textarea ref={descArea} placeholder="Fish Description" />
      <input ref={imageInput} type="text" placeholder="Fish Image" />
      <button type="submit">+ Add Item</button>
    </form>
  );
};

AddFishForm.propTypes = {
  addFish: PropTypes.func.isRequired,
};

export default AddFishForm;
