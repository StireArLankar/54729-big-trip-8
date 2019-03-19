import iconDict from '../../common/icon-dict';
import eventList from '../../mock/event-list';
import {withPrepositions, printTime} from '../../common/utils';

const getPointEditingArticle = (point) => {
  const pictures = point.pictures;
  const desc = point.description;
  const price = point.price;
  const evnt = point.event;
  const offers = point.offers;
  const destination = point.destination;
  const start = point.date.start;
  const end = point.date.end;
  const article = document.createElement(`article`);
  article.classList.add(`point`);

  const offersList = offers.map((offer) => {
    const id = offer.name.toLowerCase().replace(` `, `-`);
    return `
      <input class="point__offers-input visually-hidden" type="checkbox" id="${id}" name="offer" value="${offer.name}" ${offer.checked ? `checked` : ``}>
      <label for="${id}" class="point__offers-label">
        <span class="point__offer-service">${offer.name}</span> + €<span class="point__offer-price">${offer.price}</span>
      </label>
    `;
  }).join(``);

  const travelRadio = eventList.map((evt) => {
    return `
      <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-${evt.toLowerCase()}" name="travel-way" value="${evt}" ${evt === point.event ? `checked` : ``}>
      <label class="travel-way__select-label" for="travel-way-${evt.toLowerCase()}">${iconDict[evt]} ${evt}</label>
    `;
  }).join(``);

  const travelWay = `
    <div class="travel-way">
      <label class="travel-way__label" for="travel-way__toggle">${iconDict[evnt]}</label>

      <input type="checkbox" class="travel-way__toggle visually-hidden" id="travel-way__toggle">

      <div class="travel-way__select">
        <div class="travel-way__select-group">
          ${travelRadio}
        </div>
      </div>
    </div>
  `;

  article.innerHTML = `
    <form action="" method="get">
      <header class="point__header">
        <label class="point__date">
          choose day
          <input class="point__input" type="text" placeholder="MAR 18" name="day">
        </label>

        ${travelWay}

        <div class="point__destination-wrap">
          <label class="point__destination-label" for="destination">${withPrepositions(evnt)}</label>
          <input class="point__destination-input" list="destination-select" id="destination" value=${destination} name="destination">
          <datalist id="destination-select">
            <option value="airport"></option>
            <option value="Geneva"></option>
            <option value="Chamonix"></option>
            <option value="hotel"></option>
          </datalist>
        </div>

        <label class="point__time">
          choose time
          <input class="point__input" type="text" value="${printTime(start, end)}" name="time" placeholder="00:00 — 00:00">
        </label>

        <label class="point__price">
          write price
          <span class="point__price-currency">€</span>
          <input class="point__input" type="text" value="${price}" name="price">
        </label>

        <div class="point__buttons">
          <button class="point__button point__button--save" type="submit">Save</button>
          <button class="point__button point__button--delete" type="button">Delete</button>
        </div>

        <div class="paint__favorite-wrap">
          <input type="checkbox" class="point__favorite-input visually-hidden" id="favorite" name="favorite">
          <label class="point__favorite" for="favorite">favorite</label>
        </div>
      </header>

      <section class="point__details">
        <section class="point__offers">
          <h3 class="point__details-title">offers</h3>

          <div class="point__offers-wrap">
            ${offersList}
          </div>

        </section>
        <section class="point__destination">
          <h3 class="point__details-title">Destination</h3>
          <p class="point__destination-text">${desc}</p>
          <div class="point__destination-images">
            ${pictures.map((picture) => `
            <img src="${picture}" alt="picture from place" class="point__destination-image">
            `).join(``)}
          </div>
        </section>
        <input type="hidden" class="point__total-price" name="total-price" value="">
      </section>
    </form>
  `;

  const wayLabel = article.querySelector(`.travel-way__label`);
  const destLabel = article.querySelector(`.point__destination-label`);

  const upgradeLabels = (evt) => {
    const value = evt.target.value;
    wayLabel.innerHTML = iconDict[value];
    destLabel.innerHTML = withPrepositions(value);
  };

  const radioWayElements = article.querySelectorAll(`.travel-way__select-input`);
  radioWayElements.forEach((element) => {
    element.addEventListener(`change`, upgradeLabels);
  });

  return article;
};

export default getPointEditingArticle;
