export const initialFishes = {};

const fishReducer = (fishes, [type, payload]) => {
  switch (type) {
    case 'SET':
      return { ...payload };
    case 'ADD':
      return { ...fishes, [`fish${Date.now()}`]: payload };
    case 'UPDATE':
      return { ...fishes, [payload.key]: payload.updatedFish };
    default:
      return fishes;
  }
};
export default fishReducer;
