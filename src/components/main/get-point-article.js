import iconDict from '../../common/icon-dict';

const getPointArticle = ({icon, title, date: {start, end}, price, offers}) => {
  const iconEmoji = iconDict[icon];
  const startHour = start.getHours();
  const startMin = start.getMinutes();
  const endHour = end.getHours();
  const endMin = end.getMinutes();
  const diff = end - start;
  const [hour, min] = getTime(diff);

  const article = document.createElement(`article`);
  article.classList.add(`trip-point`);
  article.innerHTML = `
    <i class="trip-icon">${iconEmoji}</i>
    <h3 class="trip-point__title">${title}</h3>
    <p class="trip-point__schedule">
      <span class="trip-point__timetable">${startHour}:${fixMinZeros(startMin)} — ${endHour}:${fixMinZeros(endMin)}</span>
      <span class="trip-point__duration">${hour > 0 ? `${hour}h` : ``} ${min > 0 ? `${min}m` : ``}</span>
    </p>
    <p class="trip-point__price">€ ${price}</p>
    ${offers ? `
      <ul class="trip-point__offers">
        ${offers.map((offer) => `
          <li>
            <button class="trip-point__offer">${offer}</button>
          </li>
        `).join(``)}
      </ul>
    ` : ``}
  `;
  return article;
};

const getTime = (mseconds) => {
  let ms = mseconds;
  const oneHour = 60 * 60 * 1000;
  const oneMin = 60 * 1000;
  const hour = Math.floor(ms / oneHour);
  ms = ms - hour * oneHour;
  const min = Math.floor(ms / oneMin);
  return [hour, min];
};

const fixMinZeros = (min) => {
  return min.toString().length === 1 ? `0${min}` : min;
};

export default getPointArticle;
