import PointComponent from './point-component';
import PointEditor from './point-editor';
import Component from './component';

import renderTripSorting from '../components/render-trip-sorting';
import renderTripInfo from '../components/render-trip-info';
import renderTripFilters from '../components/render-trip-filters';

import Filters from '../common/filters';
import Sortings from '../common/sortings';
import iconDict from '../common/icon-dict';

import Provider from './provider';
import ChartController from './chart-controller';

import {getPath, getStartDate, getEndDate, clearElement, sortPoints, filterPoints, renderTripPoints} from '../common/tripUtils';

const container = document.querySelector(`.trip-points`);
const filtersContainer = document.querySelector(`.trip-filter`);
const sortingContainer = document.querySelector(`.trip-sorting`);
const infoContainer = document.querySelector(`.trip`);
const AUTHORIZATION = `Basic dXNlckBwYXNzd29yZAo=${Math.random()}`;
const END_POINT = `https://es8-demo-srv.appspot.com/big-trip`;

class Trip extends Component {
  constructor() {
    super();
    this.onEditorOpening = this.onEditorOpening.bind(this);
    this.onPointUpdate = this.onPointUpdate.bind(this);
    this.onPointDelete = this.onPointDelete.bind(this);
    this.setViewTable = this.setViewTable.bind(this);
    this.setViewStats = this.setViewStats.bind(this);
    this.setFilterMethod = this.setFilterMethod.bind(this);
    this.setSortingMethod = this.setSortingMethod.bind(this);
    this.onNewPointClick = this.onNewPointClick.bind(this);
    this.onNewPointDelete = this.onNewPointDelete.bind(this);
    this.onNewPointReset = this.onNewPointReset.bind(this);
    this.onNewPointSubmit = this.onNewPointSubmit.bind(this);

    this.provider = new Provider({endPoint: END_POINT, authorization: AUTHORIZATION});
    this.newPoint = null;

    this._points = [];
    this._renderedPoints = [];
    this._icon = iconDict.Flight;
    this._sortMethod = `date`;
    this._filterMethod = `Everything`;

    this.state = {
      isStatisticShown: false
    };

    this.container = container;

    this.links = {
      table: null,
      stats: null
    };

    this.sections = {
      main: null,
      stats: null
    };

    this.chartController = null;
  }

  get points() {
    return this._points;
  }

  get path() {
    return getPath(this._points);
  }

  get icon() {
    return this._icon;
  }

  get startDate() {
    return getStartDate(this._points);
  }

  get endDate() {
    return getEndDate(this._points);
  }

  get totalPrice() {
    return this._points.reduce((acc, point) => {
      return acc + point.totalPrice;
    }, 0);
  }

  onEditorOpening() {
    this._renderedPoints.forEach((point) => {
      point.closeEditor();
    });
    if (this.newPoint) {
      this.newPoint.unrender();
      this.newPoint = null;
    }
  }

  _updatePoint(data) {
    const id = data.id;
    const indexInArray = this.points.findIndex((el) => +el.id === +id);
    this._points[indexInArray].unrender();
    this._points[indexInArray] = new PointComponent({
      data,
      onEditorOpening: this.onEditorOpening,
      onPointUpdate: this.onPointUpdate,
      onPointDelete: this.onPointDelete,
      Destinations: this.Destinations,
      Offers: this.Offers
    });
    return indexInArray;
  }

  onPointUpdate(data, pointComponent) {
    this.provider.updatePoint({id: data.id, data})
      .then((updatedData) => this._updatePoint(updatedData))
      .then(() => this.update())
      .catch(() => {
        pointComponent.onError();
      });
  }

  _deletePoint(id) {
    const indexInArray = this.points.findIndex((el) => +el.id === +id);
    const temp = [
      ...this.points.slice(0, indexInArray),
      ...this.points.slice(indexInArray + 1)
    ];
    this.points[indexInArray].unrender();
    this._points = temp;
  }

  onPointDelete(id, pointComponent) {
    this.provider.deletePoint({id})
      .then(() => this._deletePoint(id))
      .then(() => this.update())
      .catch(() => {
        pointComponent.onError();
      });
  }

  _loadOffers() {
    return this.provider.getOffers()
      .then((offers) => {
        this.Offers = offers;
      });
  }

  _loadDestinations() {
    return this.provider.getDestinations()
      .then((destinations) => {
        this.Destinations = destinations;
      });
  }

  _loadPoints() {
    return this.provider.getPoints()
      .then((points) => {
        this._points.forEach((point) => {
          point.closeEditor();
          point.unrender();
          point = null;
        });
        this._points = points.map((data) => {
          return new PointComponent({
            data,
            onEditorOpening: this.onEditorOpening,
            onPointUpdate: this.onPointUpdate,
            onPointDelete: this.onPointDelete,
            Destinations: this.Destinations,
            Offers: this.Offers
          });
        });
      });
  }

  onLoadingError() {
    container.querySelector(`.trip__loading`).textContent = `
      Something went wrong while loading your route info. Check your connection or try again later
    `;
  }

  start() {
    this._loadOffers()
      .then(() => this._loadDestinations())
      .then(() => this._loadPoints())
      .then(() => this.render())
      .catch(() => this.onLoadingError());

  }

