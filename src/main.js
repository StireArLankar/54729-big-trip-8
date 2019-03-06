import {addFilterListener} from './components/header';
import {renderTripPoints} from './components/main';
import {getTestPointList} from './mock';
import Trip from './class/trip';

const testPoints = getTestPointList(6);

const randomPoints = (points) => {
  const temp = points.filter((point) => point.price * Math.random() > point.price * 0.3);
  return [...temp];
};

const testTrip = new Trip(testPoints);
testTrip.render();
// testTrip.clearTripPoints();

addFilterListener(() => {
  const temp = randomPoints(testPoints);
  renderTripPoints(temp);
});
