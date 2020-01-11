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

const jsDateToMysql = (date) => {
  return (new Date(date)).toISOString().slice(0,9).replace('T',' ')

};

const jsDatetimeToMysql = (datetime) => {
  return (new Date(datetime)).toISOString().slice(0,19).replace('T',' ')
};

export {
  mysqlDateToJS,
  mysqlDatetimeToJS,
  jsDateToMysql,
  jsDatetimeToMysql
};
