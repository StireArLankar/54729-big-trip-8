import getPointArticle from "../components/main/get-point-article";
import PointModel from './point-model';
import PointEditor from './point-editor';
import Component from './component';

class PointComponent extends Component {
  constructor(data, trip) {
    super();
    this.trip = trip;
    this.model = new PointModel(data);

    this._ref = null;
    this.editor = null;

    this.openEditor = this.openEditor.bind(this);
  }

  get template() {
    return getPointArticle(this.model);
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
    this.model.update(data);
    this.closeEditor();
    this.trip.update();
  }
}

export default PointComponent;
