import { useSearchParams } from "react-router-dom";
import * as S from "./AlgorithmProblem.styles";
import { useAlgorithmProblem } from "../../../../hooks";
import { useEffect, useState } from "react";

interface IProblemsData {
  problem_title: string;
  description: string;
  code: string;
}

export const AlgorithmProblem = () => {
  const [searchParams] = useSearchParams();
  const problemId = searchParams.get("problemId");
  const [problemsData, setProblemsData] = useState<IProblemsData>();

  const { data, status, mutate } = useAlgorithmProblem();

  useEffect(() => {
    if (problemId) {
      mutate(Number(problemId));
    }
  }, [problemId]);

  useEffect(() => {
    if (data) {
      const problems = data.data.result;
      console.log("data", data);
      setProblemsData(problems);
    }
  }, [data]);

  console.log(problemsData);

  if (status === "pending") {
    return <span>Loading...</span>;
  }

  return (
    <S.AlgorithmContainer>
      <div>{problemsData?.problem_title}</div>
      <div>{problemsData?.description}</div>
      {/**
       * 여기 마크다운으로 problem 내용 보여주기
       */}
    </S.AlgorithmContainer>
  );
};
