// Ch20-3. 투포인터_보석 쇼핑 문제풀이
// 보석 쇼핑 문제풀이
// 개발자 출신으로 세계 최고의 갑부가 된 어피치는 스트레스를 받을 때면 이를 풀기 위해 오프라인 매장에 쇼핑을 하러 가곤 합니다.
// 어피치는 쇼핑을 할 때면 매장 진열대의 특정 범위의 물건들을 모두 싹쓸이 구매하는 습관이 있습니다.
// 어느 날 스트레스를 풀기 위해 보석 매장에 쇼핑을 하러 간 어피치는 이전처럼 진열대의 특정 범위의 보석을 모두 구매하되 특별히 아래 목적을 달성하고 싶었습니다.

// 진열된 모든 종류의 보석을 적어도 1개 이상 포함하는 가장 짧은 구간을 찾아서 구매

// 예를 들어 아래 진열대는 4종류의 보석(RUBY, DIA, EMERALD, SAPPHIRE) 8개가 진열된 예시입니다.

// 진열대 번호12345678
// 보석 이름	DIA	RUBY	RUBY	DIA	DIA	EMERALD	SAPPHIRE	DIA
// 진열대의 3번부터 7번까지 5개의 보석을 구매하면 모든 종류의 보석을 적어도 하나 이상씩 포함하게 됩니다.

// 진열대의 3, 4, 6, 7번의 보석만 구매하는 것은 중간에 특정 구간(5번)이 빠지게 되므로 어피치의 쇼핑 습관에 맞지 않습니다.

// 진열대 번호 순서대로 보석들의 이름이 저장된 배열 gems가 매개변수로 주어집니다. 이때 모든 보석을 하나 이상 포함하는 가장 짧은 구간을 찾아서 return 하도록 solution 함수를 완성해주세요.

// 가장 짧은 구간의 시작 진열대 번호와 끝 진열대 번호를 차례대로 배열에 담아서 return 하도록 하며, 만약 가장 짧은 구간이 여러 개라면 시작 진열대 번호가 가장 작은 구간을 return 합니다.

function solution(gems) {
  let answer = [0, gems.length]; // 가장 긴 길이로 초기화
  let start = 0;
  let end = 0;

  const gemKinds = new Set(gems).size; //겹치지 않는 보석의 갯수
  const collect = new Map(); // 보석을 담아둘 변수

  collect.set(gems[0], 1); // 시작하면서 첫 보석을 담는다

  while (start < gems.length && end < gems.length) {
    // 두 포인터가 끝에 도달한다면 종료
    if (collect.size === gemKinds) {
      // 모든 보석을 구매할 수 있다면 종료
      if (end - start < answer[1] - answer[0]) {
        //구간을 갱신
        answer = [start + 1, end + 1];
      }
      collect.set(gems[start], collect.get(gems[start]) - 1); // 첫 번째 포인터에 해당하는 보석을 한 개 줄인다.
      if (collect.get(gems[start]) === 0) {
        // 만약 0이 됐다면 목록에서 제거된다.
        collect.delete(gems[start]);
      }

      start += 1;
    } else {
      end += 1;
      collect.set(gems[end], 1 + (collect.get(gems[end]) || 0)); // 보석을 추가한다.
    }
  }

  return answer;
}
