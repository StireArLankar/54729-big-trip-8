import getPointArticle from "../components/main/get-point-article";
import PointConstructor from './point-constructor';
import PointEditor from './point-editor';

class Point extends PointConstructor {
  constructor(data, trip) {
    super(data);
    this.trip = trip;

    this._ref = null;
    this.editor = null;

    this.openEditor = this.openEditor.bind(this);
  }

  get reference() {
    return this._ref;
  }

  render() {
    this._ref = getPointArticle(this);
    this._ref.addEventListener(`click`, this.openEditor);
    return this._ref;
  }

  openEditor() {
    this.trip.points.forEach((point) => {
      point.closeEditor();
    });
    this.editor = new PointEditor(this.data, this);
    this.editor.render();
  }

  closeEditor() {
    if (!this.editor) {
      return;
    }
    this.editor.unrender();
    this.editor = null;
  }

  unmount() {
    const parent = this._ref.parentNode;
    parent.removeChild(this._ref);
    this._ref = null;
  }
}


export default Point;
