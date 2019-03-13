import Component from './component';
import getPointEditingArticle from '../components/main/get-point-editing-article';

class PointEditor extends Component {
  constructor(point) {
    super();
    this.point = point;
    this._ref = null;
    this._form = null;

    this.submit = this.submit.bind(this);
    this.reset = this.reset.bind(this);
    this.escape = this.escape.bind(this);
  }

  get template() {
    return getPointEditingArticle(this.point.model);
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
    this._form.addEventListener(`submit`, this.submit);
    this._form.addEventListener(`reset`, this.reset);
    document.addEventListener(`keydown`, this.escape);
  }

  unbind() {
    this._form.removeEventListener(`submit`, this.submit);
    this._form.removeEventListener(`reset`, this.reset);
    document.removeEventListener(`keydown`, this.escape);
  }

  submit(evt) {
    evt.preventDefault();
    // this.point.update(data);
    this.point.closeEditor();
  }

  reset(evt) {
    evt.preventDefault();
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

  unrender() {
    const card = this.point.reference;
    const container = this._ref.parentNode;

    container.replaceChild(card, this._ref);

    this.unbind();
    this._ref = null;
  }
}

export default PointEditor;
