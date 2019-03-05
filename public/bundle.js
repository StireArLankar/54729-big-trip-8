/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/class/point.js":
/*!****************************!*\
  !*** ./src/class/point.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_main_get_point_article__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/main/get-point-article */ "./src/components/main/get-point-article.js");
/* harmony import */ var _components_main_get_point_editing_article__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/main/get-point-editing-article */ "./src/components/main/get-point-editing-article.js");



class Point {
  constructor({
    city,
    icon,
    title,
    price,
    offers,
    date: {
      start,
      end
    },
    pictures,
    description
  }) {
    this.city = city;
    this.icon = icon;
    this.title = title;
    this.price = price;
    this.offers = offers;
    this.date = {
      start: new Date(start),
      end: new Date(end)
    };
    this.pictures = pictures;
    this.description = description;
    this.state = {
      isEditing: false
    };
  }

  render() {
    this._ref = Object(_components_main_get_point_article__WEBPACK_IMPORTED_MODULE_0__["default"])(this);

    this._ref.addEventListener(`click`, this.changeState.bind(this));

    return this._ref;
  }

  changeState() {
    const parent = this._ref.parentNode;
    let temp;

    if (this.state.isEditing) {
      temp = Object(_components_main_get_point_article__WEBPACK_IMPORTED_MODULE_0__["default"])(this);
      temp.addEventListener(`click`, this.changeState.bind(this));
    } else {
      temp = Object(_components_main_get_point_editing_article__WEBPACK_IMPORTED_MODULE_1__["default"])(this);
      const form = temp.querySelector(`form`);
      form.addEventListener(`submit`, evt => {
        evt.preventDefault();
        this.changeState();
      });
      form.addEventListener(`reset`, evt => {
        evt.preventDefault();
        this.changeState();
      });
    }

    this.state.isEditing = !this.state.isEditing;
    parent.replaceChild(temp, this._ref);
    this._ref = temp;
  }

  unmount() {
    const parent = this._ref.parentNode;
    parent.removeChild(this._ref);
    this._ref = null;
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Point);

/***/ }),

/***/ "./src/class/trip.js":
/*!***************************!*\
  !*** ./src/class/trip.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _point__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./point */ "./src/class/point.js");
/* harmony import */ var _components_main__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/main */ "./src/components/main/index.js");
/* harmony import */ var _common_header_filter_list__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/header-filter-list */ "./src/common/header-filter-list.js");
/* harmony import */ var _common_main_sorting_list__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/main-sorting-list */ "./src/common/main-sorting-list.js");
/* harmony import */ var _components_header__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/header */ "./src/components/header/index.js");
/* harmony import */ var _common_icon_dict__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../common/icon-dict */ "./src/common/icon-dict.js");






const container = document.querySelector(`.trip-points`);

class Trip {
  constructor(pointsData) {
    this._points = pointsData.map(data => new _point__WEBPACK_IMPORTED_MODULE_0__["default"](data));
    this._date = {
      start: getStartDate(pointsData),
      end: getEndDate(pointsData)
    };
    this._icon = _common_icon_dict__WEBPACK_IMPORTED_MODULE_5__["default"].Taxi;
  }

  get path() {
    return getPath(this._points);
  }

  get icon() {
    return this._icon;
  }

  get startDate() {
    return this._date.start;
  }

  get endDate() {
    return this._date.end;
  }

  get totalPrice() {
    return this._points.reduce((acc, cur) => acc + cur.price, 0);
  }

  render() {
    Object(_components_main__WEBPACK_IMPORTED_MODULE_1__["renderTripPoints"])(this._points, this.startDate, container);
    Object(_components_header__WEBPACK_IMPORTED_MODULE_4__["renderTripInfo"])(this);
    Object(_components_header__WEBPACK_IMPORTED_MODULE_4__["renderTripFilters"])(_common_header_filter_list__WEBPACK_IMPORTED_MODULE_2__["default"]);
    Object(_components_main__WEBPACK_IMPORTED_MODULE_1__["renderSorting"])(_common_main_sorting_list__WEBPACK_IMPORTED_MODULE_3__["default"]);
  }

  clearTripPoints() {
    this._points.forEach(point => point.unmount());

    container.innerHTML = ``;
  }

}

