const array = [1, 1, 5, 124, 400, 500, 1004, 2876, 8712];
function binarySearch(array, findValue) {
  let left = 0;
  let right = array.length - 1;
  let mid = Math.floor((left + right) / 2);
  while (left <= right) {
    if (array[mid] === findValue) {
      return mid;
    }
    if (array[mid] < findValue) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
    mid = Math.floor((right + left) / 2);
  }
  return -1;
}

console.log(binarySearch(array, 2876));
console.log(binarySearch(array, 1));
console.log(binarySearch(array, 500));
