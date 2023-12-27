import { HomePageConfig } from "../../constants";
import {
  CompetitionsMainSection,
  CompetitionsSection,
  PrevCompetitionsSection,
} from "./components";

import * as S from "./HomePage.styles";

export const HomePage = () => {
  const [competitions, previousCompetitions] = HomePageConfig;

  return (
    <>
      <CompetitionsMainSection />
      <S.HomeContainer>
        <CompetitionsSection config={competitions} />
        <PrevCompetitionsSection config={previousCompetitions} />
      </S.HomeContainer>
    </>
  );
};
