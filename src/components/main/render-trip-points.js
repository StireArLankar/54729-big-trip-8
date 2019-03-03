import getDaySection from './get-day-section';

const container = document.querySelector(`.trip-points`);

const printDate = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  return `${addPrettyZeros(day)}.${addPrettyZeros(month)}`;
};

const addPrettyZeros = (number) => {
  return number < 10 ? `0${number}` : `${number}`;
};

const clearElement = (el) => {
  while (el.children.length > 0) {
    el.removeChild(el.lastChild);
  }
};

const splitPointsToDays = (points) => {
  return points.reduce((acc, cur) => {
    let lastDay = acc[acc.length - 1];
    const curDate = printDate(cur.date.start);

    if (!lastDay || lastDay.date !== curDate) {
      lastDay = {
        index: acc.length + 1,
        date: curDate,
        points: []
      };

      acc.push(lastDay);
    }

    lastDay.points.push(cur);
    return acc;
  }, []);
};

const renderTripPoints = (points) => {
  const days = splitPointsToDays(points);

  const fragment = document.createDocumentFragment();
  days.forEach((day) => {
    fragment.appendChild(getDaySection(day));
  });

  clearElement(container);
  container.appendChild(fragment);
};

export default renderTripPoints;
