import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const BAR_HEIGHT = 55;

class ChartComponent {
  constructor({name, unit, selector, labels, data}) {
    this._ref = document.querySelector(selector);
    this._chart = null;
    this.name = name;
    this.unit = unit;
    this.labels = labels;
    this.data = data;
  }

  updateChart(data) {
    this.data = data;
    if (this._chart) {
      this._chart.destroy();
    } else {
      this._ref.height = BAR_HEIGHT * this.labels.length;
    }
    const options = getChartOptions(this);
    this._chart = new Chart(this._ref, options);
  }
}

const getChartOptions = ({labels, data, unit, name}) => {
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
          formatter: (val) => `${unit} ${val}`
        }
      },
      title: {
        display: true,
        text: name,
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
