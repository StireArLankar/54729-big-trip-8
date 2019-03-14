import PointComponent from './point-component';
import Component from './component';
import {renderTripPoints, renderSorting} from '../components/main';
import headerFilterList from '../common/header-filter-list';
import mainSortingList from '../common/main-sorting-list';
import {renderTripInfo, renderTripFilters} from '../components/header';
import iconDict from '../common/icon-dict';
import {convertToDateStart} from '../common/utils';

const container = document.querySelector(`.trip-points`);

class Trip extends Component {
  constructor(pointsData) {
    super();
    this._points = pointsData.map((data) => new PointComponent(data, this));
    this._icon = iconDict.Taxi;
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

  render() {
    this.sortPointsByDate();
    renderTripPoints(this._points, this.startDate, container);
    // console.log(this.points.map((point) => point.date));
    renderTripInfo(this);
    renderTripFilters(headerFilterList);
    renderSorting(mainSortingList);
  }

  update() {
    this.clearTripPoints();
    this.sortPointsByDate();
    renderTripPoints(this._points, this.startDate, container);
    renderTripInfo(this);
    // console.log(this.points.map((point) => point.date));
  }

  clearTripPoints() {
    this._points.forEach((point) => point.unrender());
    container.innerHTML = ``;
  }

  sortPointsByDate() {
    this._points.sort((a, b) => {
      return a.date.start - b.date.start;
    });
  }
}

const getStartDate = (points) => {
  const temp = points.map((point) => point.date.start);
  const min = Math.min(...temp);
  const date = convertToDateStart(min);
  return date;
};

const getEndDate = (points) => {
  const temp = points.map((point) => point.date.end);
  const max = Math.max(...temp);
  const date = convertToDateStart(max);
  return date;
};

const getPath = (points) => {
  const cities = points.reduce((acc, cur) => {
    if (acc[acc.length - 1] !== cur.destination) {
      acc.push(cur.destination);
    }
    return acc;
  }, []);
  const path = cities.reduceRight((acc, cur) => `${cur} — ${acc}`);
  return path;
};

export default Trip;
