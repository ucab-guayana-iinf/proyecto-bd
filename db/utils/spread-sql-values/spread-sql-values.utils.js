const v = s => {
  if (typeof s === 'string') {
    return `'${s}'`;
  }
  if (typeof s === 'number') {
    return s;
  }
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

module.exports = { spread };
