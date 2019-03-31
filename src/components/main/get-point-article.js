import iconDict from '../../common/icon-dict';
import {printTime, withPrepositions, printValueWithZero} from '../../common/utils';


const getPointArticle = ({event, destination, date: {start, end}, price, offers}) => {
  const iconEmoji = iconDict[event];
  const diff = end - start;
  const [day, hour, min] = getTime(diff);
  const title = `${withPrepositions(event)} ${destination}`;

  const offersList = offers.map((offer) => {
    return offer.accepted ? `
      <li>
        <button class="trip-point__offer">${offer.title} € ${offer.price}</button>
      </li>
    ` : ``;
  }).join(``);

  const article = document.createElement(`article`);
  article.classList.add(`trip-point`);
  article.innerHTML = `
    <i class="trip-icon">${iconEmoji}</i>
    <h3 class="trip-point__title">${title}</h3>
    <p class="trip-point__schedule">
      <span class="trip-point__timetable">${printTime(start, end)}</span>
      <span class="trip-point__duration">${printDuration(day, hour, min)}</span>
    </p>
    <p class="trip-point__price">€ ${price}</p>
    <ul class="trip-point__offers">
      ${offersList}
    </ul>
  `;
  return article;
};

const printDuration = (day, hour, min) => {
  let string = ``;
  if (day > 0) {
    string = string + printValueWithZero(day, `D`) + ` `;
  }
  if (day > 0 || hour > 0) {
    string = string + printValueWithZero(hour, `H`) + ` `;
  }
  string = string + printValueWithZero(min, `M`);
  return string;
};

const getTime = (mseconds) => {
  let ms = mseconds;
  const oneDay = 24 * 60 * 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const oneMin = 60 * 1000;
  const day = Math.floor(ms / oneDay);
  ms = ms - day * oneDay;
  const hour = Math.floor(ms / oneHour);
  ms = ms - hour * oneHour;
  const min = Math.floor(ms / oneMin);
  return [day, hour, min];
};

export default getPointArticle;
