import React, { useState, useEffect } from 'react';

const EditFishForm = ({
  fish: { name, price, status, desc, image },
  updateFish,
  index,
}) => {
  const [fish, setFish] = useState({ name, price, status, desc, image });
  const handleChange = e => {
    setFish({
      ...fish,
      [e.currentTarget.name]: e.currentTarget.value,
    });
    updateFish(index, fish);
  };
  return (
    <div className="fish-edit">
      <input type="text" name="name" onChange={handleChange} value={name} />
      <input type="text" name="price" onChange={handleChange} value={price} />
      <select type="text" name="status" onChange={handleChange} value={status}>
        <option value="available">Fresh!</option>
        <option value="unavailable">Sold Out</option>
      </select>
      <textarea name="desc" onChange={handleChange} value={desc} />
      <input type="text" name="image" onChange={handleChange} value={image} />
    </div>
  );
};

export default EditFishForm;
