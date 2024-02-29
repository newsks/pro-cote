// 단어 퍼즐 문제풀이
// https://programmers.co.kr/learn/courses/30/lessons/12983

// 단어 퍼즐은 주어진 단어 조각들을 이용해서 주어진 문장을 완성하는 퍼즐입니다.
// 이때, 주어진 각 단어 조각들은 각각 무한개씩 있다고 가정합니다.
// 예를 들어 주어진 단어 조각이 [“ba”, “na”, “n”, “a”]인 경우 "ba", "na", "n", "a"
// 단어 조각이 각각 무한개씩 있습니다.
// 이때, 만들어야 하는 문장이 “banana”라면 “ba”, “na”, “n”, “a”의 4개를 사용하여
// 문장을 완성할 수 있지만, “ba”, “na”, “na”의 3개만을 사용해도 “banana”를 완성할 수 있습니다. 사용 가능한 단어 조각들을 담고 있는 배열 strs와 완성해야 하는 문자열 t가 매개변수로 주어질 때, 주어진 문장을 완성하기 위해 사용해야 하는 단어조각 개수의 최솟값을 return 하도록 solution 함수를 완성해 주세요.
// 만약 주어진 문장을 완성하는 것이 불가능하면 -1을 return 하세요.

function solution(strs, t) {
  const dp = Array(t.length + 1).fill(Infinity);
  dp[0] = 0;
  for (let i = 1; i <= t.length; i++) {
    for (let str of strs) {
      if (t.substr(i - str.length, str.length) === str) {
        dp[i] = Math.min(dp[i], dp[i - str.length] + 1);
      }
    }
  }

  return dp[t.length] === Infinity ? -1 : dp[t.length];
}
