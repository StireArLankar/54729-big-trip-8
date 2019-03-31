import Component from "./component";

class PointModel extends Component {
  constructor(data) {
    super();
    this._data = {
      id: Number(data.id),
      event: convertTypeToEvent(data.type),
      destination: data.destination,
      price: data.base_price,
      offers: data.offers,
      isFavourite: data.is_favorite,
      date: {
        start: new Date(data.date_from),
        end: new Date(data.date_to)
      }
    };
  }

  get id() {
    return this._data.id;
  }

  get destination() {
    return this._data.destination.name;
  }

  get event() {
    return this._data.event;
  }

  get type() {
    return this._data.event;
  }

  get price() {
    return this._data.price;
  }

  get offers() {
    return this._data.offers;
  }

  get durationMinutes() {
    const temp = (this._data.date.end - this._data.date.start) / (60 * 1000);
    return temp;
  }

  get totalPrice() {
    const basePrice = this.price;
    const offersPrice = this.offers.reduce((accum, offer) => {
      return offer.accepted ? accum + offer.price : accum;
    }, 0);
    return basePrice + offersPrice;
  }

  get pictures() {
    return this._data.destination.pictures;
  }

  get description() {
    return this._data.destination.description;
  }

  get date() {
    return this._data.date;
  }

  get isFavourite() {
    return this._data.isFavourite;
  }

  get data() {
    return this._data;
  }

  updateModel(data) {
    this._data = data;
  }

  static raw(data) {
    return {
      [`id`]: data.id.toString(),
      [`type`]: data.event.toLowerCase(),
      [`destination`]: {
        [`name`]: data.destination.name,
        [`description`]: data.destination.description,
        [`pictures`]: data.destination.pictures,
      },
      [`base_price`]: data.price,
      [`offers`]: data.offers,
      [`is_favorite`]: data.isFavourite,
      [`date_from`]: +data.date.start,
      [`date_to`]: +data.date.end
    };
  }
}

const convertTypeToEvent = (type) => {
  const temp = type.slice(0, 1).toUpperCase() + type.slice(1);
  return temp;
};

export default PointModel;
