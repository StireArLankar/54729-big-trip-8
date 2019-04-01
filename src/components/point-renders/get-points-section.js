const getPointsSection = ({caption, icon, label, points}) => {
  const section = document.createElement(`section`);
  section.classList.add(`trip-day`);
  section.innerHTML = `
    <article class="trip-day__info">
      <span class="trip-day__caption">${caption}</span>
      <p class="trip-day__number">${icon}</p>
      <h2 class="trip-day__title"><div>${label}</div></h2>
    </article>
  `;

  const items = document.createElement(`div`);
  items.classList.add(`trip-day__items`);
  section.appendChild(items);
  points.forEach((point) => {
    items.appendChild(point.render());
  });
  return section;
};

export default getPointsSection;
