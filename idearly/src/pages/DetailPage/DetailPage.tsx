import { useParams } from "react-router-dom";
import { fakeCompetitions } from "../../mocks/competition.mocks";
import { Button } from "@chakra-ui/react";
import * as S from "./DetailPage.styles";
import { dateChange } from "../../utils/dateChange";
import useHandleMoveToWaiting from "../../hooks/useHandleMoveToWaiting";
import { CompetitionsModal } from "../HomePage/components/CompetitionsModal/CompetitionsModal";

export const DetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const competition = fakeCompetitions.filter(
    (competition) => competition.competitionId === id
  );
  const { title, description, startDateTime, endDateTime } = competition[0];
  console.log("competition", competition);

  const { isOpen, onClose, overlay, handleMoveToWaiting } =
    useHandleMoveToWaiting(competition[0]);

  // const handleMoveToPage = () => {
  //   if (participate) {
  //     navigate(`/waiting/${id}`);
  //   } else {
  //     navigate(`/matching`);
  //   }
  // };
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
        <S.CompeDetailDescription
          dangerouslySetInnerHTML={{
            __html: description.replace(/\n/g, "<br />"),
          }}
        ></S.CompeDetailDescription>
        <Button onClick={handleMoveToWaiting}>대회 참여하기</Button>
      </S.CompetitionDetailContainer>
    </>
  );
};
