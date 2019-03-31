import getPointsSection from './get-points-section';
import {convertToDateStart} from '../../common/utils';

const getDayDifference = (first, last) => {
  const diff = last - first;
  const oneDay = 24 * 60 * 60 * 1000;
  return Math.floor(diff / oneDay);
};

const printDate = (date) => {
  const [, month, day] = date.toDateString().split(` `);
  return `${month} ${day}`;
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
        date: convertToDateStart(curDate),
        points: []
      };

      acc.push(lastDay);
    }

    lastDay.points.push(cur);
    return acc;
  }, []);
};

const renderTripDays = (points, container, start) => {
  const days = splitPointsToDays(points, start);
  const fragment = document.createDocumentFragment();

  days.forEach((day) => {
    const options = {
      caption: `Day`,
      icon: day.index,
      label: printDate(day.date),
      points: day.points
    };
    fragment.appendChild(getPointsSection(options));
  });

  container.appendChild(fragment);
};

export default renderTripDays;

