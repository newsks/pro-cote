// Array
const table = [];
table["key"] = 100;
table["key2"] = "Hello";
console.log(table["key"]); // 100
table["key"] = 349;
console.log(table["key"]); // 349
delete table["keys"];
console.log(table["keys"]); // [Function: keys]

// Object
const table = {};
table["key"] = 100;
table["key2"] = "Hello";
console.log(table["key"]); // 100
table["key"] = 349;
console.log(table["key"]); // 349
delete table["key"];
console.log(table["key"]); // undefined

// Map
const table = new Map();
table.set("key", 100);
table.set("key2", "Hello");
console.log(table["key"]); // undefined
console.log(table.get("key")); // 100

const object = { a: 1 };
table.set(object, "A1"); // Map은 Object도 Key로 쓸 수 있다
console.log(table.get(object)); // A1
table.delete(object);
console.log(table.get(object)); // undefined
console.log(table.keys()); // [Map Iterator] { 'key', 'key2' }
console.log(table.values()); // [Map Iterator] { 100, 'Hello' }
table.clear();
console.log(table.values()); //[Map Iterator] {  }

// set
const table = new Set();
table.add("key");
table.add("key2");
console.log(table.has("key")); // true
console.log(table.has("key3")); // false
table.delete("key2");
console.log(table.has("key2")); // false
table.add("key3");
console.log(table.size); // 2
table.clear();
console.log(table.size); // 0
