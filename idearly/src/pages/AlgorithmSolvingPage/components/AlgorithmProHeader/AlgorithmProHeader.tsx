import * as S from "./AlgorithmProHeader.styles";
import { LanguageProps } from "./AlgorithmProHeader.types";

export const AlgorithmProHeader = ({
  setLanguage,
  language,
}: LanguageProps) => {
  const handleSelectOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };
  const languages = ["python", "java", "javascript"];

  return (
    <S.AlgorithmContainer>
      <div>
        <S.AlgorithmLanguage onChange={handleSelectOption} value={language}>
          <option value="">언어 선택</option>
          {languages.map((l, idx) => (
            <option key={idx} value={l}>
              {l}
            </option>
          ))}
        </S.AlgorithmLanguage>
      </div>
    </S.AlgorithmContainer>
  );
};
