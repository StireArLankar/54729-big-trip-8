import Api from '../service/service-api';
import Store from './store';

const POINTS_STORE_KEY = `points-store-key`;
const OFFERS_STORE_KEY = `offers-store-key`;
const DESTINATIONS_STORE_KEY = `destinations-store-key`;

const generateId = () => {
  return Math.floor(Math.random() * 100) + 100;
};

class Provider {
  constructor({endPoint, authorization}) {
    this._api = new Api({endPoint, authorization});
    this._store = new Store({key: POINTS_STORE_KEY, storage: localStorage});
    this._offersStore = new Store({key: OFFERS_STORE_KEY, storage: localStorage});
    this._destinationsStore = new Store({key: DESTINATIONS_STORE_KEY, storage: localStorage});

    this._generateId = generateId;
    this._needSync = false;
  }

  getPoints() {
    if (this._isOnline && this._needSync) {
      this._needSync = false;
      this._store.removeAll();
    }

    if (this._isOnline) {
      return this._api.getPoints()
      .then((points) => {
        points.forEach((point) => this._store.setItem({key: point.id, item: point}));
        return points;
      });
    } else {
      const pointsMap = this._store.getAll();
      const points = Object.values(pointsMap);

      return Promise.resolve(points);
    }
  }

  getDestinations() {
    if (this._isOnline) {
      return this._api.getDestinations()
      .then((destinations) => {
        destinations.forEach((dest, index) => this._destinationsStore.setItem({key: index, item: dest}));
        return destinations;
      });
    } else {
      const destsMap = this._destinationsStore.getAll();
      const destinations = Object.values(destsMap);

      return Promise.resolve(destinations);
    }
  }

  getOffers() {
    if (this._isOnline) {
      return this._api.getOffers()
      .then((offers) => {
        offers.forEach((offer, index) => this._offersStore.setItem({key: index, item: offer}));
        return offers;
      });
    } else {
      const offersMap = this._offersStore.getAll();
      const offers = Object.values(offersMap);

      return Promise.resolve(offers);
    }
  }

  createPoint({data}) {
    if (this._isOnline()) {
      return this._api.createPoint({data})
        .then((point) => {
          this._store.setItem({key: point.id, item: point});
          return point;
        });
    } else {
      const point = data;
      point.id = this._generateId();
      this._needSync = true;

      this._store.setItem({key: point.id, item: point});
      return Promise.resolve(point);
    }
  }

  updatePoint({id, data}) {
    if (this._isOnline()) {
      return this._api.updatePoint({id, data})
        .then((point) => {
          this._store.setItem({key: point.id, item: point});
          return point;
        });
    } else {
      const point = data;
      this._needSync = true;
      this._store.setItem({key: point.id, item: point});
      return Promise.resolve(point);
    }
  }

  deletePoint({id}) {
    if (this._isOnline()) {
      return this._api.deletePoint({id})
        .then((result) => {
          this._store.removeItem({key: id});
          return result;
        });
    } else {
      this._needSync = true;
      this._store.removeItem({key: id});
      return Promise.resolve(true);
    }
  }

  syncPoints() {
    const storeData = this._store.getAll();
    const points = Object.values(storeData);
    return this._api.syncPoints({points})
      .then((result) => {
        return result;
      });
  }

  _isOnline() {
    return window.navigator.onLine;
  }
}

export default Provider;
