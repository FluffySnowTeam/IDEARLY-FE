import { executeResult } from "../../../../../../mocks/algorithmResult.mock";
import * as S from "./AlgorithmSubmitResult.styles";

export const AlgorithmSubmitResult = () => {
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
