import PointComponent from './point-component';
import Component from './component';
import {renderTripPoints, renderSorting} from '../components/main';
import headerFilterList from '../common/header-filter-list';
import mainSortingList from '../common/main-sorting-list';
import {renderTripInfo, renderTripFilters} from '../components/header';
import iconDict from '../common/icon-dict';
import {convertToDateStart} from '../common/utils';
import ChartComponent from './chart-component';

const container = document.querySelector(`.trip-points`);
const filtersContainer = document.querySelector(`.trip-filter`);

class Trip extends Component {
  constructor(pointsData) {
    super();
    this._points = pointsData.map((data) => new PointComponent(data, this));
    this._icon = iconDict.Taxi;
    this._renderedPoints = null;
    this._sortMethod = `Date`;
    this._filterMethod = `Everything`;

    this.state = {
      isStatisticShown: false
    };

    this.links = {
      table: null,
      stats: null
    };

    this.chartLabels = getChartLabels(iconDict);

    this.sections = {
      main: null,
      stats: null
    };

    this.charts = {
      money: {
        selector: null,
        name: null,
        unit: null,
        data: null,
        labels: null,
        chart: null
      },
      transport: {
        selector: null,
        name: null,
        unit: null,
        data: null,
        labels: null,
        chart: null
      }
    };

    this.setFilterMethod = this.setFilterMethod.bind(this);
    this.setViewTable = this.setViewTable.bind(this);
    this.setViewStats = this.setViewStats.bind(this);
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
    this.sortAndFilterPoints();
    this.renderTripPoints();
    renderTripInfo(this);
    this.renderFilters(headerFilterList);
    renderSorting(mainSortingList);
    this.bind();
  }

  update() {
    this.clearTripPoints();
    this.sortAndFilterPoints();
    this.renderTripPoints();
    renderTripInfo(this);
  }

  bind() {
    this.links.table = document.querySelector(`a[href='#table']`);
    this.links.stats = document.querySelector(`a[href='#stats']`);
    this.sections.main = document.querySelector(`.main`);
    this.sections.stats = document.querySelector(`.statistic`);
    this.links.table.addEventListener(`click`, this.setViewTable);
    this.links.stats.addEventListener(`click`, this.setViewStats);
    this.initMoneyChart();
    this.initTransportChart();
  }

  unbind() {
    this.links.table.removeEventListener(`click`, this.setViewTable);
    this.links.stats.removeEventListener(`click`, this.setViewStats);
    this.links = null;
    this.sections = null;
  }

  initMoneyChart() {
    this.charts.money = {
      selector: `.statistic__money`,
      name: `Money`,
      unit: `€`,
      data: this.moneyData,
      labels: this.chartLabels
    };
    this.charts.money.chart = new ChartComponent(this.charts.money);
  }

  initTransportChart() {
    this.charts.transport = {
      selector: `.statistic__transport`,
      name: `Transport`,
      unit: `x`,
      data: this.transportData,
      labels: this.chartLabels
    };
    this.charts.transport.chart = new ChartComponent(this.charts.transport);
  }

  get moneyData() {
    return getMoneyData(this._points, this.chartLabels);
  }

  get transportData() {
    return getTransportData(this._points, this.chartLabels);
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
    this.updateStats();
    this.links.table.classList.remove(`view-switch__item--active`);
    this.links.stats.classList.add(`view-switch__item--active`);
    this.sections.main.classList.add(`visually-hidden`);
    this.sections.stats.classList.remove(`visually-hidden`);
  }

  updateStats() {
    this.charts.money.chart.updateChart(this.moneyData);
    this.charts.transport.chart.updateChart(this.transportData);
  }

  renderFilters(list) {
    renderTripFilters(list, filtersContainer);
    const filtersRadio = filtersContainer.querySelectorAll(`input[name=filter]`);
    filtersRadio.forEach((filter) => {
      filter.addEventListener(`change`, this.setFilterMethod);
    });
  }

  setFilterMethod(evt) {
    this._filterMethod = evt.target.value;
    this.update();
  }

  deletePoint(point) {
    const index = this.points.findIndex((el) => el === point);
    const temp = [
      ...this.points.slice(0, index),
      ...this.points.slice(index + 1)
    ];
    this._points = temp;
    this.update();
  }

  clearTripPoints() {
    this._renderedPoints.forEach((point) => point.unrender());
    container.innerHTML = ``;
  }

  renderTripPoints() {
    renderTripPoints(this._renderedPoints, this.startDate, container);
  }

  sortAndFilterPoints() {
    const sortedPoints = sortPoints(this._points, this._sortMethod);
    const filteredPoints = filterPoints(sortedPoints, this._filterMethod);
    this._renderedPoints = filteredPoints;
  }
}

const getMoneyData = (points, labels) => {
  const dataSet = labels.map((label) => {
    const [, evt] = label.split(` `);
    const eventSum = points.reduce((acc, point) => {
      return point.event === evt ? acc + point.totalPrice : acc;
    }, 0);
    return eventSum;
  });
  return dataSet;
};

const getTransportData = (points, labels) => {
  const dataSet = labels.map((label) => {
    const [, evt] = label.split(` `);
    const eventSum = points.reduce((acc, point) => {
      return point.event === evt ? acc + 1 : acc;
    }, 0);
    return eventSum;
  });
  return dataSet;
};

const getChartLabels = (dict) => {
  const temp = Object.entries(dict).reduce((acc, cur) => {
    acc.push(`${cur[1]} ${cur[0]}`);
    return acc;
  }, []).sort();
  return temp;
};

const sortPoints = (points, method) => {
  switch (method) {
    case `Date`: {
      return sortPointsByDate(points);
    }
    default : {
      return points;
    }
  }
};

const sortPointsByDate = (points) => {
  return [...points].sort((a, b) => {
    return a.date.start - b.date.start;
  });
};

const filterPoints = (points, method) => {
  switch (method) {
    case `Future`: {
      return futurePoints(points);
    }
    case `Past`: {
      return pastPoints(points);
    }
    default: {
      return points;
    }
  }
};

const futurePoints = (points) => {
  return [...points].filter((point) => {
    return point.date.start > Date.now();
  });
};

const pastPoints = (points) => {
  return [...points].filter((point) => {
    return point.date.start < Date.now();
  });
};

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
