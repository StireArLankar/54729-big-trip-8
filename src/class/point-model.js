class PointModel {
  constructor({destination, event, price, offers, pictures, description, date: {start, end}}) {
    this._data = {
      destination,
      event,
      price,
      offers,
      pictures,
      description,
      date: {
        start: new Date(start),
        end: new Date(end)
      }
    };
  }

  get destination() {
    return this._data.destination;
  }

  get event() {
    return this._data.event;
  }

  get price() {
    return this._data.price;
  }

  get offers() {
    return this._data.offers;
  }

  get totalPrice() {
    const basePrice = this.price;
    const offersPrice = this.offers.reduce((accum, offer) => {
      return offer.checked ? accum + offer.price : accum;
    }, 0);
    return basePrice + offersPrice;
  }

  get pictures() {
    return this._data.pictures;
  }

  get description() {
    return this._data.description;
  }

  get date() {
    return this._data.date;
  }

  get data() {
    return this._data;
  }

  update(data) {
    const temp = {
      destination: data.destination,
      event: data.event,
      price: data.price,
      offers: data.offers,
      pictures: this.data.pictures,
      description: this.data.description,
      date: {
        start: data.date.start,
        end: data.date.end
      }
    };
    this._data = temp;
  }
}

export default PointModel;
