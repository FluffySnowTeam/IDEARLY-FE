import { PropsWithChildren, useEffect, useState } from "react";
import * as S from "./PrevCompetitionsSection.styles";
import { CompetitionsCard } from "..";
import { usePrevCompetitionQuery } from "../../../../hooks/useCompetitionMutation";
import { ICompetition } from "../../../../types";
import { useNavigate } from "react-router-dom";
import type { IPrevCompetitionsSection } from "./PrevCompetitionsSection.types";

export const PrevCompetitionsSection = ({
  config,
}: PropsWithChildren<IPrevCompetitionsSection>) => {
  const { title, subTitle } = config;
  const navigate = useNavigate();

  const { prevCompeData, status, error } = usePrevCompetitionQuery();

  // 받아온 데이터로 상태 관리
  const [prevCompetitions, setPrevCompetitions] = useState<ICompetition[]>([]);

  useEffect(() => {
    if (prevCompeData) {
      setPrevCompetitions(prevCompeData.result);
      console.log(prevCompeData);
    }
  }, [prevCompeData]);

  if (status === "pending") {
    <div>...Loading</div>;
  }

  if (status === "error") {
    navigate("/error");
    console.log(error);
  }

  return (
    <S.PrevCompeSectionContainer>
      <S.PrevCompeSectionTitle>{title}</S.PrevCompeSectionTitle>
      <S.PrevCompeSectionSubTitle>{subTitle}</S.PrevCompeSectionSubTitle>
      <S.PrevCompeCardContainer>
        {prevCompetitions?.map((competition) => (
          <CompetitionsCard
            isPrevCompe={true}
            key={competition.competitionId}
            competition={competition}
          />
        ))}
      </S.PrevCompeCardContainer>
    </S.PrevCompeSectionContainer>
  );
};
