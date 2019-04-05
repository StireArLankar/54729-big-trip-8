import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const BAR_HEIGHT = 55;

class ChartComponent {
  constructor({title, unit, selector, isUnitSecond}) {
    this._ref = document.querySelector(selector);
    this._chart = null;
    this.title = title;
    this.unit = unit;
    this.labels = null;
    this.dataArray = null;
    this.isUnitSecond = Boolean(isUnitSecond);
  }

  updateChart(data, labels) {
    this.dataArray = data;
    this.labels = labels;
    if (this._chart) {
      this._chart.destroy();
    } else {
      this._ref.height = BAR_HEIGHT * this.labels.length;
    }
    const options = getChartOptions(this);
    this._chart = new Chart(this._ref, options);
  }
}

const getChartOptions = ({isUnitSecond, labels, dataArray: data, unit, title}) => {
  return {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels,
      datasets: [{
        data,
        backgroundColor: `#cce6ff`,
        hoverBackgroundColor: `#99ceff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => isUnitSecond ? `${val} ${unit}` : `${unit} ${val}`
        }
      },
      title: {
        display: true,
        text: title,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  };
};

export default ChartComponent;