  render() {
    this._clearBoard();
    this._sortAndFilterPoints();
    this._renderTripPoints();
    this._renderTripInfo();
    this._renderFilters(Filters);
    this._renderSorting(Sortings);
    this._bind();
  }

  _clearBoard() {
    this._points.forEach((point) => {
      point.unrender();
    });
    clearElement(container);
    container.innerHTML = ``;
  }

  update() {
    this._clearBoard();
    this._sortAndFilterPoints();
    this._renderTripPoints();
    this._renderTripInfo();
  }

  onNewPointClick(evt) {
    evt.preventDefault();
    this.onEditorOpening();
    this.newPoint = new PointEditor({
      point: null,
      onReset: this.onNewPointReset,
      onSubmit: this.onNewPointSubmit,
      onDelete: this.onNewPointDelete,
      Destinations: this.Destinations,
      Offers: this.Offers
    });

    const ref = this.newPoint.render();
    container.insertAdjacentElement(`afterBegin`, ref);
  }

  onNewPointDelete() {
    this.newPoint.unrender();
    this.newPoint = null;
  }

  onNewPointReset() {
    this.onNewPointDelete();
  }

  onNewPointSubmit(data) {
    this.provider.createPoint({data})
      .then((result) => this._addNewPoint(result))
      .catch(() => this.newPoint.onError());
  }

  _addNewPoint(data) {
    const point = new PointComponent({
      data,
      onEditorOpening: this.onEditorOpening,
      onPointUpdate: this.onPointUpdate,
      onPointDelete: this.onPointDelete,
      Destinations: this.Destinations,
      Offers: this.Offers
    });
    this._points.push(point);
    this.update();
  }

  _bind() {
    window.addEventListener(`offline`, () => {
      document.title = `${document.title}[OFFLINE]`;
    });
    window.addEventListener(`online`, () => {
      document.title = document.title.split(`[OFFLINE]`)[0];
      this.provider.syncPoints()
        .then(() => this._loadPoints())
        .then(() => this.update())
        .catch(() => this.onLoadingError());
    });

    document.querySelector(`.trip-controls__new-event`).addEventListener(`click`, this.onNewPointClick);
    this.links.table = document.querySelector(`a[data-href='#table']`);
    this.links.stats = document.querySelector(`a[data-href='#stats']`);
    this.sections.main = document.querySelector(`.main`);
    this.sections.stats = document.querySelector(`.statistic`);
    this.links.table.addEventListener(`click`, this.setViewTable);
    this.links.stats.addEventListener(`click`, this.setViewStats);
    this.chartController = new ChartController(this.points);
    this.chartController.initCharts(this.points);
  }

  _unbind() {
    this.links.table.removeEventListener(`click`, this.setViewTable);
    this.links.stats.removeEventListener(`click`, this.setViewStats);
    this.links = null;
    this.sections = null;
    this.chartController = null;
  }

  setViewTable() {
    if (!this.state.isStatisticShown) {
      return;
    }
    this.state.isStatisticShown = false;
    this.links.table.classList.add(`view-switch__item--active`);
    this.links.stats.classList.remove(`view-switch__item--active`);
    this.sections.main.classList.remove(`visually-hidden`);
    this.sections.stats.classList.add(`visually-hidden`);
  }

  setViewStats() {
    if (this.state.isStatisticShown) {
      return;
    }
    this.state.isStatisticShown = true;
    this.chartController.updateCharts(this._renderedPoints);
    this.links.table.classList.remove(`view-switch__item--active`);
    this.links.stats.classList.add(`view-switch__item--active`);
    this.sections.main.classList.add(`visually-hidden`);
    this.sections.stats.classList.remove(`visually-hidden`);
  }

  _renderTripInfo() {
    renderTripInfo(this, infoContainer);
  }

  _renderFilters(list) {
    renderTripFilters(list, filtersContainer);
    const filtersRadio = filtersContainer.querySelectorAll(`input[name=filter]`);
    filtersRadio.forEach((filter) => {
      filter.addEventListener(`change`, this.setFilterMethod);
    });
  }

  _renderSorting(list) {
    renderTripSorting(list, sortingContainer);
    const sortingRadio = sortingContainer.querySelectorAll(`input[name=trip-sorting]`);
    sortingRadio.forEach((sorting) => {
      sorting.addEventListener(`change`, this.setSortingMethod);
    });
  }

  setMethod(methodName, evt) {
    if (methodName !== `_filterMethod` && methodName !== `_sortMethod`) {
      return;
    }
    this[methodName] = evt.target.value;
    this.update();
    if (this.state.isStatisticShown) {
      this.chartController.updateCharts(this._renderedPoints);
    }
  }

  setFilterMethod(evt) {
    this.setMethod(`_filterMethod`, evt);
  }

  setSortingMethod(evt) {
    this.setMethod(`_sortMethod`, evt);
  }

  _renderTripPoints() {
    renderTripPoints(this._sortMethod, this._renderedPoints, container, this.startDate);
  }

  _sortAndFilterPoints() {
    const sortedPoints = sortPoints(this._points, this._sortMethod);
    const filteredPoints = filterPoints(sortedPoints, this._filterMethod);
    this._renderedPoints = filteredPoints;
  }
}

export default Trip;
