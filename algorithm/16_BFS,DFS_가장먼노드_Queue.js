// 가장 먼 노드
// 문제 설명
// n개의 노드가 있는 그래프가 있습니다. 각 노드는 1부터 n까지 번호가 적혀있습니다.

// 1번 노드에서 가장 멀리 떨어진 노드의 갯수를 구하려고 합니다.

// 가장 멀리 떨어진 노드란 최단경로로 이동했을 때 간선의 개수가 가장 많은 노드들을 의미합니다.

// 노드의 개수 n, 간선에 대한 정보가 담긴 2차원 배열 vertex가 매개변수로 주어질 때, 1번 노드로부터 가장 멀리 떨어진 노드가 몇 개인지를 return 하도록 solution 함수를 작성해주세요.

// 제한사항
// 노드의 개수 n은 2 이상 20,000 이하입니다.
// 간선은 양방향이며 총 1개 이상 50,000개 이하의 간선이 있습니다.
// vertex 배열 각 행 [a, b]는 a번 노드와 b번 노드 사이에 간선이 있다는 의미입니다.
// 입출력 예
// n vertex return
// 6 [[3, 6], [4, 3], [3, 2], [1, 3], [1, 2], [2, 4], [5, 2]] 3
// 입출력 예 설명
// 예제의 그래프를 표현하면 아래 그림과 같고, 1번 노드에서 가장 멀리 떨어진 노드는 4,5,6번 노드입니다.

// 핵심 키워드는 "노드", "간선", "최단경로"
// 최단 경로가 제일 큰 경우의 집합을 구하는 문제

// edge = vertex

class Queue {
  constructor() {
    this.queue = [];
    this.front = 0;
    this.rear = 0;
  }
  enqueue(value) {
    this.queue[this.rear++] = value; // 변수를 받아서 rear에 하나씩 추가
  }
  dequeue() {
    const value = this.queue[this.front]; // 우선 front에 있는 값을 빼내고
    delete this.queue[this.front]; //기존에 있던 배열에 있던 값은 지워준다
    this.front += 1; //front를 하나 증가시킴
    return value;
  }
  isEmpty() {
    return this.rear === this.front;
  }
}

function solution(n, edge) {
  const graph = Array.from(Array(n + 1), () => []); // 1번부터 시작하기위해 n+1, 초기값() => []
  for (const [src, dest] of edge) {
    graph[src].push(dest); // 출발지(graph[src]) => 도착지(dest)를 인접리스트에 추가
    graph[dest].push(src); // 양방향이기때문에 둘다 구현  도착지 => 출발지
  }

  // 각 정점의 길이를 구할 수 있도록 배열 만들기
  const distance = Array(n + 1).fill(0); // 정점만큼 배열을 만들고 0으로 초기화
  distance[1] = 1; // 1번의 길이는 1이라고 정한다.
  // BFS
  const queue = new Queue();
  queue.enqueue(1);
  while (!queue.isEmpty()) {
    // queue가 비어있는지 안비어있는지
    const src = queue.dequeue(); // shift를 dequeue로 바꿔준다
    for (const dest of graph[src]) {
      //출발지로부터 목적지 요소들을 뽑아준다
      if (distance[dest] === 0) {
        //아직 가지않은 경로는 0으로 초기화 되어있음
        queue.enqueue(dest); // push는 enqueue로 바꿔준다
        distance[dest] = distance[src] + 1; // 도착지는 출발지 +1
      }
    }
  }
  const max = Math.max(...distance); // 거리들 중에 가장 큰 값을 뽑아준다
  return distance.filter((item) => item === max).length; // 최대값과 같은 요소들이 몇개나 있는지 length를 통해 구해준다
}
