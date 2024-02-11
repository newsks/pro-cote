// Ch15-2. 그리디_큰 수 만들기 실습

// 큰 수 만들기
// 문제 설명
// 어떤 숫자에서 k개의 수를 제거했을 때 얻을 수 있는 가장 큰 숫자를 구하려 합니다.

// 예를 들어, 숫자 1924에서 수 두 개를 제거하면 [19, 12, 14, 92, 94, 24] 를 만들 수 있습니다. 이 중 가장 큰 숫자는 94 입니다.

// 문자열 형식으로 숫자 number와 제거할 수의 개수 k가 solution 함수의 매개변수로 주어집니다. number에서 k 개의 수를 제거했을 때 만들 수 있는 수 중 가장 큰 숫자를 문자열 형태로 return 하도록 solution 함수를 완성하세요.

// 제한 조건
// number는 2자리 이상, 1,000,000자리 이하인 숫자입니다.
// k는 1 이상 number의 자릿수 미만인 자연수입니다.

// N이 백만이면 O(N), O(N log N)

// 큰값이 나오면 이전 값 중 더 작은 값은 전부 다 삭제한다
// 스택하고 비슷
// 즉, 스택의 바닥에서부터 탑은 큰 수부터 작은 수로 나열이 되어야한다

function solution(number, k) {
  const stack = []; // 스택을 만든다.
  let count = 0; //몇개를 지웠는지 카운팅해주기위해 카운트 변수생성

  for (const item of number) {
    while (count < k && stack[stack.length - 1] < item) {
      //카운트는 숫자내여야하니깐 k보다 작고, 스택의 탑에 있는 값보다 들어온 값이 더 클경우
      stack.pop();
      count += 1;
    }

    stack.push(item);
  }

  while (count < k) {
    stack.pop();
    count += 1;
  }

  return stack.join("");
}
