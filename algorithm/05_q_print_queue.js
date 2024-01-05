class Node {
  constructor(value) {
    this.value = value;
    this.next = null; //next 포인터 선언
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  // 값을 추가하기 위한
  enqueue(newValue) {
    const newNode = new Node(newValue);
    if (this.head === null) {
      // 만약 head가 null일 경우
      this.head = this.tail = newNode; // // head와 tail에 생성한 node를 넣어준다
    } else {
      this.tail.next = newNode; // 만약 비어있지않으면 꼬리부분에 새로운 node를 넣어준다
      this.tail = newNode; // 새로운 node가 꼬리가 될 수 있도록 설정해준다
    }
  }

  dequeue() {
    const value = this.head.value; // head의 value를 별도의 상수에 담아둔다
    this.head = this.head.next; // head를 현재의 head의 next로 담아둔다
    return value; // 앞서 담아둔 head의 값을 반환해 준다
  }

  peek() {
    return this.head.value; // 현재 head의 값을 알아내는 peek값
  }
}

function solution(priorities, location) {
  const queue = new Queue(); // 먼저 queue를 선언
  for (let i = 0; i < priorities.length; i += 1) {
    queue.enqueue([priorities[i], i]); // 큐에 우선순위와 각각의 인덱스를 넣어준다
  }

  priorities.sort((a, b) => b - a); // 우선 순위 높은순위대로 정렬 내림차순정렬 9~

  // 내가 요청한 인쇄가 몇번째 인쇄되는지 확인 로직

  let count = 0;
  while (true) {
    // queue가 있다면 계속 루프를 돌려준다
    const currentValue = queue.peek(); // 현재값은 front값

    if (currentValue[0] < priorities[count]) {
      // 우선순위가 현재count보다 작은경우에는
      queue.enqueue(queue.dequeue()); // 맨앞에서 꺼내서 맨 뒤로 넣을 수 있도록
    } else {
      // 그리고 만약에 우선순위가 더 큰 경우에는 그대로 dequeue해주면됨
      const value = queue.dequeue(); // dequeue하고나서
      count += 1; // 문서가 하나 빠졌으니깐 +1
      if (location === value[1]) {
        //만약에 우리가 찾던 문서 index라면
        return count;
      }
    }
  }
}
