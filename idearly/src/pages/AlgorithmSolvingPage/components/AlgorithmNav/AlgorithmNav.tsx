import * as S from './AlgorithmNav.styles';
import { AlgorithmVoiceChat } from '..';
import { fakeProblem } from '../../../../mocks/problem.mocks';
import type { Prop } from './AlgorithmNav.types';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const AlgorithmNav = ({ onOpen }: Prop) => {
  const navigate = useNavigate();
  const path = useLocation();
  path.search = `?id=${fakeProblem[0].id}`;
  const [selectedProblemId, setSelectedProblemId] = useState<string | null>(
    fakeProblem[0].id
  );
  const selectedStyle = {
    backgroundColor: '#01228a',
    color: 'white',
  };
  const defaultStyle = {
    backgroundColor: 'initial',
    color: '#01228a',
  };

  const handleProblems = (id: string) => {
    navigate(`${path.pathname}?id=${id}`);
    setSelectedProblemId(id);
  };
  return (
    <S.AlgorithmNavContainer>
      <div>
        {fakeProblem.map((problem, index) => (
          <S.ProblemNumber
            key={problem.id}
            onClick={() => {
              handleProblems(problem.id);
            }}
            style={
              problem.id === selectedProblemId ? selectedStyle : defaultStyle
            }
          >
            <div>{index + 1}</div>
          </S.ProblemNumber>
        ))}
      </div>
      <S.NavIcons>
        <AlgorithmVoiceChat />
        <span className='material-icons' onClick={onOpen}>
          chat
        </span>
      </S.NavIcons>
    </S.AlgorithmNavContainer>
  );
};
