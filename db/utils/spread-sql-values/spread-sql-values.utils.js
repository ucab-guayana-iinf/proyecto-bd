const v = (s) => {
  if (typeof s === 'string') {
    return `'${s}'`;
  }
  if (typeof s === 'number') {
    return s;
  }

  return null;
};

const spread = (arr = []) => `
  ${arr.map((value, index) => {
    if (index === 0) {
      return `(${v(value)}, `;
    }

    if (index === arr.length - 1) {
      return `${v(value)})`;
    }

    return `${v(value)}, `;
  })}
`;


// expects object and spreads:
// (key=value, key=value...)
const spreadObj = (obj = {}, keys = []) => {
  let output = '';

  Object.keys(obj).filter(key => keys.includes(key)).forEach((key, index, arr) => {
    const value = obj[key];

    if (index === arr.length - 1) {
      output += `\`${key}\` = ${v(value)}`;
      return;
    }

    output += `\`${key}\` = ${v(value)}, `;
    return;
  });

  return output;
}

// expects object and spreads it's keys
const spreadObjKeys = (obj = {}, keys = []) => {
  let output = '';

  Object.keys(obj).filter(key => keys.includes(key)).forEach((key, index, arr) => {
    if (index === 0) {
      output += `(${key}, `;
      return;
    }

    if (index === arr.length - 1) {
      output += `${key})`;
      return;
    }

    output += `${key}, `;
    return;
  });

  return output;
};

// expects object and spreads it's values
const spreadObjValues = (obj = {}, keys = []) => {
  let output = '';


  Object.keys(obj).filter(key => keys.includes(key)).forEach((key, index, arr) => {
    const value = obj[key];

    if (index === 0) {
      output += `(${v(value)}, `;
      return;
    }

    if (index === arr.length - 1) {
      output += `${v(value)})`;
      return;
    }

    output += `${v(value)}, `;
    return;
  });

  return output;
}

module.exports = {
  spread,
  spreadObj,
  spreadObjKeys,
  spreadObjValues,
};
