const v = (s) => {
  if (typeof s === 'string') {
    return `'${s}'`;
  }
  if (typeof s === 'number' || typeof s === 'boolean') {
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

const getKeys = (obj = {}, keys = []) => {
  return Object.keys(obj).filter(key => keys.includes(key));
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

const validateInput = (data, neededAttributes, onError) => {
  const keys = getKeys(data, neededAttributes);
  const validString = /^(?!\s*$).+/gi;
  if (!neededAttributes.every(key => keys.includes(key) && String(data[key]).match(validString))) {
    onError('Debe llenar todos los campos');
    return false;
  }
  return true;
};


module.exports = {
  spread,
  spreadObj,
  spreadObjKeys,
  spreadObjValues,
  getKeys,
  validateInput,
};
