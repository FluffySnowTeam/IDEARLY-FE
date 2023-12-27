import { Text } from "@chakra-ui/react";
import * as S from "./AlgorithmTestResult.styles";
import { useAtomValue } from "jotai";
import { testResultAtom } from "../../../../store/Algorithm.atoms";

export const AlgorithmTestResult = () => {
  const testResult = useAtomValue(testResultAtom);
  const printResult = (data: string) => {
    switch (data) {
      case "pass": {
        return <Text color="#438BFF">테스트를 통과하였습니다.</Text>;
      }
      case "failed": {
        return <Text color="#F4483C">실패</Text>;
      }
      case "error": {
        return <Text color="#F4483C">에러</Text>;
      }
      case "timeout": {
        return <Text color="#F4483C">시간초과</Text>;
      }
    }
  };
  return (
    <S.AlgorithmResultContainer>
      {testResult.map((test) => (
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
              <S.ValueText>{printResult(test.status)}</S.ValueText>
            </S.ResultContainer>
          </S.TestCaseContainer>
        </div>
      ))}
    </S.AlgorithmResultContainer>
  );
};
