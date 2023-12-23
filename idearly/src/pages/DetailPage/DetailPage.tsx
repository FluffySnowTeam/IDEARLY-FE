import { useParams } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import * as S from "./DetailPage.styles";
import { dateChange } from "../../utils/dateChange";
import useHandleMoveToWaiting from "../../hooks/useHandleMoveToWaiting";
import { CompetitionsModal } from "../HomePage/components/CompetitionsModal/CompetitionsModal";
import { useCompetitionDetailMutation } from "../../hooks/useCompetitionMutation";
import { useEffect, useState } from "react";
import type { ICompetition } from "../../types";

export const DetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [competition, setCompetition] = useState<ICompetition>();

  /**수정될 부분 지금은 데이터가 안옴*/
  const { data, mutate, status } = useCompetitionDetailMutation(Number(id));
  useEffect(() => {
    mutate();
  }, [id, mutate]);

  useEffect(() => {
    if (data) {
      console.log("data", data);
      const newCompetition = data.result;
      console.log("new competition", newCompetition);
      setCompetition(newCompetition);
    }
  }, [data]);

  const { isOpen, onClose, overlay, handleMoveToWaiting } =
    useHandleMoveToWaiting(competition);

  if (status === "pending") return <div>...Loading</div>;

  return (
    <>
      <CompetitionsModal
        isOpen={isOpen}
        onClose={onClose}
        overlay={overlay}
        startDateTime={competition?.startDateTime}
      />
      <S.CompetitionDetailContainer>
        <S.CompeDetailTitle>{competition?.competitionTitle}</S.CompeDetailTitle>
        {competition && (
          <S.CompeDetailDate>
            <div>시작: {dateChange({ date: competition.startDateTime })}</div>
            <div>종료: {dateChange({ date: competition.endDateTime })}</div>
          </S.CompeDetailDate>
        )}
        <S.CompeDetailDescription>
          {competition?.description}
          {/* <Markdown remarkPlugins={[remarkGfm]}>{description}</Markdown> */}
        </S.CompeDetailDescription>
        <Button onClick={handleMoveToWaiting}>대회 참여하기</Button>
      </S.CompetitionDetailContainer>
    </>
  );
};
