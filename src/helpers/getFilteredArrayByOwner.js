export const getFilteredArrayByOwner = arrayByMode => {
  return arrayByMode?.reduce((acc, item) => {
    const callback = item => item.owner;
    let key = callback(item);

    let sublist = acc[key];
    if (!sublist) {
      sublist = [];
      acc[key] = sublist;
    }
    sublist.push(item);

    return acc;
  }, {});
};
