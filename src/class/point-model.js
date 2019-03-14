class PointModel {
  constructor({city, event, title, price, offers, pictures, description, date: {start, end}}) {
    this._data = {
      city,
      event,
      title,
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

  get city() {
    return this._data.city;
  }

  get event() {
    return this._data.event;
  }

  get title() {
    return this._data.title;
  }

  get price() {
    return this._data.price;
  }

  get offers() {
    return this._data.offers;
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
}

export default PointModel;
