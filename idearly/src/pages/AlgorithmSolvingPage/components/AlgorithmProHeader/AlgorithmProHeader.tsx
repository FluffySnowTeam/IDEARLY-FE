import * as S from './AlgorithmProHeader.styles';

export const AlgorithmProHeader = () => {
  return (
    <S.AlgorithmContainer>
      <div>
        <S.AlgorithmLanguage>
          <option value='none'>언어 선택</option>
          <option value='Python' selected>
            Python
          </option>
          <option value='Java'>Java</option>
          <option value='JavaScript'>JavaScript</option>
        </S.AlgorithmLanguage>
      </div>
    </S.AlgorithmContainer>
  );
};
