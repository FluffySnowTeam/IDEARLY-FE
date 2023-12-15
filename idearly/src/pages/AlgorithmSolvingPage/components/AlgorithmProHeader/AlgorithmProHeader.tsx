import * as S from "./AlgorithmProHeader.styles";

export const AlgorithmProHeader = () => {
  return (
    <S.AlgorithmContainer>
      <div>
        <S.AlgorithmLanguage placeholder="언어 선택">
          <option value="Python">Python </option>
          <option value="Java">Java </option>
          <option value="JavaScript">JavaScript </option>
        </S.AlgorithmLanguage>
      </div>
    </S.AlgorithmContainer>
  );
};
