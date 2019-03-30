import iconDict from '../../common/icon-dict';
import eventList from '../../common/event-list';
import {withPrepositions} from '../../common/utils';

const getPointEditingArticle = (point, destinationsArray, offersArray) => {
  const pictures = point.pictures;
  const desc = point.description;
  const price = point.price;
  const evnt = point.event;
  const offers = point.offers;
  const destination = point.destination;

  const article = document.createElement(`article`);
  article.classList.add(`point`);

  const offersList = offers.map((offer) => {
    const id = offer.title.toLowerCase().replace(` `, `-`);
    return `
      <input class="point__offers-input visually-hidden" type="checkbox" id="${id}" name="offer" value="${offer.title}" ${offer.accepted ? `checked` : ``}>
      <label for="${id}" class="point__offers-label">
        <span class="point__offer-service">${offer.title}</span> + €<span class="point__offer-price">${offer.price}</span>
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

  const destinationList = destinationsArray.map((dest) => {
    return `<option value='${dest.name}'></option>`;
  }).join(``);

  article.innerHTML = `
    <form action="" method="get">
      <header class="point__header">
        ${travelWay}

        <div class="point__destination-wrap">
          <label class="point__destination-label" for="destination">${withPrepositions(evnt)}</label>
          <input class="point__destination-input" list="destination-select" id="destination" value="${destination}" name="destination">
          <datalist id="destination-select">
            ${destinationList}
          </datalist>
        </div>

        <div class="point__time">
          choose time
          <input class="point__input" type="text" value="19:00" name="date-start" placeholder="19:00">
          <span class="point__span">  —  </span>
          <input class="point__input" type="text" value="21:00" name="date-end" placeholder="21:00">
        </div>

        <label class="point__price">
          write price
          <span class="point__price-currency">€</span>
          <input class="point__input" type="text" value="${price}" name="price">
        </label>

        <div class="point__buttons">
          <button class="point__button point__button--save" type="button">Save</button>
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
            <img src="${picture.src}" alt="${picture.description}" class="point__destination-image">
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

  const upgradeOffers = (evt) => {
    const value = evt.target.value;
    const offersWrap = article.querySelector(`.point__offers-wrap`);
    const newDiv = document.createElement(`div`);
    newDiv.classList.add(`point__offers-wrap`);
    newDiv.innerHTML = getOffers(value, offersArray);
    offersWrap.parentNode.replaceChild(newDiv, offersWrap);
  };

  const upgradeLabelsAndOffers = (evt) => {
    upgradeLabels(evt);
    upgradeOffers(evt);
  };

  const radioWayElements = article.querySelectorAll(`.travel-way__select-input`);
  radioWayElements.forEach((element) => {
    element.addEventListener(`change`, upgradeLabelsAndOffers);
  });

  const onDestinationChange = (evt) => {
    const index = destinationsArray.findIndex((dest) => dest.name === evt.target.value);
    if (index > -1) {
      upgradeDestination(destinationsArray[index]);
    }
  };

  const upgradeDestination = (dest) => {
    const destinationWrap = article.querySelector(`.point__destination`);
    const newDiv = document.createElement(`section`);
    newDiv.classList.add(`point__destination`);
    newDiv.innerHTML = printDestination(dest);
    destinationWrap.parentNode.replaceChild(newDiv, destinationWrap);
  };

  const destInput = article.querySelector(`.point__destination-input`);
  destInput.addEventListener(`change`, onDestinationChange);

  return article;
};

const getOffers = (value, offersArray) => {
  const index = offersArray.findIndex((offers) => offers.type === value.toLowerCase());
  return printOffers(offersArray[index].offers);
};

const printOffers = (array) => {
  return array.map((offer) => {
    const id = offer.name.toLowerCase().replace(` `, `-`);
    return `
      <input class="point__offers-input visually-hidden" type="checkbox" id="${id}" name="offer" value="${offer.name}">
      <label for="${id}" class="point__offers-label">
        <span class="point__offer-service">${offer.name}</span> + €<span class="point__offer-price">${offer.price}</span>
      </label>
    `;
  }).join(``);
};

const printDestination = (destination) => {
  return `
    <h3 class="point__details-title">Destination</h3>
    <p class="point__destination-text">${destination.description}</p>
    <div class="point__destination-images">
      ${destination.pictures.map((picture) => `
      <img src="${picture.src}" alt="${picture.description}" class="point__destination-image">
      `).join(``)}
    </div>
  `;
};

export default getPointEditingArticle;
