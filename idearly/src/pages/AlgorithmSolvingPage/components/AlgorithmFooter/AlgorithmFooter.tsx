import { PropsWithChildren } from 'react';
import * as S from './AlgorithmFooter.styles';
import { IAlgorithmFooter } from './AlgorithmFooter.types';

export const AlgorithmFooter = ({handleInitButton, handleExcute, handleSubmit}: PropsWithChildren<IAlgorithmFooter>) => {
  return (
    <>
      <div>
        <S.EditorButton onClick={handleInitButton}>초기화</S.EditorButton>
        <S.EditorButton onClick={handleExcute}>실행</S.EditorButton>
        <S.SubmitButton onClick={handleSubmit} colorScheme="blue">제출</S.SubmitButton>
      </div>
    </>
  )
}
