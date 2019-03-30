// import {getTestPointList} from './mock';
import Trip from './class/trip';

// const testPoints = getTestPointList(6);

// const testTrip = new Trip(testPoints);
// testTrip.render();

let trip;

window.addEventListener(`load`, () => {
  trip = new Trip();
  trip.start();
});
