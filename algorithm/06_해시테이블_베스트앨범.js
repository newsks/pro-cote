// 문제 설명
// 스트리밍 사이트에서 장르 별로 가장 많이 재생된 노래를 두 개씩 모아 베스트 앨범을 출시하려 합니다. 노래는 고유 번호로 구분하며, 노래를 수록하는 기준은 다음과 같습니다.

// 속한 노래가 많이 재생된 장르를 먼저 수록합니다.
// 장르 내에서 많이 재생된 노래를 먼저 수록합니다.
// 장르 내에서 재생 횟수가 같은 노래 중에서는 고유 번호가 낮은 노래를 먼저 수록합니다.
// 노래의 장르를 나타내는 문자열 배열 genres와 노래별 재생 횟수를 나타내는 정수 배열 plays가 주어질 때, 베스트 앨범에 들어갈 노래의 고유 번호를 순서대로 return 하도록 solution 함수를 완성하세요.

// 제한사항
// genres[i]는 고유번호가 i인 노래의 장르입니다.
// plays[i]는 고유번호가 i인 노래가 재생된 횟수입니다.
// genres와 plays의 길이는 같으며, 이는 1 이상 10,000 이하입니다.
// 장르 종류는 100개 미만입니다.
// 장르에 속한 곡이 하나라면, 하나의 곡만 선택합니다.
// 모든 장르는 재생된 횟수가 다릅니다.

// 풀이법
// 1. 같은 장르끼리 묶는다.
// 2. 묶인 노래들을 재생 순으로 정렬
// 3. 노래를 2개까지 자르는 작업을 한다.
// 핵심키워드 : "묶는 것" , "정렬"

// 하나로 묶기위해 해시테이블을 이용한다.
// map : 첫번째: 장르, 두번째:재생횟수
// forEach: 묶은 애들을 이용해서 데이터를 만들어준다
// [genre, play] : 장르, 재생횟수 비구조화할당

function solution(genres, plays) {
  const genreMap = new Map();

  genres
    .map((genres, index) => [genres, plays[index]]) //장르와 재생횟수로 묶어 준다
    .forEach(([genre, play], index) => {
      // forEach를 이용해서 묶은 배열로 데이터를 만든다
      const data = genreMap.get(genre) || { total: 0, songs: [] }; // 장르를 data로 변수생성 || 초기값도 생성 에러나니깐

      genreMap.set(genre, {
        // 장르의 이름이 키가 된다
        total: data.total + play, // 재생횟수토탈

        // 노래의 리스트 내림차순 정렬 후 2개까지 자른다 : return 하기전 노래의 인덱스를 리턴해야하기때문에
        songs: [...data.songs, { play, index }]
          .sort((a, b) => b.play - a.play)
          .slice(0, 2), // 최대 2개까지 잘라야하기때문에
      });
    });

  // 반환값을 만든다. 장르에 있는 값들을 내리차순 정렬
  // flatMap을 이용해서 배열 2번째 오브젝트에 있는 노래들을 하나의 배열로 만든다.
  // 다른 요소는 다 버리고 노래의 인덱스만 뽑아준다
  return [...genreMap.entries()]
    .sort((a, b) => b[1].total - a[1].total) //같은 장르끼리 묶어준다
    .flatMap((item) => item[1].songs)
    .map((song) => song.index);
}
