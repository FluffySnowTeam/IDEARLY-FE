import { PropsWithChildren } from "react";
import * as S from "./CompetitionsModal.styles";
import type { ICompetitionsModal } from "./CompetitionsModal.types";
import { dateChange } from "../../../../utils/dateChange";

export const CompetitionsModal = ({
  isOpen,
  onClose,
  overlay,
  startDateTime,
}: PropsWithChildren<ICompetitionsModal>) => {
  return (
    <S.CompeModalContainer isCentered isOpen={isOpen} onClose={onClose}>
      {overlay}
      <S.CompeModalContent>
        <S.CompeModalHeader>
          대회가 아직 시작되지 않았습니다.
        </S.CompeModalHeader>
        <S.CompeModalCloseButton />
        <S.CompeModalBody>
          {startDateTime && (
            <S.CompeModalText>
              대회 시작 일자는 {dateChange({ date: startDateTime })}입니다
            </S.CompeModalText>
          )}
        </S.CompeModalBody>
        <S.CompeModalFooter>
          <S.CompeModalButton onClick={onClose}>Close</S.CompeModalButton>
        </S.CompeModalFooter>
      </S.CompeModalContent>
    </S.CompeModalContainer>
  );
};
