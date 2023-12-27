import { useParams, useSearchParams } from "react-router-dom";
import * as S from "./AlgorithmProblem.styles";
import { useAlgorithmProblem } from "../../../../hooks";
import { useEffect } from "react";
import { useAtom } from "jotai";
import { algorithmProblemsAtom } from "../../../../store/Algorithm.atoms";
import MarkDownPost from "../../../../components/MarkdownContent/MarkdownContent";

export const AlgorithmProblem = () => {
  const { id: competitionId } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const problemId = searchParams.get("problemId");
  const [problemsData, setProblemsData] = useAtom(algorithmProblemsAtom);

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

  if (status === "pending") {
    return <S.AlgorithmContainer>Loading...</S.AlgorithmContainer>;
  }
  return (
    <S.AlgorithmContainer>
      <S.AlgorithmTitle>{problemsData?.name}</S.AlgorithmTitle>
      {/* <S.MarkdownContainer remarkPlugins={[remarkGfm]}>
        {problemsData?.description}
      </S.MarkdownContainer> */}
      <MarkDownPost post={problemsData?.description} />
    </S.AlgorithmContainer>
  );
};
