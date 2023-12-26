import { useSearchParams } from "react-router-dom";
// import { AlgorithmPageConfig } from "../../../../constants";
import * as S from "./AlgorithmProblem.styles";
// import { fakeProblem } from "../../../../mocks/problem.mocks";
// import { AlgorithmSection } from "./components";

export const AlgorithmProblem = () => {
  // const { problem, limitations, inputOutput } = AlgorithmPageConfig;
  const [searchParams] = useSearchParams();
  const problemId = searchParams.get("problemId");
  console.log(problemId);
  // const selectedProblem = fakeProblem.find((pro) => pro.id === id);

  return (
    <S.AlgorithmContainer>
      <div>{problemId}</div>
      {/**
       * 여기 마크다운으로 problem 내용 보여주기
       */}
      {/* <AlgorithmSection
        title={problem}
        content={selectedProblem?.problem || "문제 내용이 없습니다."}
      />
      <AlgorithmSection
        title={limitations}
        content={selectedProblem?.limitations || "제한 사항이 없습니다."}
      />
      <AlgorithmSection
        title={inputOutput}
        content={selectedProblem?.inputOutput || "입출력 정보가 없습니다."}
      /> */}
    </S.AlgorithmContainer>
  );
};
