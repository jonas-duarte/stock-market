export function findObject(object, path) {
  var pathList = path.split(".");
  var obj = object;
  for (let i = 0; i < pathList.length; i++) {
    obj = obj[pathList[i]];
  }
  return obj;
}
