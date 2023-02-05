export const findUserById = (array, userID) => {
  return array.findIndex((item, idx) => {
    return item[1].owner === userID;
  });
};
