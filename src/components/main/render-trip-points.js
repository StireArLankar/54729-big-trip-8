import getDaySection from './get-day-section';

const getDayDifference = (first, last) => {
  const diff = last - first;
  const oneDay = 24 * 60 * 60 * 1000;
  return Math.floor(diff / oneDay);
};

const clearElement = (el) => {
  while (el.children.length > 0) {
    el.removeChild(el.lastChild);
  }
};

const splitPointsToDays = (points, start) => {
  return points.reduce((acc, cur) => {
    let lastDay = acc[acc.length - 1];
    const curDate = cur.model.date.start;
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
  days.forEach((day) => {
    fragment.appendChild(getDaySection(day));
  });

  clearElement(container);
  container.appendChild(fragment);
};

export default renderTripPoints;
