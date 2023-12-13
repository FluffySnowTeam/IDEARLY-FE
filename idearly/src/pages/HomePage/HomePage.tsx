import { HomePageConfig } from "../../constants";
import { CompetitionsSection } from "./components";
import * as S from "./HomePage.styles";

export const HomePage = () => {
  return (
    <S.HomeContainer>
      {HomePageConfig.map((config) => (
        <CompetitionsSection key={config.id} config={config} />
      ))}
    </S.HomeContainer>
  );
};
