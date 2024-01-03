// Stack Array로 표현하기

const stack = [];

// push
stack.push(1);
stack.push(2);
stack.push(3);
console.log(stack); //[ 1, 2, 3 ]

// Pop
stack.pop();
console.log(stack); //[ 1, 2 ]

// get Top
console.log(stack[stack.length - 1]); // 2
