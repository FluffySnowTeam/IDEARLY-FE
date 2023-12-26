import { useSearchParams } from "react-router-dom";
import * as S from "./AlgorithmProblem.styles";

export const AlgorithmProblem = () => {
  const [searchParams] = useSearchParams();
  const problemId = searchParams.get("problemId");
  console.log(problemId);

  return (
    <S.AlgorithmContainer>
      <div>{problemId}</div>
      {/**
       * 여기 마크다운으로 problem 내용 보여주기
       */}
    </S.AlgorithmContainer>
  );
};
