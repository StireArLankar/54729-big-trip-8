class Point {
  constructor({city, icon, title, price, offers, date: {start, end}, picture, description}) {
    this.city = city;
    this.icon = icon;
    this.title = title;
    this.price = price;
    this.offers = offers;
    this.date = {
      start: new Date(start),
      end: new Date(end)
    };
    this.picture = picture;
    this.description = description;
  }
}

export default Point;