const getStartDate = points => {
  const temp = points.map(point => point.date.start);
  const min = Math.min(...temp);
  const date = convertToDateStart(min);
  return date;
};

const getEndDate = points => {
  const temp = points.map(point => point.date.end);
  const max = Math.max(...temp);
  const date = convertToDateStart(max);
  return date;
};

const convertToDateStart = number => {
  const date = new Date(number);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  return new Date(year, month, day);
};

const getPath = points => {
  const cities = points.reduce((acc, cur) => {
    if (acc[acc.length - 1] !== cur.city) {
      acc.push(cur.city);
    }

    return acc;
  }, []);
  const path = cities.reduceRight((acc, cur) => `${cur} — ${acc}`);
  return path;
};

/* harmony default export */ __webpack_exports__["default"] = (Trip);

/***/ }),

/***/ "./src/common/header-filter-list.js":
/*!******************************************!*\
  !*** ./src/common/header-filter-list.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const filterList = [{
  name: `Everything`,
  checked: true
}, {
  name: `Future`
}, {
  name: `Past`
}];
/* harmony default export */ __webpack_exports__["default"] = (filterList);

/***/ }),

/***/ "./src/common/icon-dict.js":
/*!*********************************!*\
  !*** ./src/common/icon-dict.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const iconDict = {
  [`Taxi`]: `🚕`,
  [`Bus`]: `🚌`,
  [`Train`]: `🚂`,
  [`Ship`]: `🛳️`,
  [`Transport`]: `🚊`,
  [`Drive`]: `🚗`,
  [`Flight`]: `✈️`,
  [`Check-in`]: `🏨`,
  [`Sightseeing`]: `🏛️`,
  [`Restaurant`]: `🍴`
};
/* harmony default export */ __webpack_exports__["default"] = (iconDict);

/***/ }),

/***/ "./src/common/main-sorting-list.js":
/*!*****************************************!*\
  !*** ./src/common/main-sorting-list.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const filterList = [{
  name: `Event`,
  checked: true
}, {
  name: `Time`
}, {
  name: `Price`
}];
/* harmony default export */ __webpack_exports__["default"] = (filterList);

/***/ }),

/***/ "./src/components/header/add-filter-listener.js":
/*!******************************************************!*\
  !*** ./src/components/header/add-filter-listener.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _containers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./containers */ "./src/components/header/containers.js");


const addFilterListener = callback => {
  const filters = _containers__WEBPACK_IMPORTED_MODULE_0__["tripFilter"].querySelectorAll(`[name=filter]`);
  filters.forEach(filter => filter.addEventListener(`change`, callback));
};

/* harmony default export */ __webpack_exports__["default"] = (addFilterListener);

/***/ }),

/***/ "./src/components/header/containers.js":
/*!*********************************************!*\
  !*** ./src/components/header/containers.js ***!
  \*********************************************/
/*! exports provided: trip, tripFilter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "trip", function() { return trip; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tripFilter", function() { return tripFilter; });
const tripFilter = document.querySelector(`.trip-filter`);
const trip = document.querySelector(`.trip`);


/***/ }),

/***/ "./src/components/header/index.js":
/*!****************************************!*\
  !*** ./src/components/header/index.js ***!
  \****************************************/
/*! exports provided: renderTripInfo, renderTripFilters, addFilterListener */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _render_trip_info__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./render-trip-info */ "./src/components/header/render-trip-info.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "renderTripInfo", function() { return _render_trip_info__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _render_trip_filters__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./render-trip-filters */ "./src/components/header/render-trip-filters.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "renderTripFilters", function() { return _render_trip_filters__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _add_filter_listener__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./add-filter-listener */ "./src/components/header/add-filter-listener.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "addFilterListener", function() { return _add_filter_listener__WEBPACK_IMPORTED_MODULE_2__["default"]; });






/***/ }),

/***/ "./src/components/header/render-trip-filters.js":
/*!******************************************************!*\
  !*** ./src/components/header/render-trip-filters.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _containers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./containers */ "./src/components/header/containers.js");


