export const getSortedArrayByTimeAndLevels = array =>
  array
    .sort((b, a) => a.length - b.length)
    .map(item => {
      const time = item.reduce((acc, item) => {
        return acc + item.time;
      }, 0);

      return [time, ...item];
    })
    .sort((b, a) => b[0] - a[0])
    .sort((b, a) => a.length - b.length);
