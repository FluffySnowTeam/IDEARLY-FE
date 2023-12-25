import { CloseIcon } from "@chakra-ui/icons";
import { Input, ModalBody, Select, Textarea } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import * as S from "./AddTestCase.styles";
import { useAtom } from "jotai";
import { testCaseDataAtom } from "../../../../../../store";

export const AddTestCase = () => {
  const [testCaseList, setTestCaseList] = useAtom(testCaseDataAtom);
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  const handleAddTestCase = () => {
    if (inputValue.trim() === "") return setInputValue("");
    const randomId =
      "id" + Date.now() + Math.random().toString(36).substr(2, 9);

    setTestCaseList((prev) => [
      ...prev,
      {
        id: randomId,
        case: inputValue,
      },
    ]);
    setInputValue("");
  };

  const handleDeleteTestCase = (id: string) => {
    setTestCaseList((prev) => prev.filter((testCase) => testCase.id !== id));
  };

  return (
    <ModalBody>
      {testCaseList.map((testCase) => (
        <S.TestCaseList key={testCase.id}>
          <div>{testCase.case}</div>
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
      <Textarea value={inputValue} onChange={handleChange} />
      <div>히든여부</div>
      <Select>
        <option>true</option>
        <option>false</option>
      </Select>
      <div>정답</div>
      <Input />
      <S.TestCaseAddButton onClick={handleAddTestCase}>
        추가
      </S.TestCaseAddButton>
    </ModalBody>
  );
};
