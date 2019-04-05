import ChartComponent from './chart-component';
import iconDict from '../common/icon-dict';

class ChartController {
  constructor() {
    this.chartLabels = getChartLabels(iconDict);
    this.charts = {
      money: {
        selector: `.statistic__money`,
        title: `Money`,
        unit: `€`
      },
      transport: {
        selector: `.statistic__transport`,
        title: `Transport`,
        unit: `x`
      },
      timeSpend: {
        selector: `.statistic__time-spend`,
        title: `Time distribution`,
        unit: `H`,
        isUnitSecond: true
      }
    };
  }

  initCharts(points) {
    this._initMoneyChart(points);
    this._initTransportChart(points);
    this._initTimeSpendChart(points);
  }

  _initMoneyChart(points) {
    const [data, labels] = getMoneyStats(points, this.chartLabels);

    this.charts.money.data = data;
    this.charts.money.labels = labels;

    this.charts.money.chart = new ChartComponent(this.charts.money);
  }

  _initTransportChart(points) {
    const [data, labels] = getTransportStats(points, this.chartLabels);

    this.charts.transport.data = data;
    this.charts.transport.labels = labels;

    this.charts.transport.chart = new ChartComponent(this.charts.transport);
  }

  _initTimeSpendChart(points) {
    const [data, labels] = getTimeSpendStats(points, this.chartLabels);

    this.charts.timeSpend.data = data;
    this.charts.timeSpend.labels = labels;

    this.charts.timeSpend.chart = new ChartComponent(this.charts.timeSpend);
  }

  _updateMoneyChart(points) {
    const [data, labels] = getMoneyStats(points, this.chartLabels);
    this.charts.money.chart.updateChart(data, labels);
  }

  _updateTransportChart(points) {
    const [data, labels] = getTransportStats(points, this.chartLabels);
    this.charts.transport.chart.updateChart(data, labels);
  }

  _updateTimeSpendChart(points) {
    const [data, labels] = getTimeSpendStats(points, this.chartLabels);
    this.charts.timeSpend.chart.updateChart(data, labels);
  }

  updateCharts(points) {
    this._updateMoneyChart(points);
    this._updateTransportChart(points);
    this._updateTimeSpendChart(points);
  }
}

const getMoneyStats = (points, labels) => {
  const dataSet = labels.map((label) => {
    const [, type] = label.split(` `);
    const typeSum = points.reduce((acc, point) => {
      return point.type === type ? acc + point.totalPrice : acc;
    }, 0);
    return typeSum;
  });
  return [dataSet, labels];
};

const getTransportStats = (points, labels) => {
  const dataSet = labels.map((label) => {
    const [, type] = label.split(` `);
    const typeSum = points.reduce((acc, point) => {
      return point.type === type ? acc + 1 : acc;
    }, 0);
    return typeSum;
  });
  return [dataSet, labels];
};

const getTimeSpendStats = (points, labels) => {
  const dataSet = labels.map((label) => {
    const [, type] = label.split(` `);
    const typeMinutesSum = points.reduce((acc, point) => {
      return point.type === type ? acc + point.durationMinutes : acc;
    }, 0);
    return (Math.round(typeMinutesSum / 60));
  });
  return [dataSet, labels];
};

const getChartLabels = (dict) => {
  const temp = Object.entries(dict).reduce((acc, cur) => {
    acc.push(`${cur[1]} ${cur[0]}`);
    return acc;
  }, []).sort();
  return temp;
};

export default ChartController;
