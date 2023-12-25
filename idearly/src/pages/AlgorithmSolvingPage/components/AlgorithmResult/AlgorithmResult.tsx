import * as S from "./AlgorithmResult.styles";

export const AlgorithmResult = () => {
  const result = {
    status: "success",
    data : [
      {
        testCaseId: 1,
        input: "[1, 1, 3, 3, 0, 1, 1]",
        expectedOutput: "[1, 3, 0, 1]",
        userOutput: "[1, 3, 0, 1]",
        status: "pass"
      },
      {
        testCaseId: 2,
        input: "[4, 4, 4, 3, 3]",
        expectedOutput: "[4, 3]",
        userOutput: "[4, 2]",
        status: "failed"
      }
    ]
  };
  console.log(result);
  return (
    <S.AlgorithmResultContainer>
      {result.data.map((test) => (
          <div key={test.testCaseId}>
            <S.TestCaseContainer>
              <S.TestCase>테스트 {test.testCaseId}</S.TestCase>
              <S.ResultContainer>
                <S.InfoText>입력값</S.InfoText>
                <S.ValueText>{test.input}</S.ValueText>
              </S.ResultContainer>
              <S.ResultContainer>
                <S.InfoText>기댓값</S.InfoText>
                <S.ValueText>{test.expectedOutput}</S.ValueText>
              </S.ResultContainer>
              <S.ResultContainer>
                <S.InfoText>실행 결과</S.InfoText>
                <S.ValueText>{test.status ? '테스트를 통과하였습니다' : '실패'}</S.ValueText>
              </S.ResultContainer>
            </S.TestCaseContainer>
          </div>
        ))}
    </S.AlgorithmResultContainer>
  );
};
