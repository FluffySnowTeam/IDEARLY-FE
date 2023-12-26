import { useParams, useSearchParams } from "react-router-dom";
import * as S from "./AlgorithmProblem.styles";
import { useAlgorithmProblem } from "../../../../hooks";
import { useEffect, useState } from "react";

interface IProblemsData {
  name: string;
  description: string;
  code: string;
}

export const AlgorithmProblem = () => {
  const { id: competitionId } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const problemId = searchParams.get("problemId");
  const [problemsData, setProblemsData] = useState<IProblemsData>();

  const { data, status, mutate } = useAlgorithmProblem();

  useEffect(() => {
    if (problemId && competitionId) {
      mutate({
        competitionId: competitionId,
        problemId: problemId,
      });
    }
  }, [problemId, competitionId]);

  useEffect(() => {
    if (data) {
      const problems = data.data.result;
      console.log("data", data.data.result);
      setProblemsData(problems);
    }
  }, [data]);

  console.log("problemsData", problemsData);

  if (status === "pending") {
    return <span>Loading...</span>;
  }

  return (
    <S.AlgorithmContainer>
      <div>{problemsData?.name}</div>
      <div>{problemsData?.description}</div>
      {/**
       * 여기 마크다운으로 problem 내용 보여주기
       */}
    </S.AlgorithmContainer>
  );
};
