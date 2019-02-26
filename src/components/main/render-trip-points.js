import dayTemplate from './day-template';

const container = document.querySelector(`.trip-points`);

const printDate = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  return `${addPrettyZeros(day)}.${addPrettyZeros(month)}`;
};

const addPrettyZeros = (number) => {
  return number < 10 ? `0${number}` : `${number}`;
};

function renderTripPoints(points) {
  const days = points.reduce((acc, cur) => {
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

  const content = days.map((day) => dayTemplate(day)).join(``);
  container.innerHTML = content;
}

export default renderTripPoints;
