import { PropsWithChildren, useEffect, useState } from "react";
import { ICompetitionsSection } from "./CompetitionsSection.types";
import * as S from "./CompetitionsSection.styles";
import { CompetitionsCard } from "..";
import { useCompetitionQuery } from "../../../../hooks/useCompetitionMutation";
import { ICompetition } from "../../../../types";
import { useNavigate } from "react-router-dom";

export const CompetitionsSection = ({
  config,
}: PropsWithChildren<ICompetitionsSection>) => {
  const { title, subTitle } = config;
  const navigate = useNavigate();

  const { competitionData, status, error } = useCompetitionQuery();

  // 받아온 데이터로 상태 관리
  const [competitions, setCompetitions] = useState<ICompetition[]>([]);

  useEffect(() => {
    if (competitionData) {
      setCompetitions(competitionData.result);
      console.log(competitionData);
    }
  }, [competitionData]);

  if (status === "pending") {
    // 이후 시간이 남으면 스켈레톤 ui로 수정하기
    <div>...Loading</div>;
  }

  if (status === "error") {
    navigate("/error");
    console.log(error);
  }

  return (
    <S.CompeSectionContainer>
      <S.CompeSectionTitle>{title}</S.CompeSectionTitle>
      <S.CompeSectionSubTitle>{subTitle}</S.CompeSectionSubTitle>
      <S.CompeCardContainer>
        {competitions?.map((competition) => (
          <CompetitionsCard
            isPrevCompe={false}
            key={competition.competitionId}
            competition={competition}
          />
        ))}
      </S.CompeCardContainer>
    </S.CompeSectionContainer>
  );
};
