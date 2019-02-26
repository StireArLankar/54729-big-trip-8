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
  const days = points.reduce((acc, cur, index) => {
    const lastIndex = acc.length - 1;
    const curDate = printDate(cur.date.start);

    if (index === 0 || acc[lastIndex].date !== curDate) {
      const obj = {
        index: acc.length + 1,
        date: curDate,
        points: [cur]
      };
      acc.push(obj);
    } else {
      acc[lastIndex].points.push(cur);
    }
    return acc;
  }, []);

  const content = days.map((day) => dayTemplate(day)).join(``);
  container.innerHTML = content;
}

export default renderTripPoints;
