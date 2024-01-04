const obj = { name: "ssk", company: "naver" };

obj["email"] = "ssk@naver.com";

// for in
for (const key in obj) {
  console.log(key, obj[key]); // [ 'name', 'company', 'email' ]["ssk", "naver", "ssk@naver.com"];
}

// in
console.log("email" in obj); // true
console.log("phone" in obj); // false

// keys
console.log(Object.keys(obj)); // [ 'name', 'company', 'email' ]

// values
console.log(Object.values(obj)); // [ 'ssk', 'naver', 'ssk@naver.com' ]

// obj.phone = "010-1234-5678";
// console.log(obj); // { name: 'ssk', company: 'naver', email: 'ssk@naver.com' }

// delete obj.phone;
// console.log(obj); // { name: 'ssk', company: 'naver', email: 'ssk@naver.com' }
