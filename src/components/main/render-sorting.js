const container = document.querySelector(`.trip-sorting`);

const renderSorting = (filters) => {
  const content = `
  ${filters.map((filter) => `
    <input type="radio" name="trip-sorting" id="sorting-${filter.name.toLowerCase()}" value=${filter.name.toLowerCase()} ${filter.checked ? `checked` : ``}>
    <label class="trip-sorting__item trip-sorting__item--${filter.name.toLowerCase()}" for="sorting-${filter.name.toLowerCase()}">${filter.name}</label>
  `).join(``)}
  <span class="trip-sorting__item trip-sorting__item--offers">Offers</span>
  `;
  container.innerHTML = content;
};

export default renderSorting;
