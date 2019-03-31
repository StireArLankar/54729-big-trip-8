import getPointsSection from './get-points-section';
import iconDict from '../../common/icon-dict';

const splitPointsToTypes = (points, iconsDict) => {
  const types = Object.entries(iconsDict).map((entry) => {
    const filteredPoints = points.filter((point) => point.type === entry[0]);
    const type = {
      icon: entry[1],
      type: entry[0],
      points: filteredPoints
    };
    return type;
  });
  return types.filter((type) => type.points.length > 0);
};

const renderTripTypes = (points, container) => {
  const types = splitPointsToTypes(points, iconDict);

  const fragment = document.createDocumentFragment();
  types.forEach((type) => {
    const options = {
      caption: `Type`,
      icon: type.icon,
      label: type.type,
      points: type.points
    };
    fragment.appendChild(getPointsSection(options));
  });

  container.appendChild(fragment);
};

export default renderTripTypes;
