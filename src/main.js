import {renderTripInfo, renderTripFilters, addFilterListener} from './components/header';
import {renderSorting, renderTripPoints} from './components/main';
import headerFilterList from './common/header-filter-list';
import mainSortingList from './common/main-sorting-list';
import {getTestPointList} from './mock';
import iconDict from './common/icon-dict';

const testPoints = getTestPointList(6);

const randomPoints = (points) => {
  const temp = points.filter((point) => point.price * Math.random() > point.price * 0.3);
  return [...temp];
};

renderTripInfo(iconDict.Taxi, testPoints);
renderTripFilters(headerFilterList);
renderSorting(mainSortingList);
renderTripPoints(testPoints);
addFilterListener(() => {
  const temp = randomPoints(testPoints);
  renderTripPoints(temp);
});
