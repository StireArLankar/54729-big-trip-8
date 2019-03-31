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

const convertToDateStart = (number) => {
  const date = new Date(number);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  return new Date(year, month, day);
};

const printValueWithZero = (value, unit = ``) => {
  if (value === 0) {
    return ``;
  } else if (value < 10) {
    return `0${value}${unit}`;
  } else {
    return `${value}${unit}`;
  }
};

export {withPrepositions, printTime, convertToDateStart, printValueWithZero};
