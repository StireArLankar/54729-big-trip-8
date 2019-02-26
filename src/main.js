import {renderTripInfo, renderTripFilters, addFilterListener} from './components/header';
import {renderSorting, renderTripPoints} from './components/main';
import headerFilterList from './common/header-filter-list';
import mainSortingList from './common/main-sorting-list';

const emoji = [`🚕`, `✈`, `🏨`, `⛰`];
const testPoints = [
  {
    city: `Amsterdam`,
    icon: emoji[0],
    title: `Taxi to Airport`,
    price: 500,
    date: {
      start: new Date(`December 18, 2018 03:50:00`),
      end: new Date(`December 18, 2018 04:50:00`)
    },
    offers: [
      `Order UBER +€ 20`,
      `Upgrade to business +€ 20`
    ]
  },
  {
    city: `Purgatory`,
    icon: emoji[1],
    title: `Flight to Purgatory`,
    price: 50,
    date: {
      start: new Date(`December 18, 2018 12:00:00`),
      end: new Date(`December 18, 2018 12:50:00`)
    },
    offers: [
      `Order UBER +€ 20`,
      `Upgrade to business +€ 20`
    ]
  },
  {
    city: `Hell`,
    icon: emoji[2],
    title: `Road to Hell`,
    price: 500,
    date: {
      start: new Date(`December 18, 2018 13:40:00`),
      end: new Date(`December 18, 2018 14:50:00`)
    },
    offers: [
      `Add breakfast +€ 20`
    ]
  },
  {
    city: `Hell`,
    icon: emoji[0],
    title: `Drive to Pot`,
    price: 300,
    date: {
      start: new Date(`December 18, 2018 15:40:00`),
      end: new Date(`December 18, 2018 17:50:00`)
    },
    offers: [
      `Order UBER +€ 20`,
      `Rent a car +€ 200`
    ]
  },
  {
    city: `DisneyLand`,
    icon: emoji[0],
    title: `Chu-chu-chu`,
    price: 300,
    date: {
      start: new Date(`December 18, 2018 23:40:00`),
      end: new Date(`December 19, 2018 00:50:00`)
    },
    offers: [
      `Order UBER +€ 20`,
      `Rent a car +€ 200`
    ]
  },
  {
    city: `Houston`,
    icon: emoji[1],
    title: `We have problems!`,
    price: 200,
    date: {
      start: new Date(`December 19, 2018 10:40:00`),
      end: new Date(`December 19, 2018 10:50:00`)
    },
    offers: [
      `Order UBER +€ 20`,
      `Rent a car +€ 200`
    ]
  },
  {
    city: `Houston`,
    icon: emoji[2],
    title: `We have problems!`,
    price: 200,
    date: {
      start: new Date(`December 19, 2018 11:40:00`),
      end: new Date(`December 19, 2018 11:50:00`)
    },
    offers: [
      `Order UBER +€ 20`,
      `Rent a car +€ 200`
    ]
  }
];

renderTripInfo(emoji[0], testPoints);
renderTripFilters(headerFilterList);
renderSorting(mainSortingList);
renderTripPoints(testPoints);
addFilterListener(() => {
  const temp = randomPoints(testPoints);
  renderTripPoints(temp);
});

function randomPoints(points) {
  const temp = points.filter((point) => point.price * Math.random() > point.price * 0.3);
  return [...temp];
}
