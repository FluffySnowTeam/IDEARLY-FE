export const fakeProblem = [
  {
    id: "W123Q",
    problem:
      "정수 num1과 num2가 주어질 때, num1에서 num2를 뺀 값을 return하도록 soltuion 함수를 완성해주세요.",
    limitations: `-50000 ≤ num1 ≤ 50000 /n -50000 ≤ num2 ≤ 50000`,
    inputOutput:
      "입출력 예 #1 /n num1이 2이고 num2가 3이므로 2 - 3 = -1을 return합니다.",
  },
  {
    id: "W124Q",
    problem:
      "정수 num1과 num2가 매개변수로 주어집니다. 두 수가 같으면 1 다르면 -1을 retrun하도록 solution 함수를 완성해주세요.",
    limitations: `0 ≤ num1 ≤ 10,000 /n 0 ≤ num2 ≤ 10,000`,
    inputOutput: `입출력 예 설명 #1 /n num1이 2이고 num2가 3이므로 다릅니다. 따라서 -1을 return합니다.`,
  },
  {
    id: "W125Q",
    problem:
      "정수 num1, num2가 매개변수로 주어질 때, num1를 num2로 나눈 나머지를 return 하도록 solution 함수를 완성해주세요.",
    limitations: `0 < num1 ≤ 100 /n 0 < num2 ≤ 100`,
    inputOutput: `입출력 예 #1 /n num1이 3, num2가 2이므로 3을 2로 나눈 나머지 1을 return 합니다.`,
  },
  {
    id: "W126Q",
    problem:
      "정수 num1, num2가 매개변수 주어집니다. num1과 num2를 곱한 값을 return 하도록 solution 함수를 완성해주세요.",
    limitations: `0 < num1 ≤ 100 /n 0 < num2 ≤ 100`,
    inputOutput: `입출력 예 #1 /n num1이 3, num2가 4이므로 3 * 4 = 12를 return합니다.`,
  },
  {
    id: "W127Q",
    problem: `각에서 0도 초과 90도 미만은 예각, 90도는 직각, 90도 초과 180도 미만은 둔각 180도는 평각으로 분류합니다. 각 angle이 매개변수로 주어질 때 예각일 때 1, 직각일 때 2, 둔각일 때 3, 평각일 때 4를 return하도록 solution 함수를 완성해주세요. /n 예각 : 0 < angle < 90 /n 직각 : angle = 90 /n 둔각 : 90 < angle < 180 /n 평각 : angle = 180`,
    limitations: `0 < angle ≤ 180 /n angle은 정수입니다.`,
    inputOutput: `입출력 예 #1 /n angle이 70이므로 예각입니다. 따라서 1을 return합니다.`,
  },
  {
    id: "W128Q",
    problem:
      "정수 배열 numbers가 매개변수로 주어집니다. numbers의 원소의 평균값을 return하도록 solution 함수를 완성해주세요.",
    limitations: `0 ≤ numbers의 원소 ≤ 1,000 /n 1 ≤ numbers의 길이 ≤ 100 /n 정답의 소수 부분이 .0 또는 .5인 경우만 입력으로 주어집니다.`,
    inputOutput: `numbers /n result /n [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] /n 5.5 /n [89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99] /n 94.0`,
  },
];
