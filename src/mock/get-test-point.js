import descList from './desc-list';
import iconList from './icon-list';
import offerList from './offer-list';
import cityList from './city-list';

const getRandomIndex = (length) => {
  return Math.floor(Math.random() * length);
};

const getRandomDate = (days) => {
  const day = getRandomIndex(days) + 1;
  const hour = getRandomIndex(24) + 1;
  const temp = Date.now() + 1 + day * hour * 60 * 60 * 1000;
  return temp;
};

const getStartAndEnd = () => {
  const start = getRandomDate(4);
  const end = start + Math.floor(Math.random() * 1000 * 60 * 60 + 3);
  return {start, end};
};

const getRandomSet = (length, array) => {
  const len = array.length;
  const temp = (new Array(length).fill(1)).map(() => array[getRandomIndex(len)]);
  return (new Set(temp));
};

const getRandomTitle = (city, icon) => {
  return `${icon} at ${city}`;
};

const getTestPoint = () => {
  const city = cityList[getRandomIndex(cityList.length)];
  const icon = iconList[getRandomIndex(iconList.length)];
  const date = getStartAndEnd();

  return {
    city,
    icon,
    title: getRandomTitle(city, icon),
    price: 100 * (getRandomIndex(10) + 1),
    offers: [...getRandomSet(2, offerList)],
    date,
    picture: `http://picsum.photos/300/150?r=${Math.random()}`,
    description: [...getRandomSet(3, descList)].join(` `)
  };
};

export default getTestPoint;