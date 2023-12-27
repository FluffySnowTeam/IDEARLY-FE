import { Text } from "@chakra-ui/react";
import { testResultAtom } from "../../../../../../store/Algorithm.atoms";
import * as S from "./AlgorithmTestResult.styles";
import { useAtomValue } from "jotai";

export const AlgorithmTestResult = () => {
  const testResult = useAtomValue(testResultAtom);
  console.log("testResult: ", testResult);

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
              {test.status === "pass" ? (
                <Text color="#438BFF">테스트를 통과하였습니다.</Text>
              ) : (
                <Text color="#F4483C">실패</Text>
              )}
            </S.ResultContainer>
          </S.TestCaseContainer>
        </div>
      ))}
    </S.AlgorithmResultContainer>
  );
};
