import { useToast } from "@chakra-ui/react";
import * as S from "./AddTestcaseModal.styles";
import { PropsWithChildren, useState } from "react";
import { AddTestCase } from "./components";
import type {
  IAddTestcasemModal,
  ITestcaseData,
} from "./AddTestcaseModal.types";
import { testProblemMock } from "../../../../mocks/testcase.mocks";
import { useSearchParams } from "react-router-dom";
import { useAdminTestCaseMutation } from "../../../../hooks/useAdminCompetitionMutation";

export const AddTestCaseModal = ({
  isOpen,
  onClose,
}: PropsWithChildren<IAddTestcasemModal>) => {
  const toast = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const [testcaseData, setTestcaseData] = useState<ITestcaseData[]>([]);
  const problemId = searchParams.get("problemId");

  const handleClose = () => {
    setTestcaseData([]);
    onClose();
    searchParams.set("problemId", "");
    setSearchParams(searchParams);
  };

  const { mutate } = useAdminTestCaseMutation();

  const handleSubmit = () => {
    if (testcaseData.length === 0) {
      toast({
        title: "테스트케이스가 없습니다.",
        description: "테스트케이스를 추가해주세요!",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return; // 테스트케이스가 없는 경우 함수 종료
    }
    if (problemId === null) {
      toast({
        title: "문제가 선택되지 않았습니다.",
        description: "테스트케이스를 추가할 문제를 선택해주세요!",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return; // 문제가 선택되지 않은 경우 함수 종료
    }
    const formattedTestcases = testcaseData.map(({ id, ...rest }) => rest);
    mutate({
      problemId: Number(problemId),
      testcase: formattedTestcases,
    });
  };

  const handleProblemId = (id: number) => {
    searchParams.set("problemId", String(id));
    setSearchParams(searchParams);
  };

  return (
    <S.TestcaseModalContainer isOpen={isOpen} onClose={onClose}>
      <S.TestcaseModalOverlay />
      <S.TestcaseModalContent>
        <S.TestcaseModalHeader>문제 리스트</S.TestcaseModalHeader>
        <S.TestcaseModalCloseButton onClick={handleClose} />

        {/**
         * 현재 목데이터 문제리스트 실제 api로 수정해야함
         */}
        <S.ProblemListBox>
          {testProblemMock.map((testcase) => (
            <S.ProblemItem
              key={testcase.id}
              onClick={() => {
                handleProblemId(testcase.id);
              }}
              isSelected={testcase.id === Number(problemId)}
            >
              <div>{testcase.content}</div>
            </S.ProblemItem>
          ))}
        </S.ProblemListBox>
        <S.TestcaseModalHeader>테스트 케이스 추가</S.TestcaseModalHeader>
        <AddTestCase
          testcaseData={testcaseData}
          setTestcaseData={setTestcaseData}
        />
        <S.TestcaseModalFooter>
          <S.TestcaseButton onClick={handleSubmit} colorScheme="blue">
            저장하기
          </S.TestcaseButton>
          <S.TestcaseButton variant="ghost" ml={3} onClick={handleClose}>
            닫기
          </S.TestcaseButton>
        </S.TestcaseModalFooter>
      </S.TestcaseModalContent>
    </S.TestcaseModalContainer>
  );
};
