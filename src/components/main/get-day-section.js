const getDaySection = ({index, date, points}) => {
  const section = document.createElement(`section`);
  section.classList.add(`trip-day`);
  section.innerHTML = `
    <article class="trip-day__info">
      <span class="trip-day__caption">Day</span>
      <p class="trip-day__number">${index}</p>
      <h2 class="trip-day__title">${printDate(date)}</h2>
    </article>
  `;

  const items = document.createElement(`div`);
  items.classList.add(`trip-day__items`);
  section.appendChild(items);
  points.forEach((point) => {
    items.appendChild(point.render());
  });
  return section;
  // `
  //   <section class="trip-day">
  //     <div class="trip-day__items">
  //       ${points.map((point) => getPointTemplate(point)).join(``)}
  //     </div>
  //   </section>
  // `;
};

// const printDate = (date) => {
//   const day = date.getDate();
//   const month = date.getMonth() + 1;
//   return `${addPrettyZeros(day)}.${addPrettyZeros(month)}`;
// };

// const addPrettyZeros = (number) => {
//   return number < 10 ? `0${number}` : `${number}`;
// };

const printDate = (date) => {
  const [, month, day] = date.toDateString().split(` `);
  return `${month} ${day}`;
};

export default getDaySection;
