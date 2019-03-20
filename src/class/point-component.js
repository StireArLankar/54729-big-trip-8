import getPointArticle from "../components/main/get-point-article";
import PointModel from './point-model';
import PointEditor from './point-editor';

class PointComponent extends PointModel {
  constructor(data, trip) {
    super(data);
    this.trip = trip;

    this._ref = null;
    this.editor = null;

    this.openEditor = this.openEditor.bind(this);
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

  openEditor() {
    this.trip.points.forEach((point) => {
      point.closeEditor();
    });
    this.editor = new PointEditor(this);
    this.editor.render();
  }

  closeEditor() {
    if (!this.editor) {
      return;
    }
    this.editor.unrender();
    this.editor = null;
  }

  update(data) {
    this.updateModel(data);
    this.closeEditor();
    this.trip.update();
  }

  delete() {
    this.trip.deletePoint(this);
  }
}

export default PointComponent;
