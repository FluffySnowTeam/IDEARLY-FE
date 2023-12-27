import { PropsWithChildren, useEffect, useState } from "react";
import type { ICompetitionsSection } from "./CompetitionsSection.types";
import * as S from "./CompetitionsSection.styles";
import { CompetitionsCard } from "..";
import { useCompetitionQuery } from "../../../../hooks/useCompetitionMutation";
import type { ICompetition } from "../../../../types";
import { useNavigate } from "react-router-dom";
import { LoadingComponent } from "../../../../components";

export const CompetitionsSection = ({
  config,
}: PropsWithChildren<ICompetitionsSection>) => {
  const { title, subTitle } = config;
  const navigate = useNavigate();
  const { competitionData, status } = useCompetitionQuery();
  const [competitions, setCompetitions] = useState<ICompetition[]>([]);

  useEffect(() => {
    if (competitionData) {
      setCompetitions(competitionData.result);
      console.log(competitionData);
    }
  }, [competitionData]);

  if (status === "pending") {
    <LoadingComponent />;
  }

  if (status === "error") {
    navigate("/error");
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
