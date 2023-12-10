import { PropsWithChildren } from "react";
import { ICompetitionsSection } from "./CompetitionsSection.types";
import * as S from "./CompetitionsSection.styles";
import { CompetitionsCard } from "..";
import { fakeCompetitions } from "../../../../mocks/competition.mocks";

export const CompetitionsSection = ({
  config,
}: PropsWithChildren<ICompetitionsSection>) => {
  const { title, subTitle } = config;

  return (
    <S.CompeSectionContainer>
      <S.CompeSectionTitle>{title}</S.CompeSectionTitle>
      <S.CompeSectionSubTitle>{subTitle}</S.CompeSectionSubTitle>
      <S.CompeCardContainer>
        {fakeCompetitions.map((competition) => (
          <CompetitionsCard key={competition.id} competition={competition} />
        ))}
      </S.CompeCardContainer>
    </S.CompeSectionContainer>
  );
};
