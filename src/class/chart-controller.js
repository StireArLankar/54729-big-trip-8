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
      }
    };
  }

  initCharts(points) {
    this._initMoneyChart(points);
    this._initTransportChart(points);
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

  _updateMoneyChart(points) {
    const [data, labels] = getMoneyStats(points, this.chartLabels);
    this.charts.money.chart.updateChart(data, labels);
  }

  _updateTransportChart(points) {
    const [data, labels] = getTransportStats(points, this.chartLabels);
    this.charts.transport.chart.updateChart(data, labels);
  }

  updateCharts(points) {
    this._updateMoneyChart(points);
    this._updateTransportChart(points);
  }
}

const getMoneyStats = (points, labels) => {
  const dataSet = labels.map((label) => {
    const [, evt] = label.split(` `);
    const eventSum = points.reduce((acc, point) => {
      return point.event === evt ? acc + point.totalPrice : acc;
    }, 0);
    return eventSum;
  });
  return [dataSet, labels];
};

const getTransportStats = (points, labels) => {
  const dataSet = labels.map((label) => {
    const [, evt] = label.split(` `);
    const eventSum = points.reduce((acc, point) => {
      return point.event === evt ? acc + 1 : acc;
    }, 0);
    return eventSum;
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
