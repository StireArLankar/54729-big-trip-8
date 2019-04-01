import getPointsSection from './get-points-section';

const renderTripPrice = (points, container) => {
  const options = {
    caption: `Price`,
    icon: `€`,
    label: `Price`,
    points
  };

  const fragment = document.createDocumentFragment();
  fragment.appendChild(getPointsSection(options));

  container.appendChild(fragment);
};

export default renderTripPrice;
