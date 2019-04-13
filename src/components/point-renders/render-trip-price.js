import getPointsSection from './get-points-section';

const renderTripPrice = (points, container) => {
  const options = {
    caption: `Price`,
    icon: `€`,
    label: `Price`,
    points
  };

  container.appendChild(getPointsSection(options));
};

export default renderTripPrice;
