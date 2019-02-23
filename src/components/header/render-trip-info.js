import {trip as container} from './containers';

const iconContainer = container.querySelector(`.trip-icon`);
const pointsContainer = container.querySelector(`.trip__points`);
const datesContainer = container.querySelector(`.trip__dates`);
const costContainer = container.querySelector(`.trip__total-cost`);

function renderTripInfo(icon, points) {
  const len = points.length;

  const cities = points.reduce((acc, cur) => {
    if (acc[acc.length - 1] !== cur.city) {
      acc.push(cur.city);
    }
    return acc;
  }, []);
  const path = cities.reduceRight((acc, cur) => `${cur} — ${acc}`);

  const startDate = getDate(points[0].date.start);
  const endDate = getDate(points[len - 1].date.end);
  const date = `${startDate} — ${endDate}`;

  const total = points.reduce((acc, cur) => acc + cur.price, 0);

  iconContainer.textContent = icon;
  pointsContainer.textContent = path;
  datesContainer.textContent = date;
  costContainer.textContent = `€ ${total}`;
}

function getDate(date) {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

export default renderTripInfo;
