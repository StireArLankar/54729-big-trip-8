import {trip as container} from './containers';

const iconContainer = container.querySelector(`.trip-icon`);
const pointsContainer = container.querySelector(`.trip__points`);
const datesContainer = container.querySelector(`.trip__dates`);
const costContainer = container.querySelector(`.trip__total-cost`);

const renderTripInfo = ({icon, path, startDate, endDate, totalPrice}) => {

  const date = `${convertDate(startDate)} — ${convertDate(endDate)}`;

  iconContainer.textContent = icon;
  pointsContainer.textContent = path;
  datesContainer.textContent = date;
  costContainer.textContent = `€ ${totalPrice}`;
};

const convertDate = (date) => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

export default renderTripInfo;
