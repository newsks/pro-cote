// Ch06-2. 큐_프린터 실습
// 문제 설명
// 1. 인쇄 대기목록의 가장 앞에 있는 문서(J)를 대기목록에서 꺼냅니다. (dequeue)
// 2. 나머지 인쇄 대기목록에서 J보다 중요도가 높은 문서가 한 개라도 존재하면 J를 대기목록의 가장 마지막에 넣습니다.(enqueue)
// 3. 그렇지 않으면 J를 인쇄합니다.

// 운영체제의 역할 중 하나는 컴퓨터 시스템의 자원을 효율적으로 관리하는 것입니다. 이 문제에서는 운영체제가 다음 규칙에 따라 프로세스를 관리할 경우 특정 프로세스가 몇 번째로 실행되는지 알아내면 됩니다.
// 1. 실행 대기 큐(Queue)에서 대기중인 프로세스 하나를 꺼냅니다.
// 2. 큐에 대기중인 프로세스 중 우선순위가 더 높은 프로세스가 있다면 방금 꺼낸 프로세스를 다시 큐에 넣습니다.
// 3. 만약 그런 프로세스가 없다면 방금 꺼낸 프로세스를 실행합니다.
// 3.1 한 번 실행한 프로세스는 다시 큐에 넣지 않고 그대로 종료됩니다.

// 예를 들어 프로세스 4개 [A, B, C, D]가 순서대로 실행 대기 큐에 들어있고, 우선순위가 [2, 1, 3, 2]라면 [C, D, A, B] 순으로 실행하게 됩니다.

// 현재 실행 대기 큐(Queue)에 있는 프로세스의 중요도가 순서대로 담긴 배열 priorities와, 몇 번째로 실행되는지 알고싶은 프로세스의 위치를 알려주는 location이 매개변수로 주어질 때, 해당 프로세스가 몇 번째로 실행되는지 return 하도록 solution 함수를 작성해주세요.

// 제한사항
// priorities의 길이는 1 이상 100 이하입니다.
// priorities의 원소는 1 이상 9 이하의 정수입니다.
// priorities의 원소는 우선순위를 나타내며 숫자가 클 수록 우선순위가 높습니다.
// location은 0 이상 (대기 큐에 있는 프로세스 수 - 1) 이하의 값을 가집니다.
// priorities의 가장 앞에 있으면 0, 두 번째에 있으면 1 … 과 같이 표현합니다.

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
