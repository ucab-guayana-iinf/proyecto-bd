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
      return `(${v(value)} `;
    }

    if (index === arr.length) {
      return `${v(value)})`;
    }

    return `${v(value)}, `;
  })}
`;

/* expects array of
  [
    { attribute, value }
  ]

  returns:

  attribute=value, attribute=value...
*/
const updateSpread = (arr = []) => `
  ${arr.map(({ attribute, value }, index) => {
    if (index === arr.length) {
      return `${attribute}=${v(value)}`;
    }

    return `${attribute}=${v(value)}, `;
  })}
`;

module.exports = {
  spread,
  updateSpread,
};
