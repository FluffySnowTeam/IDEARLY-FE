import { PropsWithChildren } from "react";
import * as S from "./AlgorithmSection.styles";
import type { IAlgorithmSection } from "./AlgorithmSection.types";

export const AlgorithmSection = ({
  title,
  content,
}: PropsWithChildren<IAlgorithmSection>) => {
  return (
    <S.AlgorithmProblemContainer>
      <S.AlgorithmProblemTitle>{title}</S.AlgorithmProblemTitle>
      <S.AlgorithmProblemContent>{content}</S.AlgorithmProblemContent>
    </S.AlgorithmProblemContainer>
  );
};
