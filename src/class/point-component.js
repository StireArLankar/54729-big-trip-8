import getPointArticle from '../components/get-point-article';
import Component from './component';
import PointEditor from './point-editor';

class Point extends Component {
  constructor({data, onEditorOpening, onPointUpdate, onPointDelete, Offers, Destinations}) {
    super();
    this._data = {
      id: Number(data.id),
      type: convertType(data.type),
      destination: data.destination,
      price: data.base_price,
      offers: data.offers,
      isFavourite: data.is_favorite,
      date: {
        start: new Date(data.date_from),
        end: new Date(data.date_to)
      }
    };

    this.Destinations = Destinations;
    this.Offers = Offers;

    this.cb = {
      onEditorOpening,
      onPointUpdate,
      onPointDelete
    };

    this._ref = null;
    this.editor = null;

    this.openEditor = this.openEditor.bind(this);
    this.onEditorReset = this.onEditorReset.bind(this);
    this.onEditorSubmit = this.onEditorSubmit.bind(this);
    this.onEditorDelete = this.onEditorDelete.bind(this);
  }

  get id() {
    return this._data.id;
  }

  get destination() {
    return this._data.destination.name;
  }

  get type() {
    return this._data.type;
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
      [`type`]: data.type.toLowerCase(),
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

  get template() {
    return getPointArticle(this);
  }

  bind() {
    this._ref.addEventListener(`click`, this.openEditor);
  }

  unbind() {
    this._ref.removeEventListener(`click`, this.openEditor);
  }

  openEditor(evt) {
    evt.stopPropagation();
    this.cb.onEditorOpening();

    this.editor = new PointEditor({
      point: this,
      onReset: this.onEditorReset,
      onSubmit: this.onEditorSubmit,
      onDelete: this.onEditorDelete,
      Destinations: this.Destinations,
      Offers: this.Offers
    });

    const editorRef = this.editor.render();
    const cardRef = this._ref;
    const container = cardRef.parentNode;
    container.replaceChild(editorRef, cardRef);
  }

  onEditorReset() {
    this.closeEditor();
  }

  onEditorSubmit(rawData) {
    this.cb.onPointUpdate(rawData, this);
  }

  onError() {
    this.editor.onError();
  }

  onEditorDelete() {
    this.cb.onPointDelete(this.id, this);
  }

  closeEditor() {
    if (!this.editor) {
      return;
    }

    const editorRef = this.editor.reference;
    const cardRef = this._ref;
    const container = editorRef.parentNode;
    container.replaceChild(cardRef, editorRef);

    this.editor.unrender();
    this.editor = null;
  }

  unrender() {
    if (this._ref) {
      this.closeEditor();
      this.unbind();
      this._ref.remove();
      this._ref = null;
    }
  }
}

const convertType = (type) => {
  const temp = type.slice(0, 1).toUpperCase() + type.slice(1);
  return temp;
};

export default Point;
