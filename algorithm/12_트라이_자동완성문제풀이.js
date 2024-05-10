// 자동 완성 문제풀이
// 포털 다음에서 검색어 자동완성 기능을 넣고 싶은 라이언은 한 번 입력된 문자열을 학습해서 다음 입력 때 활용하고 싶어 졌다. 예를 들어, go 가 한 번 입력되었다면, 다음 사용자는 g 만 입력해도 go를 추천해주므로 o를 입력할 필요가 없어진다! 단, 학습에 사용된 단어들 중 앞부분이 같은 경우에는 어쩔 수 없이 다른 문자가 나올 때까지 입력을 해야 한다.
// 효과가 얼마나 좋을지 알고 싶은 라이언은 학습된 단어들을 찾을 때 몇 글자를 입력해야 하는지 궁금해졌다.

// 예를 들어, 학습된 단어들이 아래와 같을 때

// go
// gone
// guild
// go를 찾을 때 go를 모두 입력해야 한다.
// gone을 찾을 때 gon 까지 입력해야 한다. (gon이 입력되기 전까지는 go 인지 gone인지 확신할 수 없다.)
// guild를 찾을 때는 gu 까지만 입력하면 guild가 완성된다.
// 이 경우 총 입력해야 할 문자의 수는 7이다.

// 라이언을 도와 위와 같이 문자열이 입력으로 주어지면 학습을 시킨 후, 학습된 단어들을 순서대로 찾을 때 몇 개의 문자를 입력하면 되는지 계산하는 프로그램을 만들어보자.

// 문제 유형
// 사실 문제 이름부터 자동완성이기 때문에 바로 Trie를 떠올릴 수 있습니다. 거기에 문제 내용까지 살펴보면 자동완성 기능이 되어야 최소 입력 글자를 알 수 있기에 이 문제에선 Trie가 가장 효율적인 자료구조라는 것을 알 수 있습니다.

function makeTrie(words) {
  const root = {};
  for (const word of words) {
    let current = root;
    for (const letter of word) {
      if (!current[letter]) current[letter] = [0, {}];

      current[letter][0] = 1 + (current[letter][0] || 0);
      current = current[letter][1];
    }
  }
  return root;
}

function solution(words) {
  let answer = 0;
  const trie = makeTrie(words);

  for (const word of words) {
    let count = 0;
    let current = trie;
    for (const [index, letter] of [...word].entries()) {
      count += 1;
      if (current[letter][0] <= 1) {
        break;
      }
      current = current[letter][1];
    }
    answer += count;
  }

  return answer;
}
