import {convertToDateStart} from './utils';
import {
  renderTripDays,
  renderTripTimes,
  renderTripTypes,
  renderTripPrice
} from '../components/point-renders';

export const sortPoints = (points, method) => {
  switch (method) {
    case `date`: {
      return sortPointsBy(byDate, points);
    }
    case `type`: {
      return points;
    }
    case `time`: {
      return sortPointsBy(byDuration, points);
    }
    case `price`: {
      return sortPointsBy(byPrice, points);
    }
    default : {
      return points;
    }
  }
};

export const sortPointsBy = (callback, points) => {
  return [...points].sort((a, b) => {
    return callback(a) - callback(b);
  });
};

const byDate = (point) => point.date.start;
const byDuration = (point) => point.durationMinutes;
const byPrice = (point) => point.price;

export const filterPoints = (points, method) => {
  switch (method) {
    case `Future`: {
      return filterPointsBy(isFuture, points);
    }
    case `Past`: {
      return filterPointsBy(isPast, points);
    }
    default: {
      return points;
    }
  }
};

const filterPointsBy = (callback, points) => {
  return [...points].filter((point) => {
    return callback(point);
  });
};

const isFuture = (point) => point.date.start > Date.now();
const isPast = (point) => point.date.start < Date.now();

export const getStartDate = (points) => {
  const temp = points.map((point) => point.date.start);
  const min = Math.min(...temp);
  const date = convertToDateStart(min);
  return date;
};

export const getEndDate = (points) => {
  const temp = points.map((point) => point.date.end);
  const max = Math.max(...temp);
  const date = convertToDateStart(max);
  return date;
};

const MAX_TRIPS_IN_TITLE = 5;

export const getPath = (points) => {
  const cities = [...points].sort((a, b) => {
    return a.date.start - b.date.start;
  }).reduce((acc, cur) => {
    if (acc[acc.length - 1] !== cur.destination) {
      acc.push(cur.destination);
    }
    return acc;
  }, []);
  if (cities.length <= MAX_TRIPS_IN_TITLE) {
    const path = cities.reduceRight((acc, cur) => `${cur} — ${acc}`);
    return path;
  } else {
    const firstCities = cities.slice(0, 2);
    const lastCities = cities.slice(-2);
    const path = `${firstCities[0]} — ${firstCities[1]}  — ...  — ${lastCities[0]} — ${lastCities[1]}`;
    return path;
  }
};

export const clearElement = (el) => {
  while (el.children.length > 0) {
    el.removeChild(el.lastChild);
  }
};

export const renderTripPoints = (sortMethod, points, container, startDate) => {
  switch (sortMethod) {
    case `date`: {
      renderTripDays(points, container, startDate);
      break;
    }
    case `type`: {
      renderTripTypes(points, container);
      break;
    }
    case `time`: {
      renderTripTimes(points, container);
      break;
    }
    case `price`: {
      renderTripPrice(points, container);
      break;
    }
    default : {
      renderTripDays(points, container, startDate);
    }
  }
};
