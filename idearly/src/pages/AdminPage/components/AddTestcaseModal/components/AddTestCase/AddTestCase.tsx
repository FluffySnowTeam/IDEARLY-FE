import { CloseIcon } from "@chakra-ui/icons";
import { Input, ModalBody, Select, Textarea } from "@chakra-ui/react";
import { PropsWithChildren, useState } from "react";
import * as S from "./AddTestCase.styles";
import type { IAddTestCase } from "./AddTesxtCase.types";

export const AddTestCase = ({
  testcaseData,
  setTestcaseData,
}: PropsWithChildren<IAddTestCase>) => {
  const [testCaseValue, setTestCaseValue] = useState({
    input: "",
    answer: "",
    hidden: false,
  });

  console.log(testCaseValue, testcaseData);

  const handleAddTestCase = () => {
    if (
      testCaseValue.input.trim() === "" ||
      testCaseValue.answer.trim() === ""
    ) {
      console.log("모든 필드를 채워주세요.");
      return;
    }
    const randomId =
      "id" + Date.now() + Math.random().toString(36).substr(2, 9);

    setTestcaseData((prev) => [
      ...prev,
      {
        id: randomId,
        input: testCaseValue.input,
        answer: testCaseValue.answer,
        hidden: testCaseValue.hidden,
      },
    ]);
    setTestCaseValue({
      input: "",
      answer: "",
      hidden: false,
    });
  };

  const handleDeleteTestCase = (id: string) => {
    setTestcaseData((prev) => prev.filter((testCase) => testCase.id !== id));
  };

  return (
    <ModalBody>
      {testcaseData.map((testCase) => (
        <S.TestCaseList key={testCase.id}>
          <S.TestCaseListBox>
            <div>input: {testCase.input}</div>
            <div>answer: {testCase.answer}</div>
            <div>hidden: {testCase.hidden ? "True" : "False"}</div>
          </S.TestCaseListBox>
          <S.TestCaseDeleteButton
            size={"xs"}
            aria-label="delete testCase"
            onClick={() => {
              handleDeleteTestCase(testCase.id);
            }}
            icon={<CloseIcon />}
          ></S.TestCaseDeleteButton>
        </S.TestCaseList>
      ))}
      <div>입력값</div>
      <Textarea
        value={testCaseValue.input}
        onChange={(e) => {
          setTestCaseValue({ ...testCaseValue, input: e.target.value });
        }}
      />
      <div>히든여부</div>
      <Select
        value={testCaseValue.hidden.toString()}
        onChange={(e) => {
          setTestCaseValue({
            ...testCaseValue,
            hidden: e.target.value === "true",
          });
        }}
      >
        <option>false</option>
        <option>true</option>
      </Select>
      <div>정답</div>
      <Input
        value={testCaseValue.answer}
        onChange={(e) => {
          setTestCaseValue({ ...testCaseValue, answer: e.target.value });
        }}
      />
      <S.TestCaseAddButton onClick={handleAddTestCase}>
        추가
      </S.TestCaseAddButton>
    </ModalBody>
  );
};
