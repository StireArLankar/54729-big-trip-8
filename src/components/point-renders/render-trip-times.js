import getPointsSection from './get-points-section';

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

const renderTripTimes = (points, container) => {
  const times = splitPointsToTimes(points);

  const fragment = document.createDocumentFragment();
  times.forEach((time) => {
    const options = {
      caption: `Time`,
      icon: time.unit,
      label: time.title,
      points: time.points
    };
    fragment.appendChild(getPointsSection(options));
  });

  container.appendChild(fragment);
};

export default renderTripTimes;
