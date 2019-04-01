import Trip from './class/trip';

let trip;

window.addEventListener(`load`, () => {
  trip = new Trip();
  trip.start();
});