const renderTripFilters = filters => {
  const content = `
    ${filters.map(filter => `
    <input type="radio" id="filter-${filter.name.toLowerCase()}" name="filter" value=${filter.name.toLowerCase()} ${filter.checked ? `checked` : ``}>
    <label class="trip-filter__item" for="filter-${filter.name.toLowerCase()}">${filter.name}</label>
    `).join(``)}
  `;
  _containers__WEBPACK_IMPORTED_MODULE_0__["tripFilter"].innerHTML = content;
};

/* harmony default export */ __webpack_exports__["default"] = (renderTripFilters);

/***/ }),

/***/ "./src/components/header/render-trip-info.js":
/*!***************************************************!*\
  !*** ./src/components/header/render-trip-info.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _containers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./containers */ "./src/components/header/containers.js");

const iconContainer = _containers__WEBPACK_IMPORTED_MODULE_0__["trip"].querySelector(`.trip-icon`);
const pointsContainer = _containers__WEBPACK_IMPORTED_MODULE_0__["trip"].querySelector(`.trip__points`);
const datesContainer = _containers__WEBPACK_IMPORTED_MODULE_0__["trip"].querySelector(`.trip__dates`);
const costContainer = _containers__WEBPACK_IMPORTED_MODULE_0__["trip"].querySelector(`.trip__total-cost`);

const renderTripInfo = ({
  icon,
  path,
  startDate,
  endDate,
  totalPrice
}) => {
  const date = `${convertDate(startDate)} — ${convertDate(endDate)}`;
  iconContainer.textContent = icon;
  pointsContainer.textContent = path;
  datesContainer.textContent = date;
  costContainer.textContent = `€ ${totalPrice}`;
};

const convertDate = date => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

/* harmony default export */ __webpack_exports__["default"] = (renderTripInfo);

/***/ }),

/***/ "./src/components/main/get-day-section.js":
/*!************************************************!*\
  !*** ./src/components/main/get-day-section.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const getDaySection = ({
  index,
  date,
  points
}) => {
  const section = document.createElement(`section`);
  section.classList.add(`trip-day`);
  section.innerHTML = `
    <article class="trip-day__info">
      <span class="trip-day__caption">Day</span>
      <p class="trip-day__number">${index}</p>
      <h2 class="trip-day__title">${printDate(date)}</h2>
    </article>
  `;
  const items = document.createElement(`div`);
  items.classList.add(`trip-day__items`);
  section.appendChild(items);
  points.forEach(point => {
    items.appendChild(point.render());
  });
  return section; // `
  //   <section class="trip-day">
  //     <div class="trip-day__items">
  //       ${points.map((point) => getPointTemplate(point)).join(``)}
  //     </div>
  //   </section>
  // `;
}; // const printDate = (date) => {
//   const day = date.getDate();
//   const month = date.getMonth() + 1;
//   return `${addPrettyZeros(day)}.${addPrettyZeros(month)}`;
// };
// const addPrettyZeros = (number) => {
//   return number < 10 ? `0${number}` : `${number}`;
// };


const printDate = date => {
  const [, month, day] = date.toDateString().split(` `);
  return `${month} ${day}`;
};

/* harmony default export */ __webpack_exports__["default"] = (getDaySection);

/***/ }),

/***/ "./src/components/main/get-point-article.js":
/*!**************************************************!*\
  !*** ./src/components/main/get-point-article.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _common_icon_dict__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common/icon-dict */ "./src/common/icon-dict.js");


const getPointArticle = ({
  icon,
  title,
  date: {
    start,
    end
  },
  price,
  offers
}) => {
  const iconEmoji = _common_icon_dict__WEBPACK_IMPORTED_MODULE_0__["default"][icon];
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
        ${offers.map(offer => `
          <li>
            <button class="trip-point__offer">${offer}</button>
          </li>
        `).join(``)}
      </ul>
    ` : ``}
  `;
  return article;
};

const getTime = mseconds => {
  let ms = mseconds;
  const oneHour = 60 * 60 * 1000;
  const oneMin = 60 * 1000;
  const hour = Math.floor(ms / oneHour);
  ms = ms - hour * oneHour;
  const min = Math.floor(ms / oneMin);
  return [hour, min];
};

const fixMinZeros = min => {
  return min.toString().length === 1 ? `0${min}` : min;
};

/* harmony default export */ __webpack_exports__["default"] = (getPointArticle);

