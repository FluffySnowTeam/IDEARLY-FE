import { useParams } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import * as S from "./DetailPage.styles";
import { dateChange } from "../../utils/dateChange";
import useHandleMoveToWaiting from "../../hooks/useHandleMoveToWaiting";
import { useCompetitionDetailMutation } from "../../hooks/useCompetitionMutation";
import { useEffect } from "react";
import { useAtom } from "jotai";
import { competitionDataAtom } from "../../store";
import MarkDownPost from "../../components/MarkdownContent/MarkdownContent";

export const DetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [competition, setCompetition] = useAtom(competitionDataAtom);

  const { data, mutate, status } = useCompetitionDetailMutation(Number(id));
  useEffect(() => {
    mutate();
  }, [id, mutate]);

  useEffect(() => {
    if (data) {
      const newCompetition = data.result;
      setCompetition(newCompetition);
    }
  }, [data]);

  const { handleMoveToWaiting } = useHandleMoveToWaiting(competition);

  if (status === "pending") return <div>...Loading</div>;

  return (
    <>
      <S.CompetitionDetailContainer>
        <S.CompeDetailTitle>{competition?.title}</S.CompeDetailTitle>
        {competition && (
          <S.CompeDetailDate>
            <div>시작: {dateChange({ date: competition.startDateTime })}</div>
            <div>종료: {dateChange({ date: competition.endDateTime })}</div>
          </S.CompeDetailDate>
        )}
        <S.CompeDetailDescription>
          <MarkDownPost post={competition.description} />
          {/* <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {competition.description}
          </ReactMarkdown> */}
        </S.CompeDetailDescription>
        <Button onClick={handleMoveToWaiting}>대회 참가하기</Button>
      </S.CompetitionDetailContainer>
    </>
  );
};
