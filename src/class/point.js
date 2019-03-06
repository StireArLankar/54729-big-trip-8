import getPointArticle from "../components/main/get-point-article";
import getPointEditingArticle from "../components/main/get-point-editing-article";

class Point {
  constructor({city, icon, title, price, offers, date: {start, end}, pictures, description}) {
    this.city = city;
    this.icon = icon;
    this.title = title;
    this.price = price;
    this.offers = offers;
    this.date = {
      start: new Date(start),
      end: new Date(end)
    };
    this.pictures = pictures;
    this.description = description;

    this.state = {
      isEditing: false
    };
  }

  render() {
    this._ref = getPointArticle(this);
    this._ref.addEventListener(`click`, this.changeState.bind(this));
    return this._ref;
  }

  changeState() {
    const parent = this._ref.parentNode;
    let temp;
    if (this.state.isEditing) {
      temp = getPointArticle(this);
      temp.addEventListener(`click`, this.changeState.bind(this));
    } else {
      temp = getPointEditingArticle(this);
      const form = temp.querySelector(`form`);
      form.addEventListener(`submit`, (evt) => {
        evt.preventDefault();
        this.changeState();
      });
      form.addEventListener(`reset`, (evt) => {
        evt.preventDefault();
        this.changeState();
      });
    }

    this.state.isEditing = !this.state.isEditing;
    parent.replaceChild(temp, this._ref);
    this._ref = temp;
  }

  unmount() {
    const parent = this._ref.parentNode;
    parent.removeChild(this._ref);
    this._ref = null;
  }
}

export default Point;
