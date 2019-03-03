import getTestPoint from './get-test-point';
import Point from '../class/point';

const getTestPointList = (amount) => {
  const array = new Array(amount).fill(1);
  return array.map((_el, index) => {
    const point = new Point(getTestPoint());
    point.index = index;
    return point;
  }).sort((a, b) => a.date.start - b.date.start);
};

export {getTestPoint, getTestPointList};
