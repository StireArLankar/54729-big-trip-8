import {tripFilter as container} from './containers';

function renderTripFilters(filters) {
  const content = `
    ${filters.map((filter) => `
    <input type="radio" id="filter-${filter.name.toLowerCase()}" name="filter" value=${filter.name.toLowerCase()} ${filter.checked ? `checked` : ``}>
    <label class="trip-filter__item" for="filter-${filter.name.toLowerCase()}">${filter.name}</label>
    `).join(``)}
  `;
  container.innerHTML = content;
}

export default renderTripFilters;
