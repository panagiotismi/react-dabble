export const initialFishes = {};

const fishReducer = (fishes, [type, payload]) => {
  switch (type) {
    case 'SET':
      return payload;
    case 'UPDATE': {
      const { key, newFish } = payload;
      return { ...fishes, [key]: newFish };
    }
    default:
      return fishes;
  }
};
export default fishReducer;
