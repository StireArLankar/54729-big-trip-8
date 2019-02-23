import dayTemplate from './day-template';

const container = document.querySelector(`.trip-points`);

function renderTripPoints(points) {
  const days = points.reduce((acc, cur) => {
    const lastIndex = acc.length - 1;
    if (lastIndex === -1 || acc[lastIndex].date !== `${cur.date.start.getMonth() + 1}.${cur.date.start.getDate()}`) {
      const obj = {
        index: acc.length + 1,
        date: `${cur.date.start.getDate()}.${cur.date.start.getMonth() + 1}`,
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
