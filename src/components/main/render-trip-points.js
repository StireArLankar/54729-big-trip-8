import getDaySection from './get-day-section';
import getTypeSection from './get-type-section';
import getTimeSection from './get-time-section';
import getPriceSection from './get-price-section';
import {convertToDateStart} from '../../common/utils';
import iconDict from '../../common/icon-dict';

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

const splitPointsToTypes = (points, iconsDict) => {
  const types = Object.entries(iconsDict).map((entry) => {
    const filteredPoints = points.filter((point) => point.event === entry[0]);
    const type = {
      icon: entry[1],
      type: entry[0],
      points: filteredPoints
    };
    return type;
  });
  return types.filter((type) => type.points.length > 0);
};

const splitPointsToTimes = (points) => {
  const units = [
    {
      unit: `M`,
      title: `Minutes`,
      points: points.filter((point) => point.durationMinutes < 60)
    },
    {
      unit: `H`,
      title: `Hours`,
      points: points.filter((point) => point.durationMinutes >= 60 && point.durationMinutes < 60 * 24)
    },
    {
      unit: `D`,
      title: `Days`,
      points: points.filter((point) => point.durationMinutes >= 24 * 60)
    }
  ];
  return units.filter((unit) => unit.points.length > 0);
};

const renderTripDayPoints = (points, container, start) => {
  const days = splitPointsToDays(points, start);

  const fragment = document.createDocumentFragment();
  days.forEach((day) => {
    fragment.appendChild(getDaySection(day));
  });

  clearElement(container);
  container.appendChild(fragment);
};

const renderTripTypePoints = (points, container) => {
  const types = splitPointsToTypes(points, iconDict);

  const fragment = document.createDocumentFragment();
  types.forEach((type) => {
    fragment.appendChild(getTypeSection(type));
  });

  clearElement(container);
  container.appendChild(fragment);
};

const renderTripTimePoints = (points, container) => {
  const times = splitPointsToTimes(points);

  const fragment = document.createDocumentFragment();
  times.forEach((time) => {
    fragment.appendChild(getTimeSection(time));
  });

  clearElement(container);
  container.appendChild(fragment);
};

const renderTripPricePoints = (points, container) => {
  const temp = {
    points
  };
  const fragment = document.createDocumentFragment();
  fragment.appendChild(getPriceSection(temp));

  clearElement(container);
  container.appendChild(fragment);
};

export {renderTripDayPoints, renderTripTypePoints, renderTripTimePoints, renderTripPricePoints};
