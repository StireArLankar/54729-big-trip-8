import PointConstructor from './point-constructor';
import getPointEditingArticle from '../components/main/get-point-editing-article';

class PointEditor extends PointConstructor {
  constructor(data, point) {
    super(data);

    this.point = point;
    this._ref = null;
    this._form = null;

    this.submit = this.submit.bind(this);
    this.reset = this.reset.bind(this);
    this.escape = this.escape.bind(this);
  }

  render() {
    const card = this.point.reference;
    const container = card.parentNode;
    this._ref = getPointEditingArticle(this);

    this._form = this._ref.querySelector(`form`);

    this.addListeners();

    container.replaceChild(this._ref, card);
    return this._ref;
  }

  submit(evt) {
    evt.preventDefault();
    // this.point.update(data);
    // this.unrender();
    this.point.closeEditor();
  }

  reset(evt) {
    evt.preventDefault();
    // this.unrender();
    this.point.closeEditor();
  }

  escape(evt) {
    const isEsc = evt.keyCode === 27;
    const insideForm = evt.path.includes(this._form);
    if (!isEsc || insideForm) {
      return;
    }
    this.reset(evt);
  }

  addListeners() {
    this._form.addEventListener(`submit`, this.submit);
    this._form.addEventListener(`reset`, this.reset);
    document.addEventListener(`keydown`, this.escape);
  }

  removeListeners() {
    this._form.removeEventListener(`submit`, this.submit);
    this._form.removeEventListener(`reset`, this.reset);
    document.removeEventListener(`keydown`, this.escape);
  }

  unrender() {
    const card = this.point.reference;
    const container = this._ref.parentNode;

    container.replaceChild(card, this._ref);
    this.removeListeners();

    this._ref = null;
    // this.point.closeEditor();
  }
}

export default PointEditor;
