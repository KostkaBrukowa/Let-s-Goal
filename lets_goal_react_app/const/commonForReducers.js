// removes duplicate objects with some key as comparator, favourites last elemtns
// if there are two obejcts function will delete one that has lower index
export function uniqueObjects(array, propertyName) {
  return array
    .reverse()
    .filter((e, i) => array.findIndex(a => a[propertyName] === e[propertyName]) === i);
}
