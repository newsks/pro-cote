/*
OO 조선소에서는 태풍으로 인한 작업지연으로 수주한 선박들을 기한 내에 완성하지 못할 것이 예상됩니다.
기한 내에 완성하지 못하면 손해 배상을 해야 하므로 남은 일의 작업량을 숫자로 매기고
배상비용을 최소화하는 방법을 찾으려고 합니다.
배상 비용은 각 선박의 완성까지 남은 일의 작업량을 제곱하여 모두 더한 값이 됩니다.

조선소에서는 1시간 동안 남은 일 중 하나를 골라 작업량 1만큼 처리할 수 있습니다.
조선소에서 작업할 수 있는 N 시간과 각 일에 대한 작업량이 담긴 배열(works)이 있을 때
배상 비용을 최소화한 결과를 반환하는 함수를 만들어 주세요.
예를 들어, N=4일 때, 선박별로 남은 일의 작업량이 works = [4, 3, 3]이라면
배상 비용을 최소화하기 위해 일을 한 결과는 [2, 2, 2]가 되고 배상 비용은 22 + 22 + 22 = 12가 되어 12를 반환해 줍니다.
*/

// 최대 힙 구현
class MaxHeap {
  constructor() {
    this.heap = [null];
  }
  
  push(value) {
    this.heap.push(value);
    let currentIndex = this.heap.length - 1;
    let parentIndex = Math.floor(currentIndex / 2);
    while (parentIndex !== 0 && this.heap[parentIndex] < value) {
      const temp = this.heap[parentIndex];
      this.heap[parentIndex] = value;
      this.heap[currentIndex] = temp;
      currentIndex = parentIndex;
      parentIndex = Math.floor(currentIndex / 2);
    }
  }

  pop() {
    if (this.heap.length === 2) return this.heap.pop(); // 루트 정점만 남은 경우
    const returnValue = this.heap[1];
    this.heap[1] = this.heap.pop();
    let currentIndex = 1;
    let leftIndex = 2;
    let rightIndex = 3;
    while (
      this.heap[currentIndex] < this.heap[leftIndex] ||
      this.heap[currentIndex] < this.heap[rightIndex]
    ) {
      if (this.heap[leftIndex] < this.heap[rightIndex]) {
        const temp = this.heap[currentIndex];
        this.heap[currentIndex] = this.heap[rightIndex];
        this.heap[rightIndex] = temp;
        currentIndex = rightIndex;
      } else {
        const temp = this.heap[currentIndex];
        this.heap[currentIndex] = this.heap[leftIndex];
        this.heap[leftIndex] = temp;
        currentIndex = leftIndex;
      }
      leftIndex = currentIndex * 2;
      rightIndex = currentIndex * 2 + 1;
    }
    return returnValue;
  }
}

// solution 함수 구현

function solution(no, works) {
  // 모든 작업의 합보다 no가 크면 배상 비용을 낼 필요가 없다.

  if (works.reduce((a, b) => a + b) <= no) {
    return 0;
  }

  // max heap 구성
  const heap = new MaxHeap();
  for (const work of works) {
    heap.push(work);
  }

  // no만큼 루프 돌면서 가장 큰 값을 빼서 처리 후 다시 push
  for (let i = 0; i < no; i += 1) {
    heap.push(heap.pop() - 1);
  }

  // 남은 요소에 제곱한 값들의 합을 구한 후 반환
  return heap.heap.reduce((a, b) => a + b * b);
}