/***/ }),

/***/ "./src/components/main/get-point-editing-article.js":
/*!**********************************************************!*\
  !*** ./src/components/main/get-point-editing-article.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const getPointEditingArticle = point => {
  const pictures = point.pictures;
  const desc = point.description;
  const price = point.price;
  const article = document.createElement(`article`);
  article.classList.add(`point`);
  article.innerHTML = `
    <form action="" method="get">
      <header class="point__header">
        <label class="point__date">
          choose day
          <input class="point__input" type="text" placeholder="MAR 18" name="day">
        </label>

        <div class="travel-way">
          <label class="travel-way__label" for="travel-way__toggle">✈️</label>

          <input type="checkbox" class="travel-way__toggle visually-hidden" id="travel-way__toggle">

          <div class="travel-way__select">
            <div class="travel-way__select-group">
              <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-taxi" name="travel-way" value="taxi">
              <label class="travel-way__select-label" for="travel-way-taxi">🚕 taxi</label>

              <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-bus" name="travel-way" value="bus">
              <label class="travel-way__select-label" for="travel-way-bus">🚌 bus</label>

              <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-train" name="travel-way" value="train">
              <label class="travel-way__select-label" for="travel-way-train">🚂 train</label>

              <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-flight" name="travel-way" value="train" checked>
              <label class="travel-way__select-label" for="travel-way-flight">✈️ flight</label>
            </div>

            <div class="travel-way__select-group">
              <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-check-in" name="travel-way" value="check-in">
              <label class="travel-way__select-label" for="travel-way-check-in">🏨 check-in</label>

              <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-sightseeing" name="travel-way" value="sight-seeing">
              <label class="travel-way__select-label" for="travel-way-sightseeing">🏛 sightseeing</label>
            </div>
          </div>
        </div>

        <div class="point__destination-wrap">
          <label class="point__destination-label" for="destination">Flight to</label>
          <input class="point__destination-input" list="destination-select" id="destination" value="Chamonix" name="destination">
          <datalist id="destination-select">
            <option value="airport"></option>
            <option value="Geneva"></option>
            <option value="Chamonix"></option>
            <option value="hotel"></option>
          </datalist>
        </div>

        <label class="point__time">
          choose time
          <input class="point__input" type="text" value="00:00 — 00:00" name="time" placeholder="00:00 — 00:00">
        </label>

        <label class="point__price">
          write price
          <span class="point__price-currency">€</span>
          <input class="point__input" type="text" value="${price}" name="price">
        </label>

        <div class="point__buttons">
          <button class="point__button point__button--save" type="submit">Save</button>
          <button class="point__button" type="reset">Delete</button>
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
            <input class="point__offers-input visually-hidden" type="checkbox" id="add-luggage" name="offer" value="add-luggage">
            <label for="add-luggage" class="point__offers-label">
              <span class="point__offer-service">Add luggage</span> + €<span class="point__offer-price">30</span>
            </label>

            <input class="point__offers-input visually-hidden" type="checkbox" id="switch-to-comfort-class" name="offer" value="switch-to-comfort-class">
            <label for="switch-to-comfort-class" class="point__offers-label">
              <span class="point__offer-service">Switch to comfort class</span> + €<span class="point__offer-price">100</span>
            </label>

            <input class="point__offers-input visually-hidden" type="checkbox" id="add-meal" name="offer" value="add-meal">
            <label for="add-meal" class="point__offers-label">
              <span class="point__offer-service">Add meal </span> + €<span class="point__offer-price">15</span>
            </label>

            <input class="point__offers-input visually-hidden" type="checkbox" id="choose-seats" name="offer" value="choose-seats">
            <label for="choose-seats" class="point__offers-label">
              <span class="point__offer-service">Choose seats</span> + €<span class="point__offer-price">5</span>
            </label>
          </div>

        </section>
        <section class="point__destination">
          <h3 class="point__details-title">Destination</h3>
          <p class="point__destination-text">${desc}</p>
          <div class="point__destination-images">
            ${pictures.map(picture => `
            <img src="${picture}" alt="picture from place" class="point__destination-image">
            `).join(``)}
          </div>
        </section>
        <input type="hidden" class="point__total-price" name="total-price" value="">
      </section>
    </form>
  `;
  return article;
};

/* harmony default export */ __webpack_exports__["default"] = (getPointEditingArticle);

