import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import { Input, ModalBody, Select, Text, Textarea } from "@chakra-ui/react";
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

  const handleAddTestCase = () => {
    if (
      testCaseValue.input.trim() === "" ||
      testCaseValue.answer.trim() === ""
    ) {
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
      <Text fontSize="lg" as="b">
        입력값
      </Text>
      <Textarea
        value={testCaseValue.input}
        onChange={(e) => {
          setTestCaseValue({ ...testCaseValue, input: e.target.value });
        }}
        mb="5"
      />
      <Text fontSize="lg" as="b">
        히든여부
      </Text>
      <Select
        value={testCaseValue.hidden.toString()}
        onChange={(e) => {
          setTestCaseValue({
            ...testCaseValue,
            hidden: e.target.value === "true",
          });
        }}
        mb="5"
      >
        <option>false</option>
        <option>true</option>
      </Select>
      <Text fontSize="lg" as="b">
        정답
      </Text>
      <Input
        value={testCaseValue.answer}
        onChange={(e) => {
          setTestCaseValue({ ...testCaseValue, answer: e.target.value });
        }}
      />
      <S.TestCaseAddButton onClick={handleAddTestCase} colorScheme="facebook">
        <AddIcon mr="2" />
        추가
      </S.TestCaseAddButton>
    </ModalBody>
  );
};
