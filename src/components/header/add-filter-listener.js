import {tripFilter as container} from './containers';

function addFilterListener(callback) {
  const filters = container.querySelectorAll(`[name=filter]`);
  filters.forEach((filter) => filter.addEventListener(`change`, callback));
}

export default addFilterListener;
