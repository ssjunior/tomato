export const anyListItemInAnotherList = (firstList = [], secondList = []) => {
  return firstList.some(item => secondList.includes(item));
};

export const allListItemInAnotherList = (firstList, secondList) => {
  return secondList.every(item => firstList.includes(item));
};
