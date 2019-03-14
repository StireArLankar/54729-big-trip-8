import getTestPoint from './get-test-point';

const getTestPointList = (amount) => {
  const array = new Array(amount).fill(1);
  return array.map((_el, index) => {
    const point = getTestPoint();
    point.index = index;
    return point;
  }).sort((a, b) => a.date.start - b.date.start);
};

export {getTestPoint, getTestPointList};
