export const filterMultiples = (items, path, filters) => {
  let filteredItems = [];
  items.forEach(item => {
    if (filters.includes(item[path])) {
      filteredItems.push(item);
    }
  });
  return filteredItems;
};

export const filterEachFromPath = (items, pathList, filterList) => {
  let filteredItems = items;
  pathList.forEach(l => {
    if (filterList[l.path] && filterList[l.path].length > 0) {
      filteredItems = filterMultiples(
        filteredItems,
        l.path,
        filterList[l.path]
      );
    }
  });
  return filteredItems;
};