import * as S from "./AlgorithmProHeader.styles";
import { LanguageProps } from "./AlgorithmProHeader.types";

export const AlgorithmProHeader = ({ setLanguage }: LanguageProps) => {
  const handleSelectOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };
  return (
    <S.AlgorithmContainer>
      <div>
        <S.AlgorithmLanguage onChange={handleSelectOption}>
          <option value="none">언어 선택</option>
          <option value="Python" selected>
            Python
          </option>
          <option value="Java">Java</option>
          <option value="JavaScript">JavaScript</option>
        </S.AlgorithmLanguage>
      </div>
    </S.AlgorithmContainer>
  );
};
