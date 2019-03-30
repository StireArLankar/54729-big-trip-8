import Component from './component';
import PointModel from './point-model';
import flatpickr from 'flatpickr';
import getPointEditingArticle from '../components/get-point-editing-article';

class PointEditor extends Component {
  constructor({point, onReset, onSubmit, onDelete, destinationsArray, offersArray}) {
    super();
    this.point = point;
    this._ref = null;
    this._form = null;

    this.cb = {
      onReset,
      onSubmit,
      onDelete
    };

    this.destinationsArray = destinationsArray;
    this.offersArray = offersArray;

    this.onSubmit = this.onSubmit.bind(this);
    this.onReset = this.onReset.bind(this);
    this.onEscDown = this.onEscDown.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  get template() {
    return getPointEditingArticle(this.point, this.destinationsArray, this.offersArray);
  }

  render() {
    this._ref = this.template;
    this._form = this._ref.querySelector(`form`);
    this.bind();
    return this._ref;
  }

  bind() {
    // this._form.addEventListener(`submit`, this.onSubmit);
    this._form.addEventListener(`reset`, this.onReset);
    document.addEventListener(`keydown`, this.onEscDown);
    this._form.querySelector(`.point__button--save`).addEventListener(`click`, this.onSubmit);
    this._form.querySelector(`.point__button--delete`).addEventListener(`click`, this.onDelete);

    const label = this._form.querySelector(`.point__time`);
    label.style.width = `280px`;
    const startDateInput = label.querySelector(`.point__input[name=date-start]`);
    flatpickr(startDateInput, {
      altInput: true,
      altFormat: `H:i d M`,
      dateFormat: `Z`,
      defaultDate: this.point.date.start,
      [`time_24hr`]: true,
      enableTime: true
    });

    const endDateInput = label.querySelector(`.point__input[name=date-end]`);
    flatpickr(endDateInput, {
      altInput: true,
      altFormat: `H:i d M`,
      dateFormat: `Z`,
      defaultDate: this.point.date.end,
      [`time_24hr`]: true,
      enableTime: true
    });

  }

  unbind() {
    // this._form.removeEventListener(`submit`, this.onSubmit);
    this._form.removeEventListener(`reset`, this.onReset);
    document.removeEventListener(`keydown`, this.onEscDown);
    this._form.querySelector(`.point__button--save`).removeEventListener(`click`, this.onSubmit);
    this._form.querySelector(`.point__button--delete`).removeEventListener(`click`, this.onDelete);
  }

  getDataFromForm() {
    const data = formDataConverter(this._form, this.point);
    return data;
  }

  onReset(evt) {
    evt.preventDefault();
    this.cb.onReset();
  }

  onDelete(evt) {
    evt.preventDefault();
    this.block();
    this.cb.onDelete();
  }

  onSubmit(evt) {
    evt.preventDefault();
    const data = this.getDataFromForm();
    const pointData = PointModel.raw(data);
    this.block();
    this.cb.onSubmit(pointData);
    // this.point.update(data);
    // this.point.closeEditor();
  }

  onError() {
    this.shake();
    this.unblock();
  }

  shake() {
    const ANIMATION_TIMEOUT = 600;
    this._ref.style.animation = `shake ${ANIMATION_TIMEOUT / 1000}s`;

    setTimeout(() => {
      this._ref.style.animation = ``;
    }, ANIMATION_TIMEOUT);
  }

  block() {
    this._ref.querySelector(`.point__button--save`).disabled = false;
    this._ref.querySelector(`.point__button--delete`).disabled = false;
  }

  unblock() {
    this._ref.querySelector(`.point__button--save`).disabled = true;
    this._ref.querySelector(`.point__button--delete`).disabled = true;
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