/***/ }),

/***/ "./src/components/main/index.js":
/*!**************************************!*\
  !*** ./src/components/main/index.js ***!
  \**************************************/
/*! exports provided: renderSorting, renderTripPoints */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _render_sorting__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./render-sorting */ "./src/components/main/render-sorting.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "renderSorting", function() { return _render_sorting__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _render_trip_points__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./render-trip-points */ "./src/components/main/render-trip-points.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "renderTripPoints", function() { return _render_trip_points__WEBPACK_IMPORTED_MODULE_1__["default"]; });





/***/ }),

/***/ "./src/components/main/render-sorting.js":
/*!***********************************************!*\
  !*** ./src/components/main/render-sorting.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const container = document.querySelector(`.trip-sorting`);

const renderSorting = filters => {
  const content = `
  ${filters.map(filter => `
    <input type="radio" name="trip-sorting" id="sorting-${filter.name.toLowerCase()}" value=${filter.name.toLowerCase()} ${filter.checked ? `checked` : ``}>
    <label class="trip-sorting__item trip-sorting__item--${filter.name.toLowerCase()}" for="sorting-${filter.name.toLowerCase()}">${filter.name}</label>
  `).join(``)}
  <span class="trip-sorting__item trip-sorting__item--offers">Offers</span>
  `;
  container.innerHTML = content;
};

/* harmony default export */ __webpack_exports__["default"] = (renderSorting);

/***/ }),

/***/ "./src/components/main/render-trip-points.js":
/*!***************************************************!*\
  !*** ./src/components/main/render-trip-points.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _get_day_section__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./get-day-section */ "./src/components/main/get-day-section.js");


const getDayDifference = (first, last) => {
  const diff = last - first;
  const oneDay = 24 * 60 * 60 * 1000;
  return Math.floor(diff / oneDay);
};

const clearElement = el => {
  while (el.children.length > 0) {
    el.removeChild(el.lastChild);
  }
};

const splitPointsToDays = (points, start) => {
  return points.reduce((acc, cur) => {
    let lastDay = acc[acc.length - 1];
    const curDate = cur.date.start;
    const isItNewDay = !lastDay || getDayDifference(lastDay.date, curDate) > 0;

    if (isItNewDay) {
      const index = getDayDifference(start, curDate) + 1;
      lastDay = {
        index,
        date: curDate,
        points: []
      };
      acc.push(lastDay);
    }

    lastDay.points.push(cur);
    return acc;
  }, []);
};

const renderTripPoints = (points, start, container) => {
  const days = splitPointsToDays(points, start);
  const fragment = document.createDocumentFragment();
  days.forEach(day => {
    fragment.appendChild(Object(_get_day_section__WEBPACK_IMPORTED_MODULE_0__["default"])(day));
  });
  clearElement(container);
  container.appendChild(fragment);
};

/* harmony default export */ __webpack_exports__["default"] = (renderTripPoints);

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_header__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/header */ "./src/components/header/index.js");
/* harmony import */ var _components_main__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/main */ "./src/components/main/index.js");
/* harmony import */ var _mock__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mock */ "./src/mock/index.js");
/* harmony import */ var _class_trip__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./class/trip */ "./src/class/trip.js");




const testPoints = Object(_mock__WEBPACK_IMPORTED_MODULE_2__["getTestPointList"])(6);

const randomPoints = points => {
  const temp = points.filter(point => point.price * Math.random() > point.price * 0.3);
  return [...temp];
};

const testTrip = new _class_trip__WEBPACK_IMPORTED_MODULE_3__["default"](testPoints);
testTrip.render(); // testTrip.clearTripPoints();

Object(_components_header__WEBPACK_IMPORTED_MODULE_0__["addFilterListener"])(() => {
  const temp = randomPoints(testPoints);
  Object(_components_main__WEBPACK_IMPORTED_MODULE_1__["renderTripPoints"])(temp);
});

/***/ }),

/***/ "./src/mock/city-list.js":
/*!*******************************!*\
  !*** ./src/mock/city-list.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const cityList = [`Amsterdam`, `Geneva`];
/* harmony default export */ __webpack_exports__["default"] = (cityList);

