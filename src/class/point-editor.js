import Component from './component';
import flatpickr from 'flatpickr';
import getPointEditingArticle from '../components/get-point-editing-article';

class PointEditor extends Component {
  constructor(point) {
    super();
    this.point = point;
    this._ref = null;
    this._form = null;

    this.onSubmit = this.onSubmit.bind(this);
    this.onReset = this.onReset.bind(this);
    this.onEscDown = this.onEscDown.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  get template() {
    return getPointEditingArticle(this.point);
  }

  render() {
    const card = this.point.reference;
    const container = card.parentNode;
    this._ref = this.template;

    this._form = this._ref.querySelector(`form`);

    this.bind();

    container.replaceChild(this._ref, card);
    return this._ref;
  }

  bind() {
    this._form.addEventListener(`submit`, this.onSubmit);
    this._form.addEventListener(`reset`, this.onReset);
    document.addEventListener(`keydown`, this.onEscDown);
    this._form.querySelector(`.point__button--delete`).addEventListener(`click`, this.onDelete);

    const date = this._form.querySelector(`.point__date`);
    const dateInput = date.querySelector(`.point__input`);
    date.style.display = `block`;
    flatpickr(dateInput, {
      altInput: true,
      altFormat: `M d`,
      dateFormat: `d-n`,
      defaultDate: this.point.date.start
    });

  }

  unbind() {
    this._form.removeEventListener(`submit`, this.onSubmit);
    this._form.removeEventListener(`reset`, this.onReset);
    document.removeEventListener(`keydown`, this.onEscDown);
    this._form.querySelector(`.point__button--delete`).removeEventListener(`click`, this.onDelete);
  }

  getDataFromForm() {
    const data = formDataConverter(this._form, this.point);
    return data;
  }

  onSubmit(evt) {
    evt.preventDefault();
    const data = this.getDataFromForm();
    this.point.update(data);
    this.point.closeEditor();
  }

  onReset(evt) {
    evt.preventDefault();
    this.point.closeEditor();
  }

  onDelete(evt) {
    evt.preventDefault();
    this.point.delete();
  }

  onEscDown(evt) {
    const isEsc = evt.keyCode === 27;
    const insideForm = evt.path.includes(this._form);
    if (!isEsc || insideForm) {
      return;
    }
    this.onReset(evt);
  }

  unrender() {
    const card = this.point.reference;
    const container = this._ref.parentNode;

    container.replaceChild(card, this._ref);

    this.unbind();
    this._ref = null;
  }
}

const timeExtracter = (startDate, endDate, date, time) => {
  const [startTime, endTime] = time.split(` — `);
  const [startHour, startMin] = startTime.split(`:`);
  const [endHour, endMin] = endTime.split(`:`);
  const [day, month] = date.split(`-`);
  const start = dataUpgrader(startDate, month, day, startHour, startMin);
  const end = dataUpgrader(endDate, month, day, endHour, endMin);
  return [start, end];
};

const formDataConverter = (form, oldData) => {
  const formData = new FormData(form);
  const object = {};
  const oldStart = oldData.date.start;
  const oldEnd = oldData.date.end;

  for (let pair of formData.entries()) {
    object[pair[0]] = pair[1];
  }

  const [start, end] = timeExtracter(oldStart, oldEnd, object.day, object.time);
  const evt = object[`travel-way`][0].toUpperCase() + object[`travel-way`].slice(1);

  const offersElements = form.querySelectorAll(`.point__offers-input`);
  const offersCheck = [...offersElements].map((offer) => offer.checked);
  const offers = oldData.offers.map((offer, index) => {
    const temp = Object.assign({}, offer);
    temp.checked = offersCheck[index];
    return temp;
  });

  const data = {
    destination: object.destination,
    event: evt,
    price: Number(object.price),
    offers,
    date: {
      start,
      end
    }
  };

  return data;
};

const dataUpgrader = (date, month, day, hour, min) => {
  const temp = new Date(date);
  temp.setMonth(month - 1, day);
  temp.setHours(hour, min);
  return temp;
};

export default PointEditor;
