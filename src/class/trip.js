import PointComponent from './point-component';
import Component from './component';
import {renderTripPoints, renderSorting} from '../components/main';
import headerFilterList from '../common/header-filter-list';
import mainSortingList from '../common/main-sorting-list';
import {renderTripInfo, renderTripFilters} from '../components/header';
import iconDict from '../common/icon-dict';

const container = document.querySelector(`.trip-points`);

class Trip extends Component {
  constructor(pointsData) {
    super();
    this._points = pointsData.map((data) => new PointComponent(data, this));
    this._date = {
      start: getStartDate(pointsData),
      end: getEndDate(pointsData)
    };
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
    return this._date.start;
  }

  get endDate() {
    return this._date.end;
  }

  get totalPrice() {
    return this._points.reduce((acc, cur) => acc + cur.price, 0);
  }

  render() {
    renderTripPoints(this._points, this.startDate, container);
    renderTripInfo(this);
    renderTripFilters(headerFilterList);
    renderSorting(mainSortingList);
  }

  clearTripPoints() {
    this._points.forEach((point) => point.unrender());
    container.innerHTML = ``;
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

const convertToDateStart = (number) => {
  const date = new Date(number);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  return new Date(year, month, day);
};

const getPath = (points) => {
  const cities = points.reduce((acc, cur) => {
    if (acc[acc.length - 1] !== cur.model.city) {
      acc.push(cur.model.city);
    }
    return acc;
  }, []);
  const path = cities.reduceRight((acc, cur) => `${cur} — ${acc}`);
  return path;
};

export default Trip;
