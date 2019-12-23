const asyncForEach = async (arr, cb) => {
  for (let i = 0; i < arr.length; i += 1) {
    await cb(arr[i], i, arr);
  }
};

module.exports = { asyncForEach };
