import * as S from "./AlgorithmSubmitResult.styles";

export const AlgorithmSubmitResult = () => {
  const executeResult = {
    status: "success",
    data: {
      correct: true,
      testcases: [
        {
          testCaseId: 1,
          status: "pass",
        },
        {
          testCaseId: 2,
          status: "pass",
        },
        {
          testCaseId: 3,
          status: "pass",
        },
        {
          testCaseId: 4,
          status: "failed",
        },
      ],
    },
  };

  console.log(executeResult);

  // 실행인지 제출인지 여부에 따라 렌더링 결정

  return (
    <S.AlgorithmResultContainer>
      {executeResult.data.testcases.map((test) => (
        <div key={test.testCaseId}>
          <S.TestCaseContainer>
            <S.ResultContainer>
              <S.InfoText>
                테스트 {test.testCaseId} {">"}
              </S.InfoText>
              <S.ValueText>{test.status ? "통과" : "실패"}</S.ValueText>
            </S.ResultContainer>
          </S.TestCaseContainer>
        </div>
      ))}
    </S.AlgorithmResultContainer>
  );
};
