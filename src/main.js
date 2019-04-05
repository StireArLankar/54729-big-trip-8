import Trip from './class/trip';

// navigator.serviceWorker.register(`./sw.js`);

window.addEventListener(`load`, () => {
  const trip = new Trip();
  trip.start();
});