/***/ }),

/***/ "./src/mock/desc-list.js":
/*!*******************************!*\
  !*** ./src/mock/desc-list.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;
const descList = text.split(`.`).map(sentence => {
  return sentence.trim() + `.`;
});
/* harmony default export */ __webpack_exports__["default"] = (descList);

/***/ }),

/***/ "./src/mock/get-test-point.js":
/*!************************************!*\
  !*** ./src/mock/get-test-point.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _desc_list__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./desc-list */ "./src/mock/desc-list.js");
/* harmony import */ var _icon_list__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./icon-list */ "./src/mock/icon-list.js");
/* harmony import */ var _offer_list__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./offer-list */ "./src/mock/offer-list.js");
/* harmony import */ var _city_list__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./city-list */ "./src/mock/city-list.js");





const getRandomIndex = length => {
  return Math.floor(Math.random() * length);
};

const getRandomDate = days => {
  const day = getRandomIndex(days) + 1;
  const hour = getRandomIndex(24) + 1;
  const temp = Date.now() + 1 + day * hour * 60 * 60 * 1000;
  return temp;
};

const getStartAndEnd = () => {
  const start = getRandomDate(4);
  const end = start + Math.floor(Math.random() * 1000 * 60 * 60 + 3);
  return {
    start,
    end
  };
};

const getRandomSet = (length, array) => {
  const len = array.length;
  const temp = new Array(length).fill(1).map(() => array[getRandomIndex(len)]);
  return new Set(temp);
};

const getRandomTitle = (city, icon) => {
  return `${icon} at ${city}`;
};

const getTestPoint = () => {
  const city = _city_list__WEBPACK_IMPORTED_MODULE_3__["default"][getRandomIndex(_city_list__WEBPACK_IMPORTED_MODULE_3__["default"].length)];
  const icon = _icon_list__WEBPACK_IMPORTED_MODULE_1__["default"][getRandomIndex(_icon_list__WEBPACK_IMPORTED_MODULE_1__["default"].length)];
  const date = getStartAndEnd();
  return {
    city,
    icon,
    title: getRandomTitle(city, icon),
    price: 100 * (getRandomIndex(10) + 1),
    offers: [...getRandomSet(2, _offer_list__WEBPACK_IMPORTED_MODULE_2__["default"])],
    date,
    pictures: [`http://picsum.photos/300/150?r=${Math.random()}`, `http://picsum.photos/300/150?r=${Math.random()}`],
    description: [...getRandomSet(3, _desc_list__WEBPACK_IMPORTED_MODULE_0__["default"])].join(` `)
  };
};

/* harmony default export */ __webpack_exports__["default"] = (getTestPoint);

/***/ }),

/***/ "./src/mock/icon-list.js":
/*!*******************************!*\
  !*** ./src/mock/icon-list.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const iconList = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`, `Check-in`, `Sightseeing`, `Restaurant`];
/* harmony default export */ __webpack_exports__["default"] = (iconList);

/***/ }),

/***/ "./src/mock/index.js":
/*!***************************!*\
  !*** ./src/mock/index.js ***!
  \***************************/
/*! exports provided: getTestPoint, getTestPointList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTestPointList", function() { return getTestPointList; });
/* harmony import */ var _get_test_point__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./get-test-point */ "./src/mock/get-test-point.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getTestPoint", function() { return _get_test_point__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _class_point__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../class/point */ "./src/class/point.js");



const getTestPointList = amount => {
  const array = new Array(amount).fill(1);
  return array.map((_el, index) => {
    const point = new _class_point__WEBPACK_IMPORTED_MODULE_1__["default"](Object(_get_test_point__WEBPACK_IMPORTED_MODULE_0__["default"])());
    point.index = index;
    return point;
  }).sort((a, b) => a.date.start - b.date.start);
};



/***/ }),

/***/ "./src/mock/offer-list.js":
/*!********************************!*\
  !*** ./src/mock/offer-list.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const offerList = [`Add luggage`, `Switch to comfort class`, `Add meal`, `Choose seats`];
/* harmony default export */ __webpack_exports__["default"] = (offerList);

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map