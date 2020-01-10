const mysqlDatetimeToJS = (datetime) => {
  const dateTimeParts = response.fecha_jefe.split(/[- :]/);
  dateTimeParts[1]--;
  return new Date(...dateTimeParts);
};

const mysqlDateToJS = (date) => {
  const [year, month, day] = [...date.split('-')]
  const monthIndex = month - 1;
  return new Date(year, monthIndex, day)
};

export {
  mysqlDateToJS,
  mysqlDatetimeToJS,
};
