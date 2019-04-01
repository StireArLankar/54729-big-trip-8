import getPointArticle from '../components/get-point-article';
import PointModel from './point-model';
import PointEditor from './point-editor';

class PointComponent extends PointModel {
  constructor({data, onEditorOpening, onPointUpdate, onPointDelete, offersArray, destinationsArray}) {
    super(data);
    this.destinationsArray = destinationsArray;
    this.offersArray = offersArray;

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

    // this.trip.points.forEach((point) => {
    //   point.closeEditor();
    // });
    this.editor = new PointEditor({
      point: this,
      onReset: this.onEditorReset,
      onSubmit: this.onEditorSubmit,
      onDelete: this.onEditorDelete,
      destinationsArray: this.destinationsArray,
      offersArray: this.offersArray
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
    // this.update(data);
    // this.closeEditor();
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

export default PointComponent;
