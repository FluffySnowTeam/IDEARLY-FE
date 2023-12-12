import { HomePageConfig } from "../../constants";
import { CompetitionsSection } from "./components";
import * as S from "./HomePage.styles";

export const HomePage = () => {
  return (
    <S.HomeContainer>
      {HomePageConfig.map((config, index) => (
        <CompetitionsSection key={index} config={config} />
      ))}
    </S.HomeContainer>
  );
};
