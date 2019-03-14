const withPrepositions = (event) => {
  let prep;
  switch (event) {
    case (`Taxi`):
    case (`Bus`):
    case (`Train`):
    case (`Ship`):
    case (`Transport`):
    case (`Drive`):
    case (`Flight`): {
      prep = `to`;
      break;
    }
    case (`Check-in`):
    case (`Sightseeing`):
    case (`Restaurant`): {
      prep = `at`;
      break;
    }
    default: {
      prep = ``;
    }
  }
  return `${event} ${prep}`;
};

const printTime = (start, end) => {
  const startHour = fixMinZeros(start.getHours());
  const startMin = fixMinZeros(start.getMinutes());
  const endHour = fixMinZeros(end.getHours());
  const endMin = fixMinZeros(end.getMinutes());
  return `${startHour}:${startMin} — ${endHour}:${endMin}`;
};

const fixMinZeros = (min) => {
  return min.toString().length === 1 ? `0${min}` : min;
};

export {withPrepositions, printTime};
