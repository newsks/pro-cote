const arr1 = new Array();
const arr2 = [];
const arr3 = [1, 2, 3, 4, 5];
const arr4 = new Array(5);
const arr5 = new Array(5).fill(5);
const arr6 = Array.from(Array(5), function (value, index) {
  return index + 1;
});

const arr7 = Array.from({ length: 5 }, (_, i) => i);
console.log(arr7);
