import { useSearchParams } from "react-router-dom";
import { AlgorithmPageConfig } from "../../../../constants";
import * as S from "./AlgorithmProblem.styles";
import { fakeProblem } from "../../../../mocks/problem.mocks";

export const AlgorithmProblem = () => {
  const { problem, limitations, inputOutput } = AlgorithmPageConfig;
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const selectedProblem = fakeProblem.find((pro) => pro.id === id);

  return (
    <S.AlgorithmNavContainer>
      <div>
        <div>{problem}</div>
        <div>{selectedProblem?.problem}</div>
      </div>
      <div>
        <div>{limitations}</div>
        <div>{selectedProblem?.limitations}</div>
      </div>
      <div>
        <div>{inputOutput}</div>
        <div>{selectedProblem?.problem}</div>
      </div>
    </S.AlgorithmNavContainer>
  );
};
