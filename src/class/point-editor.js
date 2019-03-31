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
      defaultDate: this.point ? this.point.date.start : Date.now(),
      [`time_24hr`]: true,
      enableTime: true
    });

    const endDateInput = label.querySelector(`.point__input[name=date-end]`);
    flatpickr(endDateInput, {
      altInput: true,
      altFormat: `H:i d M`,
      dateFormat: `Z`,
      defaultDate: this.point ? this.point.date.end : Date.now(),
      [`time_24hr`]: true,
      enableTime: true
    });

  }

  unbind() {
    this._form.removeEventListener(`reset`, this.onReset);
    document.removeEventListener(`keydown`, this.onEscDown);
    this._form.querySelector(`.point__button--save`).removeEventListener(`click`, this.onSubmit);
    this._form.querySelector(`.point__button--delete`).removeEventListener(`click`, this.onDelete);
  }

  getDataFromForm() {
    const id = this.point ? this.point.id : ``;
    const data = formDataConverter(this._form, this.offersArray, this.destinationsArray, id);
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
    if (data) {
      const pointData = PointModel.raw(data);
      this.block();
      this.cb.onSubmit(pointData);
    } else {
      this.shake();
    }
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
    const saveBtn = this._ref.querySelector(`.point__button--save`);
    const deletBtn = this._ref.querySelector(`.point__button--delete`);
    saveBtn.disabled = true;
    deletBtn.disabled = true;
    saveBtn.textContent = `..........`;
    deletBtn.textContent = `.............`;
  }

  unblock() {
    const saveBtn = this._ref.querySelector(`.point__button--save`);
    const deletBtn = this._ref.querySelector(`.point__button--delete`);
    saveBtn.disabled = false;
    deletBtn.disabled = false;
    saveBtn.textContent = `Save`;
    deletBtn.textContent = `Delete`;
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
    this._ref.remove();
    this._ref = null;
  }
}

const formDataConverter = (form, offersArray, destinationsArray, id) => {
  const formData = new FormData(form);
  const object = {};

  for (let pair of formData.entries()) {
    object[pair[0]] = pair[1];
  }

  const [start, end] = [new Date(object[`date-start`]), new Date(object[`date-end`])];

  if (start - end >= 0) {
    return false;
  }

  const type = object[`travel-way`][0].toUpperCase() + object[`travel-way`].slice(1);

  const offersElements = form.querySelectorAll(`.point__offers-input`);
  const offers = getNewOffers([...offersElements], type, offersArray);

  const destination = getNewDestination(object.destination, destinationsArray);

  if (!destination) {
    return false;
  }

  const isFavourite = form.querySelector(`.point__favorite-input`).checked;

  const data = {
    destination,
    type,
    price: Number(object.price),
    offers,
    date: {
      start,
      end
    },
    isFavourite,
    id
  };

  return data;
};

const getNewDestination = (name, destArray) => {
  return destArray.find((dest) => dest.name === name);
};

const getNewOffers = (checkboxes, rawType, offersArray) => {
  const type = rawType.toLowerCase();
  const typedOffersIndex = offersArray.findIndex((element) => element.type === type);
  const typedOffers = offersArray[typedOffersIndex].offers;
  return typedOffers.map((offer) => {
    const checkbox = checkboxes.find((cbhox) => cbhox.value === offer.name);
    const accepted = checkbox ? checkbox.checked : false;
    return {
      title: offer.name,
      price: offer.price,
      accepted
    };
  });
};

export default PointEditor;
