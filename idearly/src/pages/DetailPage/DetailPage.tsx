import { useParams } from "react-router-dom";
import { fakeCompetitions } from "../../mocks/competition.mocks";
import { Button } from "@chakra-ui/react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import * as S from "./DetailPage.styles";
import { dateChange } from "../../utils/dateChange";
import useHandleMoveToWaiting from "../../hooks/useHandleMoveToWaiting";
import { CompetitionsModal } from "../HomePage/components/CompetitionsModal/CompetitionsModal";
import { useCompetitionDetailMutation } from "../../hooks/useCompetitionMutation";
import { useEffect } from "react";

export const DetailPage = () => {
  const { id } = useParams<{ id: string }>();

  /**이 아래 부분 삭제 */
  const competition = fakeCompetitions.filter(
    (competition) => competition.competitionId === Number(id)
  );
  const { title, description, startDateTime, endDateTime } = competition[0];

  /**수정될 부분 지금은 데이터가 안옴*/
  const { mutate } = useCompetitionDetailMutation(Number(id));
  useEffect(() => {
    mutate();
  }, [id, mutate]);

  const { isOpen, onClose, overlay, handleMoveToWaiting } =
    useHandleMoveToWaiting(competition[0]);

  return (
    <>
      <CompetitionsModal
        isOpen={isOpen}
        onClose={onClose}
        overlay={overlay}
        startDateTime={startDateTime}
      />
      <S.CompetitionDetailContainer>
        <S.CompeDetailTitle>{title}</S.CompeDetailTitle>
        <S.CompeDetailDate>
          <div>시작: {dateChange({ date: startDateTime })}</div>
          <div>종료: {dateChange({ date: endDateTime })}</div>
        </S.CompeDetailDate>
        <S.CompeDetailDescription>
          <Markdown remarkPlugins={[remarkGfm]}>{description}</Markdown>
        </S.CompeDetailDescription>
        <Button onClick={handleMoveToWaiting}>대회 참여하기</Button>
      </S.CompetitionDetailContainer>
    </>
  );
};
