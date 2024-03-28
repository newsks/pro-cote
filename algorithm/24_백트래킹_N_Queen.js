// N-Queen
// 문제 설명
// 가로, 세로 길이가 n인 정사각형으로된 체스판이 있습니다. 체스판 위의 n개의 퀸이 서로를 공격할 수 없도록 배치하고 싶습니다.

// 예를 들어서 n이 4인경우 다음과 같이 퀸을 배치하면 n개의 퀸은 서로를 한번에 공격 할 수 없습니다.
// 체스판의 가로 세로의 세로의 길이 n이 매개변수로 주어질 때,

// n개의 퀸이 조건에 만족 하도록 배치할 수 있는 방법의 수를 return하는 solution함수를 완성해주세요.

// 제한사항
// 퀸(Queen)은 가로, 세로, 대각선으로 이동할 수 있습니다.
// n은 12이하의 자연수 입니다.

function solution(n) {
  let answer = 0;
  let check = new Array(n).fill(0);
  function isPossible(level) {
    for (let i = 0; i < level; i++) {
      if (
        check[i] === check[level] ||
        Math.abs(check[level] - check[i]) === level - i
      ) {
        return false;
      }
    }
    return true;
  }

  function DFS(level) {
    if (level === n) {
      answer++;
      return;
    }
    for (let i = 0; i < n; i++) {
      check[level] = i;
      if (isPossible(level)) {
        DFS(level + 1);
      }
    }
  }

  DFS(0);

  return answer;
}
