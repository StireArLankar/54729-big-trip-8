import pointTemplate from './point-template';

function dayTemplate({index, date, points}) {
  return `
    <section class="trip-day">
      <article class="trip-day__info">
        <span class="trip-day__caption">Day</span>
        <p class="trip-day__number">${index}</p>
        <h2 class="trip-day__title">${date}</h2>
      </article>

      <div class="trip-day__items">
        ${points.map((point) => pointTemplate(point)).join(``)}
      </div>
    </section>
  `;
}

export default dayTemplate;
